export class MessageNamespace {
  private regex: RegExp;

  constructor(private key: string) {
    this.init();
  }

  match(key: string) {
    return key.match(this.regex) != null;
  }

  private init() {
    var pattern = this.key
      .split(".")
      .map((input) => {
        return this.map(input);
      })
      .join("\\.");

    this.regex = new RegExp(this.wrap(pattern));
  }

  private escape(input: string) {
    return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  private wrap(pattern: string) {
    return "^" + pattern + "$";
  }

  private map(part: string) {
    if(part === "*")
      return ".*?";
    
    if(part === "**")
      return ".*";

    return this.escape(part);
  }
}