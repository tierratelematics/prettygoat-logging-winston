import {
    LogMethod, LoggerInstance, LeveledLogMethod, MetadataRewriter, MetadataFilter,
    TransportInstance, TransportOptions, ProfileHandler, LoggerOptions, AbstractConfigSetLevels,
} from "winston";

import { EventEmitter } from "events";

class MockLoggerInstance extends EventEmitter implements LoggerInstance {

    rewriters: MetadataRewriter[];
    filters: MetadataFilter[];
    transports: { [key: string]: TransportInstance };
    error: LeveledLogMethod;
    warn: LeveledLogMethod;
    help: LeveledLogMethod;
    data: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
    prompt: LeveledLogMethod;
    verbose: LeveledLogMethod;
    input: LeveledLogMethod;
    silly: LeveledLogMethod;
    emerg: LeveledLogMethod;
    alert: LeveledLogMethod;
    crit: LeveledLogMethod;
    warning: LeveledLogMethod;
    notice: LeveledLogMethod;

    public level: string;
    public log: LogMethod = (level: string, msg: string) => null;

    extend(target: any): LoggerInstance { return null; };
    query(options: any): any { return null; };
    stream(options?: any): NodeJS.ReadableStream { return null; };
    close(): void { };
    handleExceptions(...transports: TransportInstance[]): void { };
    unhandleExceptions(...transports: TransportInstance[]): void { };
    add(transport: TransportInstance, options?: TransportOptions, created?: boolean): LoggerInstance { return null; };
    clear(): void { };
    remove(transport: TransportInstance): LoggerInstance { return null; };
    startTimer(): ProfileHandler { return null; };
    profile(id: string, msg?: string, meta?: any, callback?: (err: Error, level: string, msg: string, meta: any) => void): LoggerInstance { return null; };
    configure(options: LoggerOptions): void { };
    setLevels(target: AbstractConfigSetLevels): any { return null; };
    cli(): LoggerInstance { return null; };
}
export default MockLoggerInstance;
