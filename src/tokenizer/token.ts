
export default interface Token {
  type: string;
  data?: string;
}

export const EOFToken: Token = {
  type: "eof"
}
