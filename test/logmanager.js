const {LogManager, Level, AbstractLogger} = require('../index');

const DefaultLogger = require('./implements/defaultlogger');
const TestLogger = require('./implements/testlogger');

// 设置默认 Logger
let defaultLogger = new DefaultLogger();
LogManager.setDefaultLogger(defaultLogger);
// 或者：
// LogManager.addLogger(defaultLogger);

const assert = require('assert/strict')

describe('LogManager Test', ()=>{

    it('Test addLogger/getLogger', ()=>{
        let testLogger1 = new TestLogger();
        LogManager.addLogger(testLogger1);

        let logger1 = LogManager.getLogger('test');
        assert(logger1 instanceof TestLogger);

        try{
            LogManager.getLogger('none');
            fail();
        }catch(err) {
            // pass
        }
    });

    it('Test default logger', ()=>{
        const SomeModule = require('./somemodule');
        SomeModule.someFunctionWithLog();

        let history = defaultLogger.history;

        assert.equal(3, history.length);

        assert.equal(history[0].level, Level.debug);
        assert.equal(history[0].text, 'a');

        assert.equal(history[1].level, Level.info);
        assert.equal(history[1].text, 'b');

        assert.equal(history[2].level, Level.error);
        assert.equal(history[2].text, 'c');

    });

});

