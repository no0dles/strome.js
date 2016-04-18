import {MessageHub} from "../../lib/hub";
import {HelloMessage, IHelloMessage, IConsoleOutputMessage, ConsoleOutputMessage} from "./messages";
import {IMessageContext} from "../../lib/context";

var hub = new MessageHub();

HelloMessage.on(hub, (message: IHelloMessage, context: IMessageContext) => {
  ConsoleOutputMessage.emit(context, { message: "Hello " + message.name });
});

ConsoleOutputMessage.on(hub, (message: IConsoleOutputMessage, context: IMessageContext) => {
  console.log(message.message);
});

HelloMessage.emit(hub, { name: "World" });