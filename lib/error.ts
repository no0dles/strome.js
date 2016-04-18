import {IMessageContext} from "./context";

export interface IErrorMessage {
  message: string;
  context: IMessageContext;
  source?: IErrorMessage;
}