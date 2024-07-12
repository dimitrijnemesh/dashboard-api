import { Response, Router } from 'express';
import { IControllerRoute, ExpressReturnType } from './route.interface';
import { ILogger } from '../logger/logger.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(200).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): ExpressReturnType {
		for (const route of routes) {
			this.logger.log(`[${route.method} ${route.path}]`);
			const middleware = route.middlewares?.map(m => m.execute.bind(this))
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler]: handler
			this.router[route.method](route.path, pipeline);
		}
	}
}
