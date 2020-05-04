import { blame } from './index';

describe('returns git blame as lines map', () => {
  it('supports blame options', async () => {
    // https://stackoverflow.com/questions/5098256/git-blame-prior-commits
    const res = await blame('lib/context.js', {
      gitDir: './test/koa/.git',
      range: '195,197',
      rev: '..2.11.0',
    });
    expect(res).toBeInstanceOf(Map);
    expect(res.size).toBe(3);
    expect(res.get(196)).toMatchInlineSnapshot(`
      Object {
        "author": "dead-horse",
        "authorMail": "dead_horse@qq.com",
        "authorTime": 1572231169,
        "authorTz": "+0800",
        "committer": "dead-horse",
        "committerMail": "dead_horse@qq.com",
        "committerTime": 1572231169,
        "committerTz": "+0800",
        "filename": "lib/context.js",
        "hash": "ed84ee50da8ae3cd08056f944d061e00d06ed87f",
        "numberOfLines": 3,
        "resultLine": 195,
        "sourceLine": 195,
        "summary": "Release 2.11.0",
      }
    `);
  });
});
