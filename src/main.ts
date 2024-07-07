// import { Container } from "inversify"
import { App } from "./app"
import { ExeptionFilter } from "./errors/exeption.filter"
import { LoggerService } from "./logger/logger.service"
import { UserController } from "./users/users.controller"
// import { ILogger } from "./logger/logger.interface"
// import { TYPES } from "./types"

async function bootstrap() {
  const logger = new LoggerService()
  const app = new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  )
  await app.init()

  // const appContainer = new Container()
  // appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
}

bootstrap()
