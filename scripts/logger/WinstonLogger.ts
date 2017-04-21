import { LoggerInstance } from "winston";
import { injectable, inject } from "inversify";
import { ILogger, LogLevel } from "prettygoat";

const LEVELS = ["debug", "info", "warning", "error"];

@injectable()
class WinstonLogger implements ILogger {
    constructor( @inject("LoggerInstance") private logger: LoggerInstance) { }

    public debug(message: string): void {
        this.logger.log("debug", message);
    }
    public info(message: string): void {
        this.logger.log("info", message);
    }
    public warning(message: string): void {
        this.logger.log("warning", message);
    }

    public error(errorOrMessage: string | Error): void {
        if (errorOrMessage && (errorOrMessage as Error).stack) this.logger.log("error", (errorOrMessage as Error).message, (errorOrMessage as Error).stack);
        else this.logger.log("error", (errorOrMessage as string));
    }

    public setLogLevel(level: LogLevel): void {
        this.logger.level = LEVELS[level] || LEVELS[LogLevel.Debug];
        this.info(`Log level set to ${this.logger.level.toUpperCase()}`);
    }

    public getLogLevel(): LogLevel {
        return LEVELS.indexOf(this.logger.level);
    }
}

export default WinstonLogger;
