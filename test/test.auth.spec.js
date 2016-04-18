"use strict";
const chai_1 = require("chai");
const message_1 = require("./../lib/message");
const auth_1 = require("./../lib/auth");
const mock_1 = require("./../lib/mock");
var StaffRole = "staff";
exports.StaffPermission = {
    anonymous: false,
    username: "staff",
    roles: [StaffRole]
};
exports.TestMessage = new message_1.Message("test.message");
exports.TestMessage.auth.roles = [StaffRole];
describe('Auth Unit Test', () => {
    it('Do not allow unauthorized access', (done) => {
        var hub = new mock_1.MessageHubMock();
        var context = hub.getChildContext(hub, hub, auth_1.AnonymousAuth);
        var instance = exports.TestMessage.create({ data: "test" });
        message_1.UnauthorizedErrorMessage.on(hub, (message, context) => {
            chai_1.assert.equal(message.auth, auth_1.AnonymousAuth);
            chai_1.assert.equal(message.instance, instance);
            done();
        });
        context.emit(instance);
    });
    it('Allow authorized access', () => {
        var hub = new mock_1.MessageHubMock();
        var context = hub.getChildContext(hub, hub, exports.StaffPermission);
        context.emit(exports.TestMessage.create({ data: "test" }));
    });
});

//# sourceMappingURL=../dist/test/test.auth.spec.js.map
