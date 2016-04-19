import {HelloMessage, IHelloMessage, IConsoleOutputMessage, ConsoleOutputMessage} from "./messages";
import {MessageHub} from "strome.js/lib/hub";
import {IMessageContext} from "strome.js/lib/context";

var hub = new MessageHub();

HelloMessage.on(hub, (message: IHelloMessage, context: IMessageContext) => {
  ConsoleOutputMessage.emit(context, { message: "Hello " + message.name });
});

ConsoleOutputMessage.on(hub, (message: IConsoleOutputMessage, context: IMessageContext) => {
  console.log(message.message);
});

HelloMessage.emit(hub, { name: "World" });