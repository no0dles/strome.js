import {IPermission} from "./auth";

export class MessageInstance<TMessageData> {
  constructor(public key: string,
              public data: TMessageData,
              public auth: IPermission) {
    
  }
}