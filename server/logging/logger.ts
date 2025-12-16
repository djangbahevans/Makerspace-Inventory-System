import path from "node:path";
import { createLogger, format, transports } from "winston";

export default createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), "logfile.log"),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(process.cwd(), "exceptions.log"),
    }),
    new transports.Console(),
  ],
});
