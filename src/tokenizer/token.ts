
export default class Token {
  type: string;
  data?: string;
  constructor (type: string = undefined) {
    this.type = type;
  }
  is (type?: string, data?:string): boolean {
    let result: boolean = true;
    if (type != undefined) {
      if (this.type != type) result = false;
    }
    if (data != undefined) {
      if (this.data != data) result = false;
    }
    return result;
  }
}

export const EOFToken: Token = new Token();
EOFToken.type = "eof";

export class TokenAccessor {
  tokens: Array<Token>;
  offset: number;
  constructor() {
    this.offset = 0;
  }
  setTokens(tokens: Array<Token>): this {
    this.tokens = tokens.slice(); //copy array
    return this;
  }
  hasNext(): boolean {
    return (this.offset < this.tokens.length);
  }
  setOffset(ind: number): this {
    this.offset = ind;
    return this;
  }
  /**Fetches next token without incrementing
   */
  peakNext(): Token {
    return this.tokens[this.offset];
  }
  next(): Token {
    let result = this.tokens[this.offset];
    this.offset++;
    return result;
  }
  rewind(count: number = 1): this {
    this.offset -= count;
    if (this.offset < 0) this.offset = 0;
    return this;
  }
}
