const Level = require('./level');

/**
 * 抽象 Logger
 *
 * 因为 JavaScript 没有提供接口功能，所以只能用普通类代替。
 */
class AbstractLogger {

    /**
     * 返回 Logger 实现的名称
     *
     * @returns
     */
    getName() {
        // 子类必须重写此方法
    }

    error(message, ...args) {
        this.log(Level.error, message, ...args);
    }

    warn(message, ...args) {
        this.log(Level.warn, message, ...args);
    }

    info(message, ...args) {
        this.log(Level.info, message, ...args);
    }

    verbose(message, ...args) {
        this.log(Level.verbose, message, ...args);
    }

    debug(message, ...args) {
        this.log(Level.debug, message, ...args);
    }

    /**
     *
     * @param {*} level
     * @param {*} message 记录的字符串内容，可以包含一个或多个指示符（specifier）。
     * @param  {...any} args 用于填充指示符的数据
     */
    log(level, message, ...args) {
        // 子类必须重写此方法

        // 可用的指示符：
        // 摘抄自：https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args
        //
        // - %s: String will be used to convert all values except BigInt, Object and -0. BigInt values
        //       will be represented with an n and Objects that have no user defined toString function
        //       are inspected using util.inspect() with options { depth: 0, colors: false, compact: 3 }.
        // - %d: Number will be used to convert all values except BigInt and Symbol.
        // - %i: parseInt(value, 10) is used for all values except BigInt and Symbol.
        // - %f: parseFloat(value) is used for all values expect Symbol.
        // - %j: JSON. Replaced with the string '[Circular]' if the argument contains circular references.
        // - %o: Object. A string representation of an object with generic JavaScript object formatting.
        //       Similar to util.inspect() with options { showHidden: true, showProxy: true }. This will
        //       show the full object including non-enumerable properties and proxies.
        // - %O: Object. A string representation of an object with generic JavaScript object formatting.
        //       Similar to util.inspect() without options. This will show the full object not including
        //       non-enumerable properties and proxies.
        // - %c: CSS. This specifier is ignored and will skip any CSS passed in.
        // - %%: single percent sign ('%'). This does not consume an argument.
    }
}

module.exports = AbstractLogger;