import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import configureAuth from "./server/auth/auth";
import createDefaultUser from "./server/fixtures/createDefaultUser";
import logger from "./server/logging/logger";
import User from "./server/models/User";
import Mutation from "./server/resolvers/Mutation";
import Query from "./server/resolvers/Query";
import Requisition from "./server/resolvers/Requisition";
import Stock from "./server/resolvers/Stock";

const app = express();

const PRODUCTION = process.env.NODE_ENV === "production";

const projectRoot = path.resolve(__dirname, "..");

// Logging
const accessLogStream = fs.createWriteStream(
  path.join(projectRoot, "express.log"),
  {
    flags: "a",
  },
);
app.use(
  morgan("combined", {
    stream: accessLogStream,
  }),
);

// Database Connection
const URI = process.env.URI || "mongodb://localhost:27017/inventory";
mongoose
  .connect(URI)
  .then(() => logger.info("Connected to  MongoDB"))
  .catch(() => {
    logger.info("Could not connect to MongoDB");
    process.abort();
  });

// 3rd Party Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.use(express.static(path.join(projectRoot, "public")));
app.use(
  session({
    secret: process.env.SessionSecret || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: URI,
    }),
    cookie: {
      secure: PRODUCTION,
      sameSite: "lax",
    },
  }),
);

configureAuth(app); // After app.use(sessions)

async function start() {
  const typeDefs = fs.readFileSync(
    path.join(projectRoot, "server", "schema", "schema.graphql"),
    "utf8",
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query,
      Requisition,
      Stock,
    },
    introspection: !PRODUCTION,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  app.use((req, res) => {
    const regex = /\.\w+$/; /// Match all extensions
    if (req.url.match(regex)) return res.sendStatus(404); // if file, return 404
    return res.sendFile(path.join(projectRoot, "public", "index.html"));
  });

  // Add default user if user does not exist
  const userCount = await User.countDocuments({});
  if (userCount === 0) {
    await createDefaultUser({
      name: "admin",
      role: "admin",
      username: "admin",
      password: "admin",
    });
  }

  const PORT = process.env.PORT || 8080;
  https
    .createServer(
      {
        cert: fs.readFileSync(path.join(projectRoot, "ssl", "server.crt")),
        key: fs.readFileSync(path.join(projectRoot, "ssl", "server.key")),
      },
      app,
    )
    .listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
}

start().catch((err) => {
  logger.error(err);
  process.exitCode = 1;
});
