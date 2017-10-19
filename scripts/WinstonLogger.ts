import { LoggerInstance } from "winston";
import { injectable, inject } from "inversify";
import { ILogger, LogLevel } from "prettygoat";
import {map, clone} from "lodash";

const LEVELS = ["debug", "info", "warning", "error"];

@injectable()
class WinstonLogger implements ILogger {

    private context: string[] = [];

    constructor( @inject("LoggerInstance") private logger: LoggerInstance) { }

    debug(message: string): void {
        this.logger.log("debug", `${this.stringifyContext(this.context)} ${message}`);
    }

    info(message: string): void {
        this.logger.log("info", `${this.stringifyContext(this.context)} ${message}`);
    }
    warning(message: string): void {
        this.logger.log("warning", `${this.stringifyContext(this.context)} ${message}`);
    }

    error(errorOrMessage: string | Error): void {
        if (errorOrMessage && (errorOrMessage as Error).stack) this.logger.log(
            "error", `${this.stringifyContext(this.context)} ${(errorOrMessage as Error).message}`,
            (errorOrMessage as Error).stack);
        else this.logger.log("error", this.stringifyContext(this.context), errorOrMessage);
    }

    setLogLevel(level: LogLevel): void {
        this.logger.level = LEVELS[level] || LEVELS[LogLevel.Debug];
        this.info(`Log level set to ${this.logger.level.toUpperCase()}`);
    }

    createChildLogger(context: string): ILogger {
        let copy = map<string, string>(this.context, clone);
        if (context) copy.push(context);
        let logger = new WinstonLogger(this.logger);
        logger.setContext(copy);
        return logger;
    }

    setContext(context: string[]) {
        this.context = context;
    }

    private stringifyContext(context: string[]): string {
        return context.length ? `[${context.join(".")}]` : "";
    }
}

export default WinstonLogger;
