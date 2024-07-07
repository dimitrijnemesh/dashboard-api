import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.service.interface';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([{ path: '/register', method: 'post', func: this.register }]);
		this.bindRoutes([{ path: '/login', method: 'post', func: this.login }]);
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'error of authorization', 'login'));
	}
}
