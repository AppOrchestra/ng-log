import { Observable } from "rxjs/index";
/**
 * Log levels which match the console log methods
 */
export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    LOG = 3,
    WARN = 4,
    ERROR = 5
}
/**
 * A LogEntry contains the message, logging level and timestamp
 */
export interface LogEntry {
    message: string;
    level: LogLevel;
    time: number;
}
/**
 * A simple Log service to use instead of the console.log etc method, which write's LogEntry's to the
 * static observable so additional log functionality can be plugged in, e.g. submitting error messages to a server
 */
export declare class Log {
    /** If the logger should log to the console. */
    static logToConsole: boolean;
    /** Observable for when a new log entry is logged */
    private static _logEntry;
    static $logEntry: Observable<LogEntry>;
    /** The string to prepend to each log entry message */
    private context;
    constructor(context?: string | null);
    /**
     * Factory method to create a new Log with the context set
     * @param context
     * @returns {Log}
     */
    withContext(context: string): Log;
    /**
     * Log a debug message
     * @param message
     * @param optionalParams
     */
    debug(message?: any, ...optionalParams: any[]): void;
    /**
     * Log an error message
     * @param message
     * @param optionalParams
     */
    error(message?: any, ...optionalParams: any[]): void;
    /**
     * Log an info message
     * @param message
     * @param optionalParams
     */
    info(message?: any, ...optionalParams: any[]): void;
    /**
     * Log a log message
     * @param message
     * @param optionalParams
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * Log a trace message
     * @param message
     * @param optionalParams
     */
    trace(message?: any, ...optionalParams: any[]): void;
    /**
     * Log a warn message
     * @param message
     * @param optionalParams
     */
    warn(message?: any, ...optionalParams: any[]): void;
    /**
     * Concatenates the log message with the additional param, and prepends the context
     * @param message
     * @param optionalParams
     */
    private toString;
    private static staticToString;
}
