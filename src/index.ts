import { execPromise } from "./exec-promise";
import { parseBlameInfoLine } from "./parse-line";

export async function blameLine(filepathWithLine: string) {
  const [filename, lineNumber] = filepathWithLine.split(":");
  const gitCommandString = `git blame --line-porcelain -L ${lineNumber},+1 ${filename}`;

  const blameOutput = await execPromise(gitCommandString);

  const lineInfos: {
    [key: string]: string | Date;
  }[] = [];

  const lines = blameOutput.split("\n");

  // First line is not important so we skip it by starting from second line
  // <40-byte hex sha1> <sourceline> <resultline> <num_lines>
  // Last line is empty
  // Second last line is source code with a /t at the start of the line
  // so we skip these.
  for (let index = 1; index < lines.length - 2; index++) {
    const line = lines[index];

    const infoLine = parseBlameInfoLine(line);

    if (!infoLine) {
      continue;
    }

    lineInfos.push(infoLine);
  }

  const mergedInfo = lineInfos.reduce(
    (prev, current) => ({ ...prev, ...current }),
    {}
  );
  mergedInfo.sourceCode = lines[lines.length - 2].replace("\t", "");

  return mergedInfo;
}
