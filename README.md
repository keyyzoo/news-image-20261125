# news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/keyyzoo/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/keyyzoo/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

Sum up 25 November's world news in one image: a program writes the day's news as one front-page image — Russia's hidden war dead near 500,000, the Houthi strike on a Riyadh tower, Huawei's guilty verdict, new Trump tariffs on 16 partners, and Pakistan's first astronaut in orbit — judged pairwise by an AI picture editor. The 50 best entries share $100.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## How it works

`main.ts` (Node 22, standard library only, no network) reads `./image.png` from the repo root, checks its first 8 bytes against the PNG magic number, then copies it byte-for-byte to `entry.png` inside the output directory — `$MAKEFUN_OUTPUT_DIR` when set, otherwise `/output`. The output is deterministic: the same input always produces the same bytes.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards</sub>
