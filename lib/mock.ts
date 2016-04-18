import {MessageContext} from "./context";
import {IAuthentication} from "./auth";
import {MessageHub} from "./hub";


export class MessageHubMock extends MessageHub {

  getChildContext(root: MessageContext, parent: MessageContext, auth: IAuthentication) {
    return this.createChildContext(root, parent, auth);
  }
  
}


export class MessageContextMock extends MessageContext {

  getChildContext(root: MessageContext, parent: MessageContext, auth: IAuthentication) {
    return this.createChildContext(root, parent, auth);
  }

}