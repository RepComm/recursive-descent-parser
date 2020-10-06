# recursive-descent-parser
Learning how to write a compiler


## Building
`npm run build` or `./build.sh`

## Methods described
There are several steps to run source code<br>
A series of passes over the data make it easier to handle:<br>

### Tokenize
The first step scans through the source code as a string<br>
and returns a series of tokens<br>
identified by their:
1. `type` - defines syntactic usage, such as identifier, keyword, operator, brackets, etc
2. `data` - typically the string represented by the type, but can be transformed by preprocessor<br>
For instance, a preprocessor could take several tokens:<br>
`{type: "parenthesis", data:"("}`,<br>
`{type: "parenthesis", data:")"}`,<br>
`{type: "operator", data:"="}`,<br>
`{type: "operator", data:">"},`<br>
<br>
And turn them into<br>
`{type: "arrow-function", data:"()=>"}`,<br>
3. line and char numbers (useful for debugging source)

### Preprocess
This part is still in the works, but it will essentially<br>
be a function that passes over tokens and returns a<br>
modified set.<br>
<br>
What modifications actual entells is up to the preprocessor<br>
but some examples are:
- source directives
- `.babelrc`
- special language features<br>
not supported by a parser that<br>
can be broken down into lower level codes.

### Parser
Creates a tree structure from a token array<br>
called an Abstract Syntax Tree or AST<br>

This is where the recursive descent part comes into play, and the part I came here to learn about.

### Interpreter / Codegen
I plan on implementing both an interpreter and code generator.<br>

They will take an abstract syntax tree and<br>
- run (interpreter)
- or compile (codegen) <br>
it into some lower level code<br>
(typically OP codes, or machine code)

## Implementation
In my process I've decided to take a language-agnostic<br>
approach, even though my end goal is probably<br> something like `typescript/javascript`<br>

For instance, the tokenizer process actually relies<br>
on a `Scanner`, which is where language syntax will actually be handled,<br>
and the `tokenize` function will already be implemented for you.

To handle your own language, you'll need to implement<br>
a scanner subclass.

### Scanner
This is a class meant to be extended<br>
It provides functionality to implement scanning text<br>
an a more standard way, which should make debugging easier<br>

- addPass - for adding more syntax handling
  ```ts
  addPass(name: string, pass: ScannerPass): this
  ```
  Where `name` is the token.type when pass is successful<br>
  and pass is a [scanner pass](#ScannerPass)

### ScannerPass
Each scanner pass is meant to handle a single type of<br>
language syntax.

```ts
(data: string, offset: number): ScannerData
```
Where `data` is the source code data<br>
`offset` the offset in the source to read from<br>
and `return` expected to be a [ScannerData](#ScannerData)

### ScannerData
```ts
{
  success: boolean //needs to be false when not finding data at offset that satisfies ScannerData.type
  readChars: number //chars that fit this type before we read something we didn't like
  readLines: number //obsolete, this will be handled by internal code soon
  error?: string //optional - meant for when positive identification of error is determined, not necessarily every time success == false
}
```
Note that scanner data does not actually return the text that was read, only the char count.<br>
This is to standardize the reading process, which should cause a lot less errors<br>
between implementations of languages.<br>

Basically: don't allow reading of chars that don't fit your specifications, and don't count ones that don't.
