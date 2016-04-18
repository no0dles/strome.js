import {MessageNamespace} from "./namespace";
import {IMessageContext} from "./context";
import {IMessageCallback} from "./callback";
import {MessageInstance} from "./instance";


export class MessageEngine {
  private namespace: MessageNamespace;
  private callbacks: IMessageCallback<any>[];

  constructor(private key: string) {
    this.callbacks = [];
    this.namespace = new MessageNamespace(key);
  }

  on(callback: IMessageCallback<any>) {
    this.callbacks.push(callback);
  }

  match(key: string) {
    return this.namespace.match(key);
  }

  emit<TInstance extends MessageInstance<any>>(instance: TInstance, context: IMessageContext) {
    this.callbacks.forEach((callback: IMessageCallback<any>) => {
      callback(instance.data, context);
    });
  }
}