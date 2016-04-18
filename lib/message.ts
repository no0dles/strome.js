import {IMessageContext} from "./context";
import {IMessageCallback} from "./callback";
import {MessageInstance} from "./instance";
import {IAuthentication, IPermission, IUnauthorizedErrorMessage} from "./auth";

export class Message<TData> {
  public auth: IPermission;

  constructor(public key: string) {
    this.auth = {
      roles: []
    };
  }

  on<TData>(context: IMessageContext, callback: IMessageCallback<TData>) {
    context.on(this.key, callback);
  }

  create(data: TData) {
    return new MessageInstance<TData>(this.key, data, this.auth);
  }
  
  emit(context: IMessageContext, data: TData, permission?: IAuthentication) {
    context.emit<MessageInstance<TData>>(this.create(data), permission);
  }
}

export var UnauthorizedErrorMessage = new Message<IUnauthorizedErrorMessage>("com.stromejs.unauthorized.message");