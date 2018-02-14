import { LoggerInstance } from "winston";
import { injectable, inject, optional } from "inversify";
import { ILogger, LogLevel } from "prettygoat";
import {map, clone} from "lodash";
import { ILoggerConfig, DefaultLoggerConfig } from "inversify-logging";

const LEVELS = ["debug", "info", "warning", "error"];

@injectable()
class WinstonLogger implements ILogger {

    private context: string[] = [];

    constructor(@inject("LoggerInstance") private winston: LoggerInstance,
                @inject("ILoggerConfig") @optional() private config: ILoggerConfig = new DefaultLoggerConfig()) {
        this.winston.level = LEVELS[config.logLevel] || LEVELS[LogLevel.Debug];
    }

    debug(message: string): void {
        this.winston.log("debug", `${this.stringifyContext(this.context)} ${message}`);
    }

    info(message: string): void {
        this.winston.log("info", `${this.stringifyContext(this.context)} ${message}`);
    }
    warning(message: string): void {
        this.winston.log("warning", `${this.stringifyContext(this.context)} ${message}`);
    }

    error(errorOrMessage: string | Error): void {
        if (errorOrMessage && (errorOrMessage as Error).stack) this.winston.log(
            "error", `${this.stringifyContext(this.context)}`,
            (errorOrMessage as Error).stack);
        else this.winston.log("error", this.stringifyContext(this.context), errorOrMessage);
    }

    createChildLogger(context: string): ILogger {
        let copy = map<string, string>(this.context, clone);
        if (context) copy.push(context);
        let logger = new WinstonLogger(this.winston, this.config);
        logger.setContext(copy);
        return logger;
    }

    setLogLevel() {

    }

    setContext(context: string[]) {
        this.context = context;
    }

    private stringifyContext(context: string[]): string {
        return context.length ? `[${context.join(".")}]` : "";
    }
}

export default WinstonLogger;
