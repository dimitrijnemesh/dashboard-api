import { Request, Response, NextFunction } from 'express';

export interface IUserController {
	register: (req: Request, res: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
}
