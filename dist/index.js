"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
/**
 * Log levels which match the console log methods
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["LOG"] = 3] = "LOG";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * A simple Log service to use instead of the console.log etc method, which write's LogEntry's to the
 * static observable so additional log functionality can be plugged in, e.g. submitting error messages to a server
 */
var Log = /** @class */ (function () {
    function Log() {
        /** The string to prepend to each log entry message */
        this.context = '';
    }
    Log_1 = Log;
    /**
     * Factory method to create a new Log with the context set
     * @param context
     * @returns {Log}
     */
    Log.prototype.withContext = function (context) {
        var log = new Log_1();
        log.context = context + ': ';
        return log;
    };
    /**
     * Log a debug message
     * @param message
     * @param optionalParams
     */
    Log.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var debug = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.debug(debug);
        Log_1._logEntry.next({ message: debug, level: LogLevel.DEBUG, time: Date.now() });
    };
    /**
     * Log an error message
     * @param message
     * @param optionalParams
     */
    Log.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var error = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.error(error);
        Log_1._logEntry.next({ message: error, level: LogLevel.ERROR, time: Date.now() });
    };
    /**
     * Log an info message
     * @param message
     * @param optionalParams
     */
    Log.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var info = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.info(info);
        Log_1._logEntry.next({ message: info, level: LogLevel.INFO, time: Date.now() });
    };
    /**
     * Log a log message
     * @param message
     * @param optionalParams
     */
    Log.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var log = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.log(log);
        Log_1._logEntry.next({ message: log, level: LogLevel.LOG, time: Date.now() });
    };
    /**
     * Log a trace message
     * @param message
     * @param optionalParams
     */
    Log.prototype.trace = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var trace = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.trace(trace);
        Log_1._logEntry.next({ message: trace, level: LogLevel.TRACE, time: Date.now() });
    };
    /**
     * Log a warn message
     * @param message
     * @param optionalParams
     */
    Log.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var warn = this.toString.apply(this, [message].concat(optionalParams));
        if (Log_1.logToConsole)
            console.warn(warn);
        Log_1._logEntry.next({ message: warn, level: LogLevel.WARN, time: Date.now() });
    };
    /**
     * Concatenates the log message with the additional param, and prepends the context
     * @param message
     * @param optionalParams
     */
    Log.prototype.toString = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var log = (this ? this.context : '') + message;
        if (optionalParams) {
            optionalParams.forEach(function (param) {
                try {
                    log += ' ' + JSON.stringify(param);
                }
                catch (e) {
                    log += ' [Object]';
                }
            });
        }
        return log;
    };
    /** If the logger should log to the console. */
    Log.logToConsole = true;
    /** Observable for when a new log entry is logged */
    Log._logEntry = new Subject_1.Subject();
    Log.$logEntry = Log_1._logEntry.asObservable();
    Log = Log_1 = __decorate([
        core_1.Injectable()
    ], Log);
    return Log;
    var Log_1;
}());
exports.Log = Log;
