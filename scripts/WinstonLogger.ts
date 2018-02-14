import { LoggerInstance } from "winston";
import { injectable, inject, optional } from "inversify";
import { ILogger, LogLevel } from "prettygoat";
import {map, clone, forEach} from "lodash";
import { ILoggerConfig, DefaultLoggerConfig } from "inversify-logging";

const LEVELS = ["debug", "info", "warning", "error"];

@injectable()
class WinstonLogger implements ILogger {

    private context: string[] = [];

    constructor(@inject("LoggerInstance") private winston: LoggerInstance,
                @inject("ILoggerConfig") @optional() private config: ILoggerConfig = new DefaultLoggerConfig()) {
        this.winston.level = LEVELS[config.logLevel] || LEVELS[LogLevel.Debug];
    }

    debug(...messages: string[]): void {
        this.winston.log("debug", this.logForMessages(messages));
    }

    private logForMessages(messages: string[]): string {
        let log = messages.join(" ");
        return `${this.stringifyContext(this.context)} ${log}`;
    }

    info(...messages: string[]): void {
        this.winston.log("info", this.logForMessages(messages));
    }
    warning(...messages: string[]): void {
        this.winston.log("warning", this.logForMessages(messages));
    }

    error(...errors: (string | Error)[]): void {
        forEach(errors, error => {
            if (error && (error as Error).stack) this.winston.log(
                "error", `${this.stringifyContext(this.context)}`,
                (error as Error).stack);
            else this.winston.log("error", this.stringifyContext(this.context), error);
        });
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
