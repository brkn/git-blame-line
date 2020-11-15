import { execPromise } from "./exec-promise";
import { parseBlameInfoLine } from "./parse-line";

type BlameInfo = {
  author: string;
  authorMail: string;
  authorTime: Date;
  authorTz: string;
  committer: string;
  committerMail: string;
  committerTime: Date;
  committerTz: string;
  summary: string;
  previous: string;
  filename: string;
  sourceCode: string;
};

export async function blameLine(filepathWithLine: string): Promise<BlameInfo> {
  const [
    filename,
    lineNumber
  ] = filepathWithLine.split(":");
  if (!lineNumber) {
    throw new Error("filepathWithLine syntax is wrong, use <filepath>:<linenumber> format");
  }
  const gitCommandString = `git blame --line-porcelain -L ${lineNumber},+1 ${filename}`;

  const blameOutput = await execPromise(gitCommandString);

  const lineInfos: {
    [key: string]: string | Date;
  }[] = [];

  const lines = blameOutput.split("\n");

  // * First line is not important so we skip it by starting from second line
  //    <40-byte hex sha1> <sourceline> <resultline> <num_lines>
  // * Last line is empty
  // * Second last line is content of the source code with a /t at the
  //   start of the line
  // So we skip these lines.
  for (let index = 1; index < lines.length - 2; index += 1) {
    const line = lines[index];

    const infoLine = parseBlameInfoLine(line);

    if (infoLine) {
      lineInfos.push(infoLine);
    }
  }

  const mergedInfo = lineInfos.reduce(
    (prev, current) => { return { ...prev, ...current }; },
    {}
  );
  mergedInfo.sourceCode = lines[lines.length - 2].replace("\t", "");

  return mergedInfo as BlameInfo;
}
