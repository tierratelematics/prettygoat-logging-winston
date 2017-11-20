import { LoggerInstance } from "winston";
import { injectable, inject } from "inversify";
import { ILogger, LogLevel } from "prettygoat";
import {map, clone} from "lodash";
import * as EventEmitter from "events";

const LEVELS = ["debug", "info", "warning", "error"];
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

@injectable()
class WinstonLogger implements ILogger {

    private context: string[] = [];
    private logLevel = LogLevel.Debug;

    constructor( @inject("LoggerInstance") private winston: LoggerInstance) {
        emitter.addListener("logLevelChange", (level) => {
            this.logLevel = level;
            this.winston.level = LEVELS[level] || LEVELS[LogLevel.Debug];
        });
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

    setLogLevel(level: LogLevel): void {
        emitter.emit("logLevelChange", level);
    }

    createChildLogger(context: string): ILogger {
        let copy = map<string, string>(this.context, clone);
        if (context) copy.push(context);
        let logger = new WinstonLogger(this.winston);
        logger.setContext(copy);
        this.logLevel = this.logLevel;
        this.winston.level = LEVELS[this.logLevel] || LEVELS[LogLevel.Debug];
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
