/**
 * @see {@link https://git-scm.com/docs/git-blame#_options}
 */
export interface BlameOptions {
  /**
   * Annotate only the given line range. May be specified multiple times. Overlapping ranges are allowed.
   * @see {@link https://git-scm.com/docs/git-blame#_specifying_ranges}
   */
  range: string;
  ignoreWhitespace: boolean;
  workTree: string;
  gitDir: string;
  rev: string;
}

export interface LineInfo {
  sourceLine: number;
  resultLine: number;
  hash: string;
  numberOfLines: number;
  author: string;
  authorMail: string;
  authorTime: number;
  authorTz: string;
  commiter: string;
  commiterMail: string;
  commiterTime: number;
  commiterTz: string;
  summary: string;
  previous: string;
  filename: string;
  [k: string]: string | number;
}
