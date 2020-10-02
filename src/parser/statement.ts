
import { TokenAccessor } from "../tokenizer/token.js";
import { ExpressionTemplate, Expression } from "./expression.js";

export class Statement {
  type: string;
  constructor() {

  }
}

export class StatementTemplate {
  etemps: Array<Expression>;
  parse(accessor: TokenAccessor): Statement {
    let result: Statement;

    return result;
  }
  hasExpressionTemplate (exp: ExpressionTemplate): boolean {
    return this.etemps.includes(exp);
  }
  addExpressionTemplate (exp: ExpressionTemplate): this {
    //Expression can be used twice
    this.etemps.push(exp);
    return this;
  }
  removeExpressionTemplate (exp: ExpressionTemplate): this {
    let ind = this.etemps.indexOf(exp);
    if (ind != -1) {
      this.etemps.splice(ind, 1);
    } else {
      throw `Cannot remove expression template ${exp} as it wasn't added/already removed`;
    }
    return this;
  }
  createExpressionTemplate (): ExpressionTemplate {
    let result = new ExpressionTemplate();
    this.addExpressionTemplate(result);
    return result;
  }
}
