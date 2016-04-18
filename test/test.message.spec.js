"use strict";
const chai_1 = require("chai");
const message_1 = require("../lib/message");
const hub_1 = require("../lib/hub");
exports.TestMessage = new message_1.Message("test.message");
describe('Message Unit Test', () => {
    it('Emit and listen for messages', (done) => {
        var hub = new hub_1.MessageHub();
        var data = { data: "test" };
        exports.TestMessage.on(hub, (message, context) => {
            chai_1.assert.deepEqual(message, data);
            done();
        });
        exports.TestMessage.emit(hub, data);
    });
});

//# sourceMappingURL=../dist/test/test.message.spec.js.map
