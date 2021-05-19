const {AbstractLogger} = require('../../index');

// nodejs util
const util = require('util');

class TestLogger extends AbstractLogger {
    constructor() {
        super();
        this.history = [];
    }

    getName() {
        return 'test';
    }

    log(level, message, ...args) {
        let text = util.format(message, ...args);
        this.history.push({
            level: level,
            text: text
        });
    }
}

module.exports = TestLogger;