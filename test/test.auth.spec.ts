import {assert} from "chai";
import {Message, UnauthorizedErrorMessage} from "./../lib/message";
import {AnonymousAuth, IAuthentication, IUnauthorizedErrorMessage} from "./../lib/auth";
import {MessageHubMock} from "./../lib/mock";
import {IMessageContext} from "../lib/context";

var StaffRole = "staff";

export var StaffPermission: IAuthentication = {
  anonymous: false,
  username: "staff",
  roles: [StaffRole]
};

export interface ITestMessage {
  data: string;
}

export var TestMessage = new Message<ITestMessage>("test.message");

TestMessage.auth.roles = [StaffRole];


describe('Auth Unit Test', () => {
  it('Do not allow unauthorized access', (done) => {
    var hub = new MessageHubMock();

    var context = hub.getChildContext(hub, hub, AnonymousAuth);
    var instance = TestMessage.create({ data: "test" });

    UnauthorizedErrorMessage.on(hub, (message: IUnauthorizedErrorMessage, context: IMessageContext) => {
      assert.equal(message.auth, AnonymousAuth);
      assert.equal(message.instance, instance);

      done();
    });

    context.emit(instance);
  });

  it('Allow authorized access', () => {
    var hub = new MessageHubMock();

    var context = hub.getChildContext(hub, hub, StaffPermission);

    context.emit(TestMessage.create({ data: "test" }));
  });
});