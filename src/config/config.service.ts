import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.service.interface";
import { TYPES } from "../types";
import { IConfigService } from "./config.service.interface";
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv'
import 'reflect-metadata'

@injectable()
export class ConfigService implements IConfigService{
    private config: DotenvParseOutput
    constructor(@inject(TYPES.ILogger) private logger: ILogger,){

        const result: DotenvConfigOutput = config()
        if(result.error){
            this.logger.error("[ConfigService] Can't read file .env or that file doesn't exist")
        }else{
            this.logger.log("[ConfigService] Configuration .env has been loaded")
            this.config = result.parsed as DotenvParseOutput
        }
    }
    get(key: string): string{
       return this.config[key]
    };
}