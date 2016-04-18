import {IErrorMessage} from "./error";
import {MessageInstance} from "./instance";

export interface IAuthentication {
  anonymous: boolean,
  username: string,
  roles: string[]
}

export var AnonymousAuth: IAuthentication = {
  anonymous: true,
  username: "anonymous",
  roles: []
};

export interface IPermission {
  roles: string[]
}

export interface IUnauthorizedErrorMessage extends IErrorMessage {
  auth: IAuthentication;
  instance: MessageInstance<any>;
}