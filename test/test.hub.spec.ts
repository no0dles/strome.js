import {assert} from "chai";
import {MessageHub} from "./../lib/hub";
import {IMessageContext} from "../lib/context";
import {MessageInstance} from "../lib/instance";
import {AnonymousAuth} from "../lib/auth";

describe('Hub Unit Test', () => {
  it('Get and Set', () => {
    var hub = new MessageHub();

    var key = "key";
    var data = { test: "data" };

    hub.set(key, data);

    assert.deepEqual(hub.get(key), data);
  });

  it('Use Module', (done) => {
    var hub = new MessageHub();
    var testKey = "test.message";
    var testData = { test: "data" };

    hub.use((module: MessageHub) => {
      module.on(testKey, (message: any, context: IMessageContext) => {
        assert.deepEqual(message, testData);

        done();
      });
    });

    hub.emit(new MessageInstance(testKey, testData, AnonymousAuth));
  });

  it('Emits only matched callbacks', (done) => {
    var hub = new MessageHub();

    hub.on("test1.message", () => {
      assert.fail();
    });

    hub.on("test2.message", () => {
      assert.fail();
    });

    hub.on("test3.message", () => {
      done();
    });

    hub.emit(new MessageInstance("test3.message", {}, AnonymousAuth));
  });


  it('Emit multiple emitters', (done) => {
    var hub = new MessageHub();

    var key = "test.message";
    var count = 0;

    var callback = (message: any, context: IMessageContext) => {
      count++;

      if(count > 1)
        done();
    };

    hub.on(key, callback);
    hub.on(key, callback);

    hub.emit(new MessageInstance(key, {}, AnonymousAuth));
  });
});