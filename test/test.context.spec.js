"use strict";
const auth_1 = require("./../lib/auth");
const instance_1 = require("./../lib/instance");
const chai_1 = require("chai");
const hub_1 = require("./../lib/hub");
const mock_1 = require("./../lib/mock");
describe('Context Unit Test', () => {
    it('Message should be emitted on parent context', (done) => {
        var context = new mock_1.MessageContextMock();
        var messageKey = "test.message";
        var messageData = { test: "data" };
        var messageInstance = new instance_1.MessageInstance(messageKey, messageData, { roles: [] });
        context.on(messageKey, (message, context) => {
            chai_1.assert.deepEqual(message, messageData);
            done();
        });
        var childContext = context.getChildContext(context, context, auth_1.AnonymousAuth);
        childContext.emit(messageInstance);
    });
    it('Message should be emitted on hub', (done) => {
        var context = new mock_1.MessageContextMock();
        var hub = new hub_1.MessageHub();
        var messageKey = "test.message";
        var messageData = { test: "data" };
        var messageInstance = new instance_1.MessageInstance(messageKey, messageData, { roles: [] });
        hub.on(messageKey, (message, context) => {
            chai_1.assert.deepEqual(message, messageData);
            done();
        });
        var childContext = context.getChildContext(hub, context, auth_1.AnonymousAuth);
        childContext.emit(messageInstance);
    });
    it('Get and Set', () => {
        var context = new mock_1.MessageContextMock();
        var hub = new hub_1.MessageHub();
        var testContext = context.getChildContext(hub, context, auth_1.AnonymousAuth);
        var key = "test";
        var value = "data";
        testContext.set(key, value);
        chai_1.assert.equal(testContext.get(key), value);
    });
});

//# sourceMappingURL=../dist/test/test.context.spec.js.map
