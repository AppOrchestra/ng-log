import {Injectable} from "@angular/core"
import {Subject} from "rxjs/Subject"
import {Observable} from "rxjs/Observable"

/**
 * Log levels which match the console log methods
 */
export enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR
}

/**
 * A LogEntry contains the message, logging level and timestamp
 */
export interface LogEntry {
    message: string
    level: LogLevel
    time: number
}

/**
 * A simple Log service to use instead of the console.log etc method, which write's LogEntry's to the
 * static observable so additional log functionality can be plugged in, e.g. submitting error messages to a server
 */
@Injectable()
export class Log {

    /** If the logger should log to the console. */
    static logToConsole: boolean = true

    /** Observable for when a new log entry is logged */
    private static _logEntry = new Subject<LogEntry>()
    static $logEntry: Observable<LogEntry> = Log._logEntry.asObservable()

    /** The string to prepend to each log entry message */
    private context: string | null = null

    constructor(context?: string | null) {
        this.context = context ? context + ': ' : null
    }

    /**
     * Factory method to create a new Log with the context set
     * @param context
     * @returns {Log}
     */
    withContext(context: string): Log {
        let log = new Log(null)
        log.context = context + ': '
        return log
    }

    /**
     * Log a debug message
     * @param message
     * @param optionalParams
     */
    debug(message?: any, ...optionalParams: any[]): void {
        const debug = this.toString(message, ...optionalParams)
        if (Log.logToConsole)
            console.debug(debug)
        Log._logEntry.next({message: debug, level: LogLevel.DEBUG, time: Date.now()})
    }

    /**
     * Log an error message
     * @param message
     * @param optionalParams
     */
    error(message?: any, ...optionalParams: any[]): void {
        const error = this ? this.toString(message, ...optionalParams) : Log.staticToString(message, ...optionalParams)
        if (Log.logToConsole)
            console.error(error)
        Log._logEntry.next({message: error, level: LogLevel.ERROR, time: Date.now()})
    }

    /**
     * Log an info message
     * @param message
     * @param optionalParams
     */
    info(message?: any, ...optionalParams: any[]): void {
        const info = this.toString(message, ...optionalParams)
        if (Log.logToConsole)
            console.info(info)
        Log._logEntry.next({message: info, level: LogLevel.INFO, time: Date.now()})
    }

    /**
     * Log a log message
     * @param message
     * @param optionalParams
     */
    log(message?: any, ...optionalParams: any[]): void {
        const log = this.toString(message, ...optionalParams)
        if (Log.logToConsole)
            console.log(log)
        Log._logEntry.next({message: log, level: LogLevel.LOG, time: Date.now()})
    }

    /**
     * Log a trace message
     * @param message
     * @param optionalParams
     */
    trace(message?: any, ...optionalParams: any[]): void {
        const trace = this.toString(message, ...optionalParams)
        if (Log.logToConsole)
            console.trace(trace)
        Log._logEntry.next({message: trace, level: LogLevel.TRACE, time: Date.now()})
    }

    /**
     * Log a warn message
     * @param message
     * @param optionalParams
     */
    warn(message?: any, ...optionalParams: any[]): void {
        const warn = this.toString(message, ...optionalParams)
        if (Log.logToConsole)
            console.warn(warn)
        Log._logEntry.next({message: warn, level: LogLevel.WARN, time: Date.now()})
    }

    /**
     * Concatenates the log message with the additional param, and prepends the context
     * @param message
     * @param optionalParams
     */
    private toString(message?: any, ...optionalParams: any[]): string {
        let log = (this ? this.context : '') + message
        if (optionalParams) {
            optionalParams.forEach(param => {
                try {
                    log += ' ' + JSON.stringify(param)
                } catch(e) {
                    log += ' [Object]'
                }
            })
        }
        return log
    }

    private static staticToString(message?: any, ...optionalParams: any[]): string {
        let log = '(static)' + message
        if (optionalParams) {
            optionalParams.forEach(param => {
                try {
                    log += ' ' + JSON.stringify(param)
                } catch(e) {
                    log += ' [Object]'
                }
            })
        }
        return log
    }

}
