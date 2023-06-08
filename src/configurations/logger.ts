import pino from 'pino';

export default class Logger {
    private logger: pino.Logger;

    constructor(name: string) {
        this.logger = pino({
            name: name,
        });
    }

    public info(message: string): void {
        this.logger.info(message);
    }

    public error(message: string): void {
        this.logger.error(message);
    }

    public warn(message: string): void {
        this.logger.warn(message);
    }

    public debug(message: string): void {
        this.logger.debug(message);
    }
}