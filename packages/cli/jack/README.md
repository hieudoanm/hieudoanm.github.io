# `jack` CLI

## Table of Contents

- [`jack` CLI](#jack-cli)
  - [Table of Contents](#table-of-contents)
  - [Frameworks](#frameworks)
  - [Commands](#commands)

## Frameworks

| No  | Language                 | Framework                                      |
| --- | ------------------------ | ---------------------------------------------- |
| 01  | [Go][go]                 | [cobra][cobra]                                 |
| 02  | [Rust][rust]             | [clap][clap]                                   |
| 03  | [Swift][swift]           | [swift-argument-parser][swift-argument-parser] |
| 04  | [Kotlin][kotlin]         | [clikt][clikt]                                 |
| 05  | [TypeScript][typescript] | [oclif][oclif]                                 |

## Commands

| Command                        | Module         | Sub1       | Sub2         | [cobra] | [clap] | [swift] | [oclif] |
| ------------------------------ | -------------- | ---------- | ------------ | ------- | ------ | ------- | ------- |
| `jack calc base`               | calc (19)      | base       |              | ✅      | ✅     | ✅      |         |
| `jack calc bmi`                |                | bmi        |              | ✅      | ✅     | ✅      |         |
| `jack calc compound`           |                | compound   |              | ✅      | ✅     | ✅      |         |
| `jack calc currency`           |                | currency   |              | ✅      | ✅     | ✅      |         |
| `jack calc date`               |                | date       |              | ✅      | ✅     | ✅      |         |
| `jack calc discount`           |                | discount   |              | ✅      | ✅     | ✅      |         |
| `jack calc eval`               |                | eval       |              | ✅      | ✅     | ✅      |         |
| `jack calc factorial`          |                | factorial  |              | ✅      | ✅     | ✅      |         |
| `jack calc gcd`                |                | gcd        |              | ✅      | ✅     | ✅      |         |
| `jack calc lcm`                |                | lcm        |              | ✅      | ✅     | ✅      |         |
| `jack calc loan`               |                | loan       |              | ✅      | ✅     | ✅      |         |
| `jack calc mortgage`           |                | mortgage   |              | ✅      | ✅     | ✅      |         |
| `jack calc percent`            |                | percent    |              | ✅      | ✅     | ✅      |         |
| `jack calc prime`              |                | prime      |              | ✅      | ✅     | ✅      |         |
| `jack calc random`             |                | random     |              | ✅      | ✅     | ✅      |         |
| `jack calc stats`              |                | stats      |              | ✅      | ✅     | ✅      |         |
| `jack calc tax`                |                | tax        |              | ✅      | ✅     | ✅      |         |
| `jack calc tip`                |                | tip        |              | ✅      | ✅     | ✅      |         |
| `jack calc unit`               |                | unit       |              | ✅      | ✅     | ✅      |         |
| `jack casino baccarat`         | casino (7)     | baccarat   |              | ✅      | ✅     | ✅      |         |
| `jack casino blackjack`        |                | blackjack  |              | ✅      | ✅     | ✅      |         |
| `jack casino coin`             |                | coin       |              | ✅      | ✅     | ✅      |         |
| `jack casino dice`             |                | dice       |              | ✅      | ✅     | ✅      |         |
| `jack casino poker`            |                | poker      |              | ✅      | ✅     | ✅      |         |
| `jack casino roulette`         |                | roulette   |              | ✅      | ✅     | ✅      |         |
| `jack casino slots`            |                | slots      |              | ✅      | ✅     | ✅      |         |
| `jack chess com-leaderboards`  | chess (10)     | com        | leaderboards | ✅      | ✅     | ✅      |         |
| `jack chess com-player`        |                | com        | player       | ✅      | ✅     | ✅      |         |
| `jack chess com-titled`        |                | com        | titled       | ✅      | ✅     | ✅      |         |
| `jack chess elo`               |                | elo        |              | ✅      | ✅     | ✅      |         |
| `jack chess fen-eval`          |                | fen        | eval         | ✅      | ✅     | ✅      |         |
| `jack chess fen-svg`           |                | fen        | svg          | ✅      | ✅     | ✅      |         |
| `jack chess pgn`               |                | pgn        |              | ✅      | ⬜     | ⬜      |         |
| `jack chess play`              |                | play       |              | ✅      | ⬜     | ⬜      |         |
| `jack chess random`            |                | random     |              | ✅      | ✅     | ⬜      |         |
| `jack chess setup`             |                | setup      |              | ✅      | ✅     | ✅      |         |
| `jack colors convert-hcl`      | colors (6)     | convert    | hcl          | ✅      | ✅     | ✅      |         |
| `jack colors convert-hex`      |                | convert    | hex          | ✅      | ✅     | ✅      |         |
| `jack colors convert-oklch`    |                | convert    | oklch        | ✅      | ✅     | ✅      |         |
| `jack colors convert-rgb`      |                | convert    | rgb          | ✅      | ✅     | ✅      |         |
| `jack colors palette`          |                | palette    |              | ✅      | ✅     | ✅      |         |
| `jack colors random`           |                | random     |              | ✅      | ✅     | ✅      |         |
| `jack convert base64`          | convert (14)   | base64     |              | ✅      | ✅     | ✅      |         |
| `jack convert braille`         |                | braille    |              | ✅      | ✅     | ✅      |         |
| `jack convert camelcase`       |                | camelcase  |              | ✅      | ✅     | ✅      |         |
| `jack convert capitalise`      |                | capitalise |              | ✅      | ✅     | ✅      |         |
| `jack convert count`           |                | count      |              | ✅      | ✅     | ✅      |         |
| `jack convert deburr`          |                | deburr     |              | ✅      | ✅     | ✅      |         |
| `jack convert kebabcase`       |                | kebabcase  |              | ✅      | ✅     | ✅      |         |
| `jack convert lowercase`       |                | lowercase  |              | ✅      | ✅     | ✅      |         |
| `jack convert morse`           |                | morse      |              | ✅      | ✅     | ✅      |         |
| `jack convert pascalcase`      |                | pascalcase |              | ✅      | ✅     | ✅      |         |
| `jack convert slug`            |                | slug       |              | ✅      | ✅     | ✅      |         |
| `jack convert snakecase`       |                | snakecase  |              | ✅      | ✅     | ✅      |         |
| `jack convert uppercase`       |                | uppercase  |              | ✅      | ✅     | ✅      |         |
| `jack convert url`             |                | url        |              | ✅      | ✅     | ✅      |         |
| `jack crypto decrypt`          | crypto (9)     | decrypt    |              | ✅      | ✅     | ✅      |         |
| `jack crypto encrypt`          |                | encrypt    |              | ✅      | ✅     | ✅      |         |
| `jack crypto hash`             |                | hash       |              | ✅      | ✅     | ✅      |         |
| `jack crypto jwt`              |                | jwt        |              | ✅      | ✅     | ✅      |         |
| `jack crypto keygen`           |                | keygen     |              | ✅      | ✅     | ✅      |         |
| `jack crypto passwd`           |                | passwd     |              | ✅      | ✅     | ✅      |         |
| `jack crypto qrcode`           |                | qrcode     |              | ✅      | ✅     | ✅      |         |
| `jack crypto totp`             |                | totp       |              | ✅      | ✅     | ✅      |         |
| `jack crypto uuid`             |                | uuid       |              | ✅      | ✅     | ✅      |         |
| `jack data csv`                | data (3)       | csv        |              | ✅      | ✅     | ✅      |         |
| `jack data json`               |                | json       |              | ✅      | ✅     | ✅      |         |
| `jack data yml`                |                | yml        |              | ✅      | ✅     | ✅      |         |
| `jack docsify cobra`           | docsify (4)    | cobra      |              | ✅      | ✅     | ✅      |         |
| `jack docsify obsidian`        |                | obsidian   |              | ✅      | ✅     | ✅      |         |
| `jack docsify scan`            |                | scan       |              | ✅      | ✅     | ✅      |         |
| `jack docsify tree`            |                | tree       |              | ✅      | ✅     | ✅      |         |
| `jack doi cite`                | doi (4)        | cite       |              | ✅      | ✅     | ✅      |         |
| `jack doi fetch`               |                | fetch      |              | ✅      | ✅     | ✅      |         |
| `jack doi ref`                 |                | ref        |              | ✅      | ✅     | ✅      |         |
| `jack doi validate`            |                | validate   |              | ✅      | ✅     | ✅      |         |
| `jack english define`          | english (1)    | define     |              | ✅      | ✅     | ✅      |         |
| `jack file checksum`           | file (13)      | checksum   |              | ✅      | ✅     | ✅      |         |
| `jack file chmod`              |                | chmod      |              | ✅      | ✅     | ✅      |         |
| `jack file count`              |                | count      |              | ✅      | ✅     | ✅      |         |
| `jack file duplicates`         |                | duplicates |              | ✅      | ✅     | ✅      |         |
| `jack file edit`               |                | edit       |              | ✅      | ✅     | ✅      |         |
| `jack file grep`               |                | grep       |              | ✅      | ✅     | ✅      |         |
| `jack file head`               |                | head       |              | ✅      | ✅     | ✅      |         |
| `jack file read`               |                | read       |              | ✅      | ✅     | ✅      |         |
| `jack file size`               |                | size       |              | ✅      | ✅     | ✅      |         |
| `jack file stats`              |                | stats      |              | ✅      | ✅     | ✅      |         |
| `jack file tail`               |                | tail       |              | ✅      | ✅     | ✅      |         |
| `jack file type`               |                | type       |              | ✅      | ✅     | ✅      |         |
| `jack file write`              |                | write      |              | ✅      | ✅     | ✅      |         |
| `jack gemini code`             | gemini (1)     | code       |              | ✅      | ✅     | ✅      |         |
| `jack gh coc`                  | gh (5)         | coc        |              | ✅      | ✅     | ✅      |         |
| `jack gh ignore`               |                | ignore     |              | ✅      | ✅     | ✅      |         |
| `jack gh languages`            |                | languages  |              | ✅      | ✅     | ✅      |         |
| `jack gh license`              |                | license    |              | ✅      | ✅     | ✅      |         |
| `jack gh og`                   |                | og         |              | ✅      | ✅     | ✅      |         |
| `jack image convert`           | image (3)      | convert    |              | ✅      | ✅     | ✅      |         |
| `jack image dominant`          |                | dominant   |              | ✅      | ✅     | ✅      |         |
| `jack image info`              |                | info       |              | ✅      | ✅     | ✅      |         |
| `jack net cert-check`          | net (11)       | cert       | check        | ⬜      | ✅     | ✅      |         |
| `jack net cert-info`           |                | cert       | info         | ⬜      | ✅     | ✅      |         |
| `jack net cert`                |                | cert       |              | ✅      | ✅     | ✅      |         |
| `jack net dns`                 |                | dns        |              | ✅      | ✅     | ✅      |         |
| `jack net http`                |                | http       |              | ✅      | ✅     | ✅      |         |
| `jack net ip`                  |                | ip         |              | ✅      | ✅     | ✅      |         |
| `jack net ping`                |                | ping       |              | ✅      | ✅     | ✅      |         |
| `jack net serve`               |                | serve      |              | ✅      | ✅     | ✅      |         |
| `jack net status`              |                | status     |              | ✅      | ✅     | ✅      |         |
| `jack net whois`               |                | whois      |              | ✅      | ✅     | ✅      |         |
| `jack net wifi`                |                | wifi       |              | ✅      | ✅     | ✅      |         |
| `jack openapi postman`         | openapi (2)    | postman    |              | ✅      | ✅     | ✅      |         |
| `jack openapi validate`        |                | validate   |              | ✅      | ✅     | ✅      |         |
| `jack openrouter code`         | openrouter (5) | code       |              | ✅      | ✅     | ✅      |         |
| `jack openrouter hook`         |                | hook       |              | ✅      | ✅     | ✅      |         |
| `jack openrouter models`       |                | models     |              | ✅      | ✅     | ✅      |         |
| `jack openrouter serve`        |                | serve      |              | ✅      | ✅     | ✅      |         |
| `jack openrouter status`       |                | status     |              | ✅      | ✅     | ✅      |         |
| `jack port check`              | port (3)       | check      |              | ✅      | ✅     | ✅      |         |
| `jack port find`               |                | find       |              | ✅      | ✅     | ✅      |         |
| `jack port scan`               |                | scan       |              | ✅      | ✅     | ✅      |         |
| `jack search code`             | search (4)     | code       |              | ✅      | ✅     | ✅      |         |
| `jack search files`            |                | files      |              | ✅      | ✅     | ✅      |         |
| `jack search text`             |                | text       |              | ✅      | ✅     | ✅      |         |
| `jack search web`              |                | web        |              | ✅      | ✅     | ✅      |         |
| `jack semver bump`             | semver (5)     | bump       |              | ⬜      | ✅     | ✅      |         |
| `jack semver compare`          |                | compare    |              | ✅      | ✅     | ✅      |         |
| `jack semver range`            |                | range      |              | ⬜      | ✅     | ✅      |         |
| `jack semver sort`             |                | sort       |              | ✅      | ✅     | ✅      |         |
| `jack semver validate`         |                | validate   |              | ✅      | ✅     | ✅      |         |
| `jack system battery`          | system (7)     | battery    |              | ✅      | ✅     | ✅      |         |
| `jack system clipboard`        |                | clipboard  |              | ✅      | ✅     | ✅      |         |
| `jack system disk`             |                | disk       |              | ✅      | ✅     | ✅      |         |
| `jack system env`              |                | env        |              | ✅      | ✅     | ✅      |         |
| `jack system info`             |                | info       |              | ✅      | ✅     | ✅      |         |
| `jack system monitor`          |                | monitor    |              | ✅      | ✅     | ✅      |         |
| `jack system path`             |                | path       |              | ✅      | ✅     | ✅      |         |
| `jack telegram message-send`   | telegram (6)   | message    | send         | ✅      | ✅     | ✅      |         |
| `jack telegram message`        |                | message    |              | ✅      | ✅     | ✅      |         |
| `jack telegram webhook-delete` |                | webhook    | delete       | ✅      | ✅     | ✅      |         |
| `jack telegram webhook-info`   |                | webhook    | info         | ✅      | ✅     | ✅      |         |
| `jack telegram webhook-set`    |                | webhook    | set          | ✅      | ✅     | ✅      |         |
| `jack telegram webhook`        |                | webhook    |              | ✅      | ✅     | ✅      |         |
| `jack time age`                | time (10)      | age        |              | ✅      | ✅     | ✅      |         |
| `jack time clock-now`          |                | clock      | now          | ✅      | ✅     | ✅      |         |
| `jack time clock`              |                | clock      |              | ✅      | ✅     | ✅      |         |
| `jack time cron`               |                | cron       |              | ✅      | ✅     | ✅      |         |
| `jack time epoch`              |                | epoch      |              | ✅      | ✅     | ✅      |         |
| `jack time pomodoro`           |                | pomodoro   |              | ✅      | ✅     | ✅      |         |
| `jack time stopwatch`          |                | stopwatch  |              | ✅      | ✅     | ✅      |         |
| `jack time timer`              |                | timer      |              | ✅      | ✅     | ✅      |         |
| `jack time until`              |                | until      |              | ✅      | ✅     | ✅      |         |
| `jack time world`              |                | world      |              | ✅      | ✅     | ✅      |         |
| `jack version`                 | version        | —          |              | ✅      | ✅     | ✅      |         |
| `jack web instagram`           | web (7)        | instagram  |              | ✅      | ✅     | ✅      |         |
| `jack web shopify`             |                | shopify    |              | ✅      | ✅     | ✅      |         |
| `jack web snapshot`            |                | snapshot   |              | ✅      | ✅     | ✅      |         |
| `jack web weather`             |                | weather    |              | ✅      | ✅     | ✅      |         |
| `jack web youtube-thumbnails`  |                | youtube    | thumbnails   | ✅      | ✅     | ✅      |         |
| `jack web youtube-transcript`  |                | youtube    | transcript   | ✅      | ✅     | ✅      |         |
| `jack web youtube`             |                | youtube    |              | ✅      | ✅     | ✅      |         |

<!-- Languages -->

[go]: https://go.dev
[rust]: https://rust-lang.org
[swift]: https://swift.org
[typescript]: https://typescriptlang.org
[kotlin]: https://kotlinlang.org

<!-- Frameworks -->

[clap]: https://docs.rs/clap
[clikt]: https://ajalt.github.io/clikt/
[cobra]: https://cobra.dev
[oclif]: https://oclif.io/
[swift-argument-parser]: https://github.com/apple/swift-argument-parser
