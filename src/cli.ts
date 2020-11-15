#!/usr/bin/env node
import meow from "meow";
import { blameLine } from ".";

const cli = meow(
  `
	Usage
	  $ blame-line <filepath>:<linenumber>

	Examples
	  $ blame-line src/index.ts:1

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
`, {
    description: false,
  }
);

async function run() {
  if (!cli.input[0]) {
    cli.showHelp();
  } else {
    try {
      const info = await blameLine(cli.input[0]);
      console.log(info);
    } catch (error) {
      console.error(error.message);
      cli.showHelp();
    }
  }
}

run();
