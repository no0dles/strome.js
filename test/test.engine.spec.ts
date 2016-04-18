import {assert} from "chai";
import {MessageEngine} from "./../lib/engine";
import {IMessageContext, MessageContext} from "./../lib/context";
import {AnonymousAuth} from "./../lib/auth";

describe('Engine Unit Test', () => {
  it('Match and emit Message', (done) => {
    var context = new MessageContext();
    var engine = new MessageEngine("test.message");
    var data = { test: "data" };

    engine.on((message: any, iContext: IMessageContext) => {
      assert.equal(context, iContext);
      assert.deepEqual(message, data);

      done();
    });

    assert.isTrue(engine.match("test.message"));

    engine.emit({key: "test.message", auth: AnonymousAuth, data: data}, context);
  });
});