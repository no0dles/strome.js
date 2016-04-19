import {Message} from "strome.js/lib/message";

export interface IHelloMessage {
  name: string;
}

export var HelloMessage = new Message<IHelloMessage>("hello.message");

export interface IConsoleOutputMessage {
  message: string;
}

export var ConsoleOutputMessage = new Message<IConsoleOutputMessage>("console.output.message");