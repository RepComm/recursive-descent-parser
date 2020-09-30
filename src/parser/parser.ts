
import Tree from "./tree.js";
import Token from "../tokenizer/token.js";
import JavaScriptScanner from "../tokenizer/langs/javascript.js";

export class TokenAccessor {
  tokens: Array<Token>;
  offset: number;
  constructor () {
    this.offset = 0;
  }
  setTokens(tokens: Array<Token>): this {
    this.tokens = tokens.slice(); //copy array
    return this;
  }
  hasNext (): boolean {
    return (this.offset < this.tokens.length);
  }
  setOffset(ind: number): this {
    this.offset = ind;
    return this;
  }
  /**Fetches next token without incrementing
   */
  peakNext (): Token {
    return this.tokens[this.offset];
  }
  next (): Token {
    let result = this.tokens[this.offset];
    this.offset ++;
    return result;
  }
  rewind(count: number = 1): this {
    this.offset -= count;
    if (this.offset < 0) this.offset = 0;
    return this;
  }
}

export default class Parser {
  constructor () {
  }
  parse (tokens: Token[]): Tree {
    let accessor = new TokenAccessor().setTokens(tokens);

    let result: Tree = {};

    while (accessor.hasNext()) {
      let t = accessor.next();
      if (t.is(JavaScriptScanner.IDENTIFIER)) {
        switch (t.data) {
          case "let":
            console.log("var dec", accessor.peakNext().data);
            break;
          case "var":
            break;
          case "const":
            break;
          case "class":
            break;
        }
      }
    }

    return result;
  }
}
