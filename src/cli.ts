#!/usr/bin/env node
import meow from "meow";
import { blameLine } from ".";

const cli = meow(
  `
	Usage
	  $ blame-line <filepath>:<linenumber>

	Examples
	  $ blame-line src/index.ts:1

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
`,
  {
    description: false,
  }
);

function prettyPrint(json: unknown) {
  console.log(JSON.stringify(json, null, 2));
}

async function run() {
  if (!cli.input[0]) {
    cli.showHelp();
  } else {
    try {
      const info = await blameLine(cli.input[0]);

      prettyPrint(info);
    } catch (error) {
      console.error(error.message);
      cli.showHelp();
    }
  }
}

run();
