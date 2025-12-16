import type { Express } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";

export default function configureAuth(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username }).exec();
        if (!user) return done(null, false);
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: "Invalid username or password.",
          });
        }
        return done(null, user);
      } catch (err: unknown) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    if (user && typeof user === "object" && "_id" in user) {
      done(null, (user as { _id: unknown })._id);
      return;
    }
    done(new Error("Invalid user"));
  });

  passport.deserializeUser((id: string, done) => {
    User.findById(id)
      .exec()
      .then((user) => done(null, user))
      .catch((err: unknown) => done(err));
  });
}
