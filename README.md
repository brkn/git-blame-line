[![npm version](https://img.shields.io/npm/v/git-blame-line?style=for-the-badge)](https://www.npmjs.com/package/git-blame-line) [![NPM downloads](https://img.shields.io/npm/dw/git-blame-line?style=for-the-badge)](https://www.npmjs.com/package/git-blame-line)

# Git-blame-line

Executes `git blame` asynchronously for a given `<filepath>:<linenumber>` string, and returns the information in JSON format.

## Usage

You don't need to remember git syntax to get blame info for single line now. Instead of writing this:

```sh
git blame -L 19,+1 --line-porcelain src/index.ts
```

You can execute this from command line:

```sh
blame-line src/index.ts:19
```

And the output would be in the shape as:
```
{
  "author": "Berkan Unal",
  "authorMail": "Berkanunal@gmail.com",
  "authorTime": "2020-11-15T17:35:01.000Z",
  "authorTz": "+0300",
  "committer": "Berkan Unal",
  "committerMail": "Berkanunal@gmail.com",
  "committerTime": "2020-11-15T17:35:01.000Z",
  "committerTz": "+0300",
  "summary": "Remove babel webpack, add eslint, lint project",
  "previous": "816634e51cf31c2d7bd18b7a8b082aff539e1bcd src/index.ts",
  "filename": "src/index.ts",
  "sourceCode": "export async function blameLine(filepathWithLine: string): Promise<BlameInfo> {"
}
```

## Installing for using inside a node project

```sh
yarn add git-blame-line
```
or 
```sh
npm install git-blame-line
```

Then import in the project and use it easily like this <sup>1</sup>:

```js
const { blameLine } = require("git-blame-line");

async function example() {
  const info = await blameLine("path/to/file:123");
  console.log(info);
}

example();
```

<sup>1</sup> You don't have to use requirejs syntax

## License

MPL-2.0