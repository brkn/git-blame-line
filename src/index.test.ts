import { blame } from './index';

describe('returns git blame as lines map', () => {
  it('supports blame options', async () => {
    // https://stackoverflow.com/questions/5098256/git-blame-prior-commits
    const res = await blame('lib/context.js', {
      gitDir: './test/koa/.git',
      range: '195,197',
    });
    expect(res).toBeInstanceOf(Map);
    expect(res.size).toBe(3);
    expect(res.get(196)).toMatchInlineSnapshot(`
      Object {
        "author": "Konstantin Vyatkin",
        "authorMail": "tino@vtkn.io",
        "authorTime": 1571054445,
        "authorTz": "-0400",
        "committer": "Yiyu He",
        "committerMail": "dead_horse@qq.com",
        "committerTime": 1571054445,
        "committerTz": "+0800",
        "filename": "lib/context.js",
        "hash": "d48d88ee17b780c02123e6d657274cab456e943e",
        "numberOfLines": 1,
        "previous": "8be5626bbb54e6c899a1b71d22411709126d9fea lib/context.js",
        "resultLine": 196,
        "sourceLine": 196,
        "summary": "feat: implement response.has (#1397)",
      }
    `);
  });
});
