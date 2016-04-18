import {assert} from "chai";
import {IMessageContext} from "../lib/context";
import {Message} from "../lib/message";
import {MessageHub} from "../lib/hub";


export interface ITestMessage {
  data: string;
}

export var TestMessage = new Message<ITestMessage>("test.message");

describe('Message Unit Test', () => {
  it('Emit and listen for messages', (done) => {
    var hub = new MessageHub();
    var data = { data: "test" };

    TestMessage.on(hub, (message: any, context: IMessageContext) => {
      assert.deepEqual(message, data);

      done();
    });

    TestMessage.emit(hub, data);
  });
});