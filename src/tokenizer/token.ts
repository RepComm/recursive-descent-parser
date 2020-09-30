
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
