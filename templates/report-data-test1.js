registerResult({
    "config": {
        "title": "Test Report",
        "reportDir": "/tmp/reports",
        "screenshots": "fail",
        "xyz": 122
    },
    "suiteInfo": {
        "totalSpecsDefined": 4,
        "order": {
            "random": false,
            "seed": "05251"
        }
    },
    "suites": [
        {
            "id": "suite1",
            "description": "TEST",
            "fullName": "TEST",
            "failedExpectations": [],
            "specs": [
                {
                    "id": "spec0",
                    "description": "1. Check the page header",
                    "fullName": "TEST 1. Check the page header",
                    "failedExpectations": [],
                    "passedExpectations": [
                        {
                            "matcherName": "toMatch",
                            "message": "Passed.",
                            "stack": "",
                            "passed": true
                        }
                    ],
                    "pendingReason": "",
                    "status": "passed"
                },
                {
                    "id": "spec1",
                    "description": "2. Check the Logo is displayed",
                    "fullName": "TEST 2. Check the Logo is displayed",
                    "failedExpectations": [
                        {
                            "matcherName": "toBe",
                            "message": "Expected true to be false.",
                            "stack": "Error: Failed expectation\n    at UserContext.<anonymous> (/Users/raj/projects/best-html-reporter/test/login.js:14:49)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1067:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2396:12)\n    at schedulerExecute (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2970:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2953:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2860:25)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:676:7",
                            "passed": false,
                            "expected": false,
                            "actual": true
                        }
                    ],
                    "passedExpectations": [],
                    "pendingReason": "",
                    "status": "failed"
                },
                {
                    "id": "spec2",
                    "description": "3. Click on the start button",
                    "fullName": "TEST 3. Click on the start button",
                    "failedExpectations": [
                        {
                            "matcherName": "toMatch",
                            "message": "Expected 'http://www.protractortest.org/#/' to match 'http://wdxww.psrotractortest.org/#/'.",
                            "stack": "Error: Failed expectation\n    at /Users/raj/projects/best-html-reporter/test/login.js:19:39\n    at elementArrayFinder_.then (/usr/local/lib/node_modules/protractor/lib/element.ts:840:22)\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1366:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2970:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2953:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2813:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:676:7\n    at process._tickCallback (internal/process/next_tick.js:103:7)",
                            "passed": false,
                            "expected": "http://wdxww.psrotractortest.org/#/",
                            "actual": "http://www.protractortest.org/#/"
                        }
                    ],
                    "passedExpectations": [],
                    "pendingReason": "",
                    "status": "failed"
                },
                {
                    "id": "spec3",
                    "description": "4. Click on the Quit button",
                    "fullName": "TEST 4. Click on the Quit button",
                    "failedExpectations": [
                        {
                            "matcherName": "toMatch",
                            "message": "Expected 'https://www.google.com/?gws_rd=ssl' to match 'sfvbjdfv'.",
                            "stack": "Error: Failed expectation\n    at /Users/raj/projects/best-html-reporter/test/login.js:26:41\n    at elementArrayFinder_.then (/usr/local/lib/node_modules/protractor/lib/element.ts:840:22)\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1366:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2970:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2953:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2813:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:676:7\n    at process._tickCallback (internal/process/next_tick.js:103:7)",
                            "passed": false,
                            "expected": "sfvbjdfv",
                            "actual": "https://www.google.com/?gws_rd=ssl"
                        }
                    ],
                    "passedExpectations": [],
                    "pendingReason": "",
                    "status": "failed"
                }
            ],
            "status": "finished"
        }
    ]
});