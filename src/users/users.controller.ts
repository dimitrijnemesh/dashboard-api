import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IUserController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './users.service';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
	@inject(TYPES.ILogger) private loggerService: ILogger,
	@inject(TYPES.UserService) private userService: UserService) {
		super(loggerService);
		this.bindRoutes([
		{ path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)]},
		{ path: '/login', method: 'post', func: this.login , middlewares: [new ValidateMiddleware(UserLoginDto)]}]);
	}

	async register({body}: Request<{},{}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		
		const result = await this.userService.createUser(body)
		if(!result){
			return next(new HTTPError(422, 'This user already exist'))
		}else{
		this.ok(res, {email: result.email, id: result.id})}
	}

	async login({body}: Request<{},{}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(body)
		if(!result){
			return next(new HTTPError(401, 'error of authorization', 'login'));

		}

		this.ok(res, {})
	}
}
