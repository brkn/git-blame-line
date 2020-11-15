[![npm version](https://img.shields.io/npm/v/git-blame-line?style=for-the-badge)](https://www.npmjs.com/package/git-blame-line) [![NPM downloads](https://img.shields.io/npm/dw/git-blame-line?style=for-the-badge)](https://www.npmjs.com/package/git-blame-line)

# Git-blame-line

Executes `git blame` asynchronously for a given `<filepath>:<linenumber>` string, and returns the information in JSON format.

## Usage

Instead of writing this.

```sh
git blame -L 1,+1 src/index.ts --line-porcelain
```

You can execute this from command line:

```sh
blame-line src/index.ts:1
```

And the output would be in the shape as:
```
{ author: 'Berkan Unal',
		authorMail: 'Berkanunal@gmail.com',
		authorTime: 2020-11-15T08:31:59.000Z,
		authorTz: '+0300',
		committer: 'Berkan Unal',
		committerMail: 'Berkanunal@gmail.com',
		committerTime: 2020-11-15T08:33:18.000Z,
		committerTz: '+0300',
		summary: 'Add parseBlameInfoLine and blameLine functions',
		previous: '5e5f4c76ba770c3ac1aeec72ad37cca6e2d5d270 src/index.ts',
		filename: 'src/index.ts',
		sourceCode: 'import { execPromise } from "./exec-promise";' }
```

## Installing for using inside a node project

```sh
yarn add git-blame-line
```
or 
```sh
npm install git-blame-line
```

Then import in the project and use it easily like this: 

```js
import { blameLine } from ".";

async function example() {
  const info = await blameLine("path/to/file:123");
  console.log(info);
}

example();
```

## License

MPL-2.0