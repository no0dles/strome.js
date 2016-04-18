import {MessageContext, IMessageContext} from "./context";
import {IAuthentication, AnonymousAuth} from "./auth";
import {MessageInstance} from "./instance";

export class MessageHub extends MessageContext implements IMessageContext {
  private variables: { [key: string]: any };

  constructor() {
    super();

    this.parent = this;
    this.root = this;
    this.variables = {};
  }

  use(module: (hub: MessageHub) => void) {
    module(this);
  }

  emit<TInstance extends MessageInstance<any>>(instance: TInstance) {
    this.attach(instance, AnonymousAuth);
  }
  
  attach<TInstance extends MessageInstance<any>>(instance: TInstance, permission: IAuthentication) {
    this.emitParentCallbacks(instance, permission);
  }

  set<TValue>(key: string, value: TValue) {
    this.variables[key] = value;
    return this;
  }

  get<TValue>(key: string) : TValue {
    return <TValue>this.variables[key];
  }
}