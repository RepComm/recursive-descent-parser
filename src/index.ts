
import tokenize from "./tokenizer/tokenizer";
import JavaScriptScanner from "./tokenizer/langs/javascript";
import Parser from "./parser/parser";
import { StatementTemplate } from "./parser/statement";

async function main() {
  let scanner = new JavaScriptScanner();
  
  let src: string = "let myvar = 'hello world';";

  let tokens = await tokenize(src, scanner, ["whsp"]);
  // for (let token of tokens) {
  //   console.log(token);
  // }

  //Move this to a javascript parser with all the templates built in
  let parser = new Parser();

  //Create a for loop matcher
  let forLoop = parser.createStatementTemplate();
  //The initialize (first part of for loop)
  let forLoopInit = forLoop.createExpressionTemplate();
  //the bounds checker (middle part of for loop)
  let forLoopCheck = forLoop.createExpressionTemplate();
  //the incrementer (last part of for loop)
  let forLoopIncrement = forLoop.createExpressionTemplate();
  //the block to be executed
  let forLoopBlock = forLoop.createExpressionTemplate();

  console.log(tokens);
  // let tree = parser.parse(tokens);
  // console.log("Tree", tree);
}

main();
