/// <reference types="node" />
/// <reference types="socket.io" />
/// <reference types="winston" />

import { IModule, ILogger, LogLevel, IProjectionRegistry, IServiceLocator } from "prettygoat";
import { LoggerInstance } from "winston";
import { interfaces } from "inversify";

export class WinstonLogger implements ILogger {
    constructor(logger: LoggerInstance);

    public debug(message: string): void;
    public info(message: string): void;
    public warning(message: string): void;
    public error(errorOrMessage: string | Error): void;
    public setLogLevel(level: LogLevel): void;
    public getLogLevel(): LogLevel;
}

export class WinstonLoggerModule implements IModule {
    modules(container: interfaces.Container): void;
    register(registry: IProjectionRegistry, serviceLocator?: IServiceLocator, overrides?: any): void
}