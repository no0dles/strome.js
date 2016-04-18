import {AnonymousAuth} from "./../lib/auth";
import {MessageInstance} from "./../lib/instance";
import {assert} from "chai";
import {IMessageContext} from "./../lib/context";
import {MessageHub} from "./../lib/hub";
import {MessageContextMock} from "./../lib/mock";

describe('Context Unit Test', () => {
  it('Message should be emitted on parent context', (done) => {
    var context = new MessageContextMock();

    var messageKey = "test.message";
    var messageData = { test: "data" };
    var messageInstance = new MessageInstance(messageKey, messageData, { roles: [] });

    context.on(messageKey, (message: any, context: IMessageContext) => {
      assert.deepEqual(message, messageData);

      done();
    });

    var childContext = context.getChildContext(context, context, AnonymousAuth);

    childContext.emit(messageInstance);
  });

  it('Message should be emitted on hub', (done) => {
    var context = new MessageContextMock();
    var hub = new MessageHub();

    var messageKey = "test.message";
    var messageData = { test: "data" };
    var messageInstance = new MessageInstance(messageKey, messageData, { roles: [] });

    hub.on(messageKey, (message: any, context: IMessageContext) => {
      assert.deepEqual(message, messageData);

      done();
    });

    var childContext = context.getChildContext(hub, context, AnonymousAuth);

    childContext.emit(messageInstance);
  });

  it('Get and Set', () => {
    var context = new MessageContextMock();
    var hub = new MessageHub();

    var testContext = context.getChildContext(hub, context, AnonymousAuth);
    var key = "test";
    var value = "data";

    testContext.set(key, value);

    assert.equal(testContext.get(key), value);
  });
});