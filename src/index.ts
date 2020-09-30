
import tokenize from "./tokenizer/tokenizer.js";
import JavaScriptScanner from "./tokenizer/langs/javascript.js";
import Parser from "./parser/parser.js";

async function main() {
  let scanner = new JavaScriptScanner();
  
  let src: string = "let myvar = 'hello world';";

  let tokens = await tokenize(src, scanner, ["whsp"]);
  for (let token of tokens) {
    console.log(token);
  }
  let parser = new Parser();
  let tree = parser.parse(tokens);
}

main();
