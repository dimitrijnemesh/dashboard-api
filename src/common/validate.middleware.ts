import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IMiddleware } from "./middleware.interface";
import { ClassConstructor, plainToClass} from 'class-transformer'
import { validate} from 'class-validator'
import 'reflect-metadata'

export class ValidateMiddleware implements IMiddleware{
    constructor(private classToValidate: ClassConstructor<object>){

    }
    execute ({body}: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction):void{
       const instance = plainToClass(this.classToValidate, body)
       validate(instance).then((errors)=>{
        if(errors.length > 0){
            res.status(422).send(errors)
        }else{
            next()
        }
       })
    }
}