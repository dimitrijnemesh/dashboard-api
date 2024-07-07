import { ILogObj, Logger } from "tslog"
import { ILogger } from "./logger.interface"

export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>
  constructor() {
    this.logger = new Logger({
      name: "LoggerService",
      type: "pretty",
    })
  }
  log(...args: unknown[]) {
    this.logger.info(...args)
  }
  error(...args: unknown[]) {
    this.logger.error(...args)
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args)
  }
}
