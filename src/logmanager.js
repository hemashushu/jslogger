const {IllegalArgumentException} = require('jsexception');

const AbstractLogger = require('./abstractlogger');

let _defaultLogger = undefined;
let _loggerMap = new Map();

class LogManager {
    static addLogger(abstractLogger) {
        if (!abstractLogger instanceof AbstractLogger) {
            throw new IllegalArgumentException('Should be an AbstractLogger object.');
        }

        let name = abstractLogger.getName();
        _loggerMap.set(name, abstractLogger);

        // 第一个添加的 Logger 将会自动作为默认 Logger
        if (LogManager.logger === undefined) {
            LogManager.setDefaultLogger(abstractLogger);
        }
    }

    static getLogger(name) {
        let abstractLogger = _loggerMap.get(name);

        if (abstractLogger === undefined) {
            throw new IllegalArgumentException(
                `The logger with the specified name "${name}" cannot be found.`);
        }

        return abstractLogger;
    }

    /**
     * 设置默认 Logger，用于简化各模块调用 Logger 的过程。
     *
     * 需要注意设置默认 Logger 必须放在应用程序的入口（起始处）最靠前的
     * 位置，即必须放在其他 require/import 语句、其他语句执行之前，
     * 示例：
     *
     * main.js
     * -------
     *
     * const {LogManager} = require('jslogger');
     * const MyLogger = require('./path/to/my/logger');
     *
     * const myLogger = new MyLogger();
     *
     * LogManager.setDefaultLogger(myLogger);
     * // 或者
     * // LogManager.addLogger(myLogger);
     *
     * const {other_module} = require('...');
     *
     * ...other statements...
     *
     */
    static setDefaultLogger(abstractLogger) {
        _defaultLogger = abstractLogger;
    }

    /**
     * 获取默认 Logger
     *
     * 示例：
     * const {LogManager: {logger}} = require('jslogger');
     */
    static get logger() {
        return _defaultLogger;
    }
}

module.exports = LogManager;