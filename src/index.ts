import { execPromise } from "./exec-promise";
import { parseBlameInfoLine } from "./parse-line";

export async function blameLine(filepathWithLine: string) {
  const [filename, lineNumber] = filepathWithLine.split(":");
  const gitCommandString = `git blame --line-porcelain -L ${lineNumber},+1 ${filename}`;

  const blameOutput = await execPromise(gitCommandString);

  const mergedInfo: {
    [key: string]: string | Date;
  } = {};

  const lines = blameOutput.split("\n");

  // First line is not important so we skip it by starting from second line
  // <40-byte hex sha1> <sourceline> <resultline> <num_lines>
  for (let index = 1; index < lines.length; index++) {
    const line = lines[index];

    const partialInfo = parseBlameInfoLine(line);

    if (!partialInfo) {
      continue;
    }

    const { property: value } = partialInfo;

    mergedInfo[Object.keys(partialInfo)[0]] = value;
  }

  return mergedInfo;
}
