const {LogManager: {logger}} = require('../index');

class SomeModule {
    static someFunctionWithLog() {
        logger.debug('a');
        logger.info('b');
        logger.error('c');
    }
}

module.exports = SomeModule;