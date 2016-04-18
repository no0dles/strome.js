import {IAuthentication} from "./auth";
import {IMessageCallback} from "./callback";
import {MessageInstance} from "./instance";
import {MessageEngine} from "./engine";
import {UnauthorizedErrorMessage} from "./message";

export interface IMessageContext {
  on<TData>(key: string, callback: IMessageCallback<TData>);
  emit<TInstance extends MessageInstance<any>>(instance: TInstance, permission?: IAuthentication);
  set<TValue>(key: string, value: TValue);
  get<TValue>(key: string): TValue;
}

export class MessageContext implements IMessageContext {
  protected callbacks: { [key: string]: MessageEngine };
  protected parent: MessageContext;
  protected root: MessageContext;
  protected auth: IAuthentication;

  constructor() {
    this.callbacks = {};
  }

  on<TInstance extends MessageInstance<any>>(key: string, callback: IMessageCallback<TInstance>) {
    if(!this.callbacks.hasOwnProperty(key)) {
      this.callbacks[key] = new MessageEngine(key);
    }

    this.callbacks[key].on(callback);
  }

  emit<TInstance extends MessageInstance<any>>(instance: TInstance, auth?: IAuthentication) {
    var executionAuth = auth || this.auth;

    if(!this.validatePermission(instance, executionAuth))
      this.root.emit(UnauthorizedErrorMessage.create({
        message: "Unauthorized access",
        auth: executionAuth,
        instance: instance,
        context: this
      }));

    if(this.parent !== this.root)
      this.root.emit(instance);

    this.emitParentCallbacks(instance, executionAuth);
  }

  set<TValue>(key: string, value: TValue) {
    this.root.set(key, value);
  }

  get<TValue>(key: string): TValue {
    return this.root.get<TValue>(key);
  }

  protected createChildContext(root: MessageContext, parent: MessageContext, auth: IAuthentication) {
    var context = new MessageContext();
    context.root = root;
    context.parent = parent;
    context.auth = auth;
    return context;
  }

  private validatePermission<TInstance extends MessageInstance<any>>(instance: TInstance, auth: IAuthentication) {
    if(instance.auth.roles.length === 0)
      return true;

    for(var role of instance.auth.roles) {
      if(auth.roles.indexOf(role) > -1)
        return true;
    }

    return false;
  }

  
  protected emitParentCallbacks<TInstance extends MessageInstance<any>>(instance: TInstance, auth: IAuthentication) {
    for(var key in this.parent.callbacks) {
      var callback = this.parent.callbacks[key];

      if(!callback.match(instance.key))
        continue;

      callback.emit(instance, this.createChildContext(this.root, this, auth));
    }
  }
}