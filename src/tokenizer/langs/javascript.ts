
import Scanner, { ScannerData } from "../scanner.ts";
import Token from "../token.ts";

const numbers = "0123456789";
const ops = "-+/*%=";
const ws = " \n";
const idents = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
const terms = ";.,"
const paren = "()";
const brackets = "{[]}";

export default class JavaScriptScanner extends Scanner {
  static IDENTIFIER: string = Token.TYPE_IDENTIFIER;
  static STRING_LITERAL: string = Token.TYPE_STRING_LITERAL;
  static NUMBER_LITERAL: string = Token.TYPE_NUMBER_LITERAL;
  static OPERATOR: string = Token.TYPE_OPERATOR;
  static BRACKET: string = "brak";
  static TERMINATOR: string = Token.TYPE_TERMINATOR;
  static WHITESPACE: string = Token.TYPE_WHITESPACE;
  static PARENTHESIS: string = "pare";
  constructor() {
    super();
    this.addPass(JavaScriptScanner.IDENTIFIER, (data, offset) => {
      let result: ScannerData = {
        success: false,
        readChars: 0,
        readLines: 0
      };

      const max = Math.min(data.length, offset + 309);

      //no need to scan past what we can't handle, use only 309 max chars
      for (let i = offset; i < max; i++) {
        if (idents.includes(data.charAt(i))) {
          result.readChars++;
        } else {
          if (result.readChars > 0) {
            result.success = true;
          }
          return result;
        }
      }
      // if (numbers.includes(data.charAt(offset+max))) {
      //   result.success = false;
      //   result.error = `too many number chars for a literal: ${data.substring(offset, offset+max)}`;
      // }
      if (result.readChars > 0) {
        result.success = true;
      }

      return result;
    })
      .addPass(JavaScriptScanner.STRING_LITERAL, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };

        let matchQuote: string;
        let ignoreNextMatchQuote: boolean = false;

        let char = data.charAt(offset);
        if (char == "\"") {
          matchQuote = char;
        } else if (char == "'") {
          matchQuote = char;
        } else if (char == "`") {
          matchQuote = char;
        } else {
          return result;
        }
        result.readChars++;

        for (let i = offset + 1; i < data.length; i++) {
          char = data.charAt(i);
          if (char == matchQuote) {
            if (!ignoreNextMatchQuote) {
              result.success = true;
              result.readChars++;
              return result;
            }
          } else if (char == "\\") {
            ignoreNextMatchQuote = true;
          } else {
            if (ignoreNextMatchQuote) ignoreNextMatchQuote = false;
          }
          result.readChars++;
        }

        return result;
      })
      .addPass(JavaScriptScanner.NUMBER_LITERAL, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };

        const max = Math.min(data.length, offset + 309);

        //no need to scan past what we can't handle, use only 309 max chars
        for (let i = offset; i < max; i++) {
          if (numbers.includes(data.charAt(i))) {
            result.readChars++;
          } else {
            if (result.readChars > 0) {
              result.success = true;
            }
            return result;
          }
        }
        // if (numbers.includes(data.charAt(offset+max))) {
        //   result.success = false;
        //   result.error = `too many number chars for a literal: ${data.substring(offset, offset+max)}`;
        // }
        if (result.readChars > 0) {
          result.success = true;
        }

        return result;
      })
      .addPass(JavaScriptScanner.OPERATOR, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };
        if (ops.includes(data.charAt(offset))) {
          result.success = true;
          result.readChars = 1;
        }
        return result;
      })
      .addPass(JavaScriptScanner.BRACKET, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };
        if (brackets.includes(data.charAt(offset))) {
          result.success = true;
          result.readChars = 1;
        }
        return result;
      })
      .addPass(JavaScriptScanner.PARENTHESIS, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };
        if (paren.includes(data.charAt(offset))) {
          result.success = true;
          result.readChars = 1;
        }
        return result;
      })
      .addPass(JavaScriptScanner.TERMINATOR, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };
        if (terms.includes(data.charAt(offset))) {
          result.success = true;
          result.readChars = 1;
        }
        return result;
      })
      .addPass(JavaScriptScanner.WHITESPACE, (data, offset) => {
        let result: ScannerData = {
          success: false,
          readChars: 0,
          readLines: 0
        };

        //no need to scan past what we can't handle
        for (let i = offset; i < Number.MAX_SAFE_INTEGER; i++) {
          if (ws.includes(data.charAt(i))) {
            result.readChars++;
          } else {
            if (result.readChars > 0) {
              result.success = true;
            }
            return result;
          }
        }
        return result;
      });
  }
}
