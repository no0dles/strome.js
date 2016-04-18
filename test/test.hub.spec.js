"use strict";
const chai_1 = require("chai");
const hub_1 = require("./../lib/hub");
const instance_1 = require("../lib/instance");
const auth_1 = require("../lib/auth");
describe('Hub Unit Test', () => {
    it('Get and Set', () => {
        var hub = new hub_1.MessageHub();
        var key = "key";
        var data = { test: "data" };
        hub.set(key, data);
        chai_1.assert.deepEqual(hub.get(key), data);
    });
    it('Use Module', (done) => {
        var hub = new hub_1.MessageHub();
        var testKey = "test.message";
        var testData = { test: "data" };
        hub.use((module) => {
            module.on(testKey, (message, context) => {
                chai_1.assert.deepEqual(message, testData);
                done();
            });
        });
        hub.emit(new instance_1.MessageInstance(testKey, testData, auth_1.AnonymousAuth));
    });
    it('Emits only matched callbacks', (done) => {
        var hub = new hub_1.MessageHub();
        hub.on("test1.message", () => {
            chai_1.assert.fail();
        });
        hub.on("test2.message", () => {
            chai_1.assert.fail();
        });
        hub.on("test3.message", () => {
            done();
        });
        hub.emit(new instance_1.MessageInstance("test3.message", {}, auth_1.AnonymousAuth));
    });
    it('Emit multiple emitters', (done) => {
        var hub = new hub_1.MessageHub();
        var key = "test.message";
        var count = 0;
        var callback = (message, context) => {
            count++;
            if (count > 1)
                done();
        };
        hub.on(key, callback);
        hub.on(key, callback);
        hub.emit(new instance_1.MessageInstance(key, {}, auth_1.AnonymousAuth));
    });
});

//# sourceMappingURL=../dist/test/test.hub.spec.js.map
