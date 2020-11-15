import { camelCase } from "camel-case";
import fromUnixTime from "date-fns/fromUnixTime";

const BLAME_INFO_LINE_REGEX = /^(?<token>[a-z]+(-(?<subtoken>[a-z]+))?)\s(?<data>.+)$/;

export function parseBlameInfoLine(line: string) {
  const commitInfo = BLAME_INFO_LINE_REGEX.exec(line);

  if (!commitInfo?.groups) {
    console.log("Line does not match regex")
    console.log(line)
    return;
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
  }

  return {
    property: value,
  };
}
