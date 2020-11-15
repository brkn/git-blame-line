import { camelCase } from "camel-case";
import fromUnixTime from "date-fns/fromUnixTime";

const BLAME_INFO_LINE_REGEX = /^(?<token>[a-z]+(-(?<subtoken>[a-z]+))?)\s(?<data>.+)$/;

type InfoLine = {
  [x: string]: string | Date;
};

export function parseBlameInfoLine(line: string): InfoLine {
  if (line === "boundary") {
    return {
      boundary: "",
    };
  }

  const commitInfo = BLAME_INFO_LINE_REGEX.exec(line);

  if (!commitInfo?.groups) {
    throw new Error(`
    Given line string is not a blame info line
    ${line}
    `);
  }

  const { token, subtoken, data } = commitInfo.groups;

  const property = camelCase(token);
  let value: string | Date = data;

  switch (subtoken) {
    case "mail":
      // remove <> from email
      value = value.slice(1, -1);
      break;

    case "time":
      // parse datestamp into date
      value = fromUnixTime(parseInt(value, 10));
      break;
    default:
      break;
  }

  return {
    [property]: value,
  };
}
