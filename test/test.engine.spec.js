"use strict";
const chai_1 = require("chai");
const engine_1 = require("./../lib/engine");
const context_1 = require("./../lib/context");
const auth_1 = require("./../lib/auth");
describe('Engine Unit Test', () => {
    it('Match and emit Message', (done) => {
        var context = new context_1.MessageContext();
        var engine = new engine_1.MessageEngine("test.message");
        var data = { test: "data" };
        engine.on((message, iContext) => {
            chai_1.assert.equal(context, iContext);
            chai_1.assert.deepEqual(message, data);
            done();
        });
        chai_1.assert.isTrue(engine.match("test.message"));
        engine.emit({ key: "test.message", auth: auth_1.AnonymousAuth, data: data }, context);
    });
});

//# sourceMappingURL=../dist/test/test.engine.spec.js.map
