const path = require('path')
const qaEnv = require('./test/envs/qa.json')
const allureReporter = require('@wdio/allure-reporter').default

let testEnv

qaEnv.username = process.env.USER || qaEnv.username
qaEnv.password = process.env.PASSWORD || qaEnv.password
testEnv = qaEnv

exports.config = {

    specs: [
        './test/specs/**/*.js'
    ],
    suites: {
        login: ['./test/specs/login.spec.js'],
        invoices: ['./test/specs/invoice.spec.js']
    },

    maxInstances: 1,
    capabilities: [{ 
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    bail: 0,
    baseUrl: testEnv.url,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 6000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['selenium-standalone', { driver: {chrome: 'latest'} }]
    ],

    framework: 'mocha',
    reporters: ['spec', 
    ['allure', {
        outputDir: './reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
    }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    //
    // =====
    // Hooks
    // =====

    beforeSession: function (config, capabilities, specs, cid) {
        global.testEnv = testEnv
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        const file_name = `${test.parent} - ${test.title}.png`
        const outputFile = path.join('./reports/screenshots/', file_name)
        await browser.saveScreenshot(path.resolve(outputFile))
        allureReporter.addStep(file_name, [{outputFile}])
    },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
}
