import { ILogObj, Logger } from 'tslog';
import { ILogger } from './logger.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({
			name: 'LoggerService',
			type: 'pretty',
		});
	}
	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
