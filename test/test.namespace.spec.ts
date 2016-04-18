import {MessageNamespace} from "./../lib/namespace";
import {assert} from "chai";

var testKey = (messageKey: string, matchKey: string) => {
  var ns = new MessageNamespace(matchKey);
  var match = ns.match(messageKey);

  assert.isTrue(match, messageKey + " didn't match " + matchKey);
};

describe('Namespace Unit Test', () => {
  it('should match exact the same key', () => {
    testKey("test.key.message", "test.key.message");
  });

  it('should match single wild char keys', () => {
    testKey("test.key.message", "test.*.message");
    testKey("test.key.message", "test.key.*");
    testKey("test.key.message", "*.key.message");
  });

  it('should match multiple wild char keys', () => {
    testKey("test.key.message", "test.*.*");
    testKey("test.key.message", "*.key.*");
    testKey("test.key.message", "*.*.message");
  });


  it('should match double wild char keys', () => {
    testKey("test.key.message", "test.**");
    testKey("test.key.message", "**.message");
    testKey("test.key.message", "test.**.message");
  });

});