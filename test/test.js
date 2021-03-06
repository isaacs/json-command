var sys = require("sys"),
    assert = require("assert"),
    jsonCommand = require("../lib/jsonCommand");

var testObj = {
  id : 19375093,
  text : "who knows",
  user : {
    id : 1310571,
    name : "foo"
  },
  created_at : 127817599
};

function printTestName(testName) {
  sys.puts("\nRunning " + testName + ":");
  sys.puts("-----------------------------------------");
}

(function testSimpleSetup() {

  (function testProcessArgs() {
    printTestName("testProcessArgs");

    var jsonC = new JSON.Command();
    var conditions = [ "(name == 'foo')", "(text == 'boo')" ];
    jsonC.processArgs([ "-c", conditions[0], "-c", conditions[1] ]);
    assert.equal(jsonC.conditionals[0], conditions[0],
      "conditionals contains specified conditional [0]");
    assert.equal(jsonC.conditionals[1], conditions[1],
      "conditionals contains specified conditional [1]");

  })();

  (function testCreateRequestedKeys() {
    printTestName("testCreateRequestedKeys");

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "newKey" ]);
    jsonC.createRequestedKeys(testObj);

    assert.equal(testObj.newKey, null,
      "createRequestedKeys adds requested key to object");
  })();

  (function testCheckConditionals() {
    printTestName("testCheckConditionals");

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "-c", "(name == 'foo')"]);

    assert.equal(jsonC.checkConditionals(testObj), false,
      "checkConditionals (name=='foo') is false");

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "-c", "(user.name == 'foo')"]);

    assert.equal(jsonC.checkConditionals(testObj), true,
      "checkConditionals (user.name=='foo') is true");
  })();

  (function testProcessKeyTransforms() {
    printTestName("testProcessKeyTransforms");

    var tmpTestObj = {
      id : 19375093, text : "who knows", created_at : 127817599,
      user : {
        id : 1310571, name : "foo"
      }
    };

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "user.new_name=user.name", "-d"]);
    jsonC.createRequestedKeys(tmpTestObj);
    jsonC.processKeyTransforms(tmpTestObj);

    assert.equal(tmpTestObj.user.new_name, testObj.user.name,
      "processKeyTransforms user.new_name = user.name is true");

  })();

  (function testProcessExecutables() {
    printTestName("testProcessExecutables");

    var tmpTestObj = {
      id : 19375093, text : "who knows", created_at : 127817599,
      user : {
        id : 1310571, name : "foo"
      }
    };

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "-e", "user.name = 'boo';"]);
    jsonC.processExecutables(tmpTestObj);

    assert.equal(tmpTestObj.user.name, "boo",
      "processExecutables user.name = 'boo' is true");
  })();

  (function testProcessKeys() {
    printTestName("testProcessKeys");

    var jsonC = new JSON.Command();
    jsonC.processArgs([ "user.name", "text" ]);
    assert.equal(jsonC.keys.length, 2,
      "processedKeys keys length == 2");

    var resObj = jsonC.processKeys(testObj);

    assert.equal(resObj.user.name, testObj.user.name,
      "processKeys result object user.name = testObj.user.name is true");
    assert.equal(resObj.text, testObj.text,
      "processKeys result object user.name = testObj.text is true");
    assert.equal(resObj.id, undefined,
      "processKeys result object id is undefined is true");
    assert.equal(resObj.created_at, undefined,
      "processKeys result object created_at is undefined is true");
    assert.equal(resObj.user.id, undefined,
      "processKeys result object user.id is undefined is true");
  })();

})();

sys.puts("\nAll tests passed!\n");
