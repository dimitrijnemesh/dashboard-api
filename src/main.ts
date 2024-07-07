import { Container } from "inversify"
import { App } from "./app"
import { ExeptionFilter } from "./errors/exeption.filter"
import { LoggerService } from "./logger/logger.service"
import { UserController } from "./users/users.controller"
import { ILogger } from "./logger/logger.interface"
import { TYPES } from "./types"

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)
app.init()

export { app, appContainer }
