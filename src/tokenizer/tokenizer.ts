
import Token, { EOFToken } from "./token.js";
import Scanner from "./scanner.js";

export default function tokenizer(data: string, scanner: Scanner): Promise<Array<Token>> {
  return new Promise((resolve, reject) => {
    let result: Array<Token> = new Array();

    scanner.setData(data);

    let token: Token;

    while (scanner.available() > 0) {
      token = scanner.next();
      console.log(token);
      if (token.type == "error") {
        reject(`${token.data}`);
        break;
      }
      result.push(token);
    }

    resolve(result);
  });
}
