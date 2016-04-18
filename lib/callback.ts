import {IMessageContext} from "./context";

export interface IMessageCallback<TData> {
  (data: TData, context: IMessageContext): void;
}