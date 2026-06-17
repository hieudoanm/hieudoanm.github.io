# `hieudoanm`

Hieu Doan's personal CLI toolbox

A collection of CLI utilities covering system monitoring, cloud service status, currency conversion, text processing, UUID generation, and more.

---

## Table of Contents

- [`hieudoanm`](#hieudoanm)
  - [Table of Contents](#table-of-contents)
  - [`hieudoanm calc`](#hieudoanm-calc)
    - [Flags](#flags)
    - [`hieudoanm calc tax`](#hieudoanm-calc-tax)
    - [`hieudoanm calc compound`](#hieudoanm-calc-compound)
      - [Flags](#flags-1)
    - [`hieudoanm calc currency`](#hieudoanm-calc-currency)
      - [Flags](#flags-2)
    - [`hieudoanm calc loan`](#hieudoanm-calc-loan)
      - [Flags](#flags-3)
    - [`hieudoanm calc discount`](#hieudoanm-calc-discount)
      - [Flags](#flags-4)
    - [`hieudoanm calc tip`](#hieudoanm-calc-tip)
      - [Flags](#flags-5)
    - [`hieudoanm calc bmi`](#hieudoanm-calc-bmi)
      - [Flags](#flags-6)
    - [`hieudoanm calc base`](#hieudoanm-calc-base)
      - [Flags](#flags-7)
    - [`hieudoanm calc unit`](#hieudoanm-calc-unit)
      - [Flags](#flags-8)
    - [`hieudoanm calc percent`](#hieudoanm-calc-percent)
      - [Flags](#flags-9)
    - [`hieudoanm calc mortgage`](#hieudoanm-calc-mortgage)
      - [Flags](#flags-10)
    - [`hieudoanm calc date`](#hieudoanm-calc-date)
      - [Flags](#flags-11)
    - [`hieudoanm calc eval`](#hieudoanm-calc-eval)
      - [Flags](#flags-12)
    - [`hieudoanm calc stats`](#hieudoanm-calc-stats)
    - [`hieudoanm calc factorial`](#hieudoanm-calc-factorial)
      - [Flags](#flags-13)
    - [`hieudoanm calc random`](#hieudoanm-calc-random)
      - [Flags](#flags-14)
    - [`hieudoanm calc prime`](#hieudoanm-calc-prime)
      - [Flags](#flags-15)
    - [`hieudoanm calc gcd`](#hieudoanm-calc-gcd)
      - [Flags](#flags-16)
    - [`hieudoanm calc lcm`](#hieudoanm-calc-lcm)
      - [Flags](#flags-17)
  - [`hieudoanm casino`](#hieudoanm-casino)
    - [Flags](#flags-18)
    - [`hieudoanm casino blackjack`](#hieudoanm-casino-blackjack)
      - [`hieudoanm casino blackjack count`](#hieudoanm-casino-blackjack-count)
      - [`hieudoanm casino blackjack play`](#hieudoanm-casino-blackjack-play)
    - [`hieudoanm casino poker`](#hieudoanm-casino-poker)
      - [`hieudoanm casino poker odds`](#hieudoanm-casino-poker-odds)
        - [Flags](#flags-19)
      - [`hieudoanm casino poker play`](#hieudoanm-casino-poker-play)
    - [`hieudoanm casino baccarat`](#hieudoanm-casino-baccarat)
      - [`hieudoanm casino baccarat play`](#hieudoanm-casino-baccarat-play)
      - [`hieudoanm casino baccarat strategy`](#hieudoanm-casino-baccarat-strategy)
        - [Flags](#flags-20)
    - [`hieudoanm casino slots`](#hieudoanm-casino-slots)
      - [`hieudoanm casino slots play`](#hieudoanm-casino-slots-play)
    - [`hieudoanm casino coin`](#hieudoanm-casino-coin)
      - [Flags](#flags-21)
    - [`hieudoanm casino dice`](#hieudoanm-casino-dice)
      - [Flags](#flags-22)
    - [`hieudoanm casino roulette`](#hieudoanm-casino-roulette)
      - [Flags](#flags-23)
  - [`hieudoanm chess`](#hieudoanm-chess)
    - [Flags](#flags-24)
    - [`hieudoanm chess com`](#hieudoanm-chess-com)
      - [`hieudoanm chess com player`](#hieudoanm-chess-com-player)
        - [Flags](#flags-25)
      - [`hieudoanm chess com leaderboards`](#hieudoanm-chess-com-leaderboards)
        - [Flags](#flags-26)
      - [`hieudoanm chess com titled`](#hieudoanm-chess-com-titled)
    - [`hieudoanm chess elo`](#hieudoanm-chess-elo)
    - [`hieudoanm chess fen`](#hieudoanm-chess-fen)
      - [Flags](#flags-27)
      - [`hieudoanm chess fen eval`](#hieudoanm-chess-fen-eval)
        - [Flags](#flags-28)
      - [`hieudoanm chess fen svg`](#hieudoanm-chess-fen-svg)
        - [Flags](#flags-29)
    - [`hieudoanm chess pgn`](#hieudoanm-chess-pgn)
      - [`hieudoanm chess pgn fen`](#hieudoanm-chess-pgn-fen)
        - [Flags](#flags-30)
      - [`hieudoanm chess pgn uci`](#hieudoanm-chess-pgn-uci)
        - [Flags](#flags-31)
    - [`hieudoanm chess play`](#hieudoanm-chess-play)
      - [Flags](#flags-32)
    - [`hieudoanm chess random`](#hieudoanm-chess-random)
    - [`hieudoanm chess setup`](#hieudoanm-chess-setup)
  - [`hieudoanm colors`](#hieudoanm-colors)
    - [Flags](#flags-33)
    - [`hieudoanm colors hcl`](#hieudoanm-colors-hcl)
    - [`hieudoanm colors hex`](#hieudoanm-colors-hex)
    - [`hieudoanm colors oklch`](#hieudoanm-colors-oklch)
    - [`hieudoanm colors rgb`](#hieudoanm-colors-rgb)
    - [`hieudoanm colors palette`](#hieudoanm-colors-palette)
    - [`hieudoanm colors random`](#hieudoanm-colors-random)
      - [Flags](#flags-34)
  - [`hieudoanm convert`](#hieudoanm-convert)
    - [Flags](#flags-35)
    - [`hieudoanm convert braille`](#hieudoanm-convert-braille)
    - [`hieudoanm convert morse`](#hieudoanm-convert-morse)
    - [`hieudoanm convert base64`](#hieudoanm-convert-base64)
      - [Flags](#flags-36)
    - [`hieudoanm convert url`](#hieudoanm-convert-url)
      - [Flags](#flags-37)
    - [`hieudoanm convert capitalise`](#hieudoanm-convert-capitalise)
    - [`hieudoanm convert deburr`](#hieudoanm-convert-deburr)
    - [`hieudoanm convert kebabcase`](#hieudoanm-convert-kebabcase)
    - [`hieudoanm convert camelcase`](#hieudoanm-convert-camelcase)
    - [`hieudoanm convert pascalcase`](#hieudoanm-convert-pascalcase)
    - [`hieudoanm convert slug`](#hieudoanm-convert-slug)
    - [`hieudoanm convert lowercase`](#hieudoanm-convert-lowercase)
    - [`hieudoanm convert snakecase`](#hieudoanm-convert-snakecase)
    - [`hieudoanm convert uppercase`](#hieudoanm-convert-uppercase)
    - [`hieudoanm convert count`](#hieudoanm-convert-count)
      - [Flags](#flags-38)
  - [`hieudoanm crypto`](#hieudoanm-crypto)
    - [Flags](#flags-39)
    - [`hieudoanm crypto hash`](#hieudoanm-crypto-hash)
      - [Flags](#flags-40)
    - [`hieudoanm crypto jwt`](#hieudoanm-crypto-jwt)
      - [`hieudoanm crypto jwt decode`](#hieudoanm-crypto-jwt-decode)
        - [Flags](#flags-41)
      - [`hieudoanm crypto jwt encode`](#hieudoanm-crypto-jwt-encode)
        - [Flags](#flags-42)
    - [`hieudoanm crypto keygen`](#hieudoanm-crypto-keygen)
      - [Flags](#flags-43)
    - [`hieudoanm crypto passwd`](#hieudoanm-crypto-passwd)
      - [Flags](#flags-44)
    - [`hieudoanm crypto uuid`](#hieudoanm-crypto-uuid)
      - [Flags](#flags-45)
    - [`hieudoanm crypto qrcode`](#hieudoanm-crypto-qrcode)
      - [Flags](#flags-46)
    - [`hieudoanm crypto encrypt`](#hieudoanm-crypto-encrypt)
      - [Flags](#flags-47)
    - [`hieudoanm crypto decrypt`](#hieudoanm-crypto-decrypt)
      - [Flags](#flags-48)
    - [`hieudoanm crypto totp`](#hieudoanm-crypto-totp)
      - [Flags](#flags-49)
  - [`hieudoanm data`](#hieudoanm-data)
    - [Flags](#flags-50)
    - [`hieudoanm data csv`](#hieudoanm-data-csv)
      - [Flags](#flags-51)
    - [`hieudoanm data json`](#hieudoanm-data-json)
      - [Flags](#flags-52)
    - [`hieudoanm data yml`](#hieudoanm-data-yml)
      - [Flags](#flags-53)
  - [`hieudoanm docsify`](#hieudoanm-docsify)
    - [Flags](#flags-54)
    - [`hieudoanm docsify cobra`](#hieudoanm-docsify-cobra)
      - [Flags](#flags-55)
    - [`hieudoanm docsify obsidian`](#hieudoanm-docsify-obsidian)
      - [Flags](#flags-56)
    - [`hieudoanm docsify scan`](#hieudoanm-docsify-scan)
      - [Flags](#flags-57)
    - [`hieudoanm docsify tree`](#hieudoanm-docsify-tree)
      - [Flags](#flags-58)
  - [`hieudoanm doi`](#hieudoanm-doi)
    - [Flags](#flags-59)
    - [`hieudoanm doi cite`](#hieudoanm-doi-cite)
    - [`hieudoanm doi ref`](#hieudoanm-doi-ref)
    - [`hieudoanm doi fetch`](#hieudoanm-doi-fetch)
    - [`hieudoanm doi validate`](#hieudoanm-doi-validate)
  - [`hieudoanm english`](#hieudoanm-english)
    - [Flags](#flags-60)
    - [`hieudoanm english define`](#hieudoanm-english-define)
      - [Flags](#flags-61)
  - [`hieudoanm file`](#hieudoanm-file)
    - [Flags](#flags-62)
    - [`hieudoanm file checksum`](#hieudoanm-file-checksum)
      - [Flags](#flags-63)
    - [`hieudoanm file chmod`](#hieudoanm-file-chmod)
      - [Flags](#flags-64)
    - [`hieudoanm file count`](#hieudoanm-file-count)
      - [Flags](#flags-65)
    - [`hieudoanm file duplicates`](#hieudoanm-file-duplicates)
      - [Flags](#flags-66)
    - [`hieudoanm file edit`](#hieudoanm-file-edit)
      - [Flags](#flags-67)
    - [`hieudoanm file grep`](#hieudoanm-file-grep)
      - [Flags](#flags-68)
    - [`hieudoanm file head`](#hieudoanm-file-head)
      - [Flags](#flags-69)
    - [`hieudoanm file read`](#hieudoanm-file-read)
      - [Flags](#flags-70)
    - [`hieudoanm file size`](#hieudoanm-file-size)
      - [Flags](#flags-71)
    - [`hieudoanm file stats`](#hieudoanm-file-stats)
      - [Flags](#flags-72)
    - [`hieudoanm file tail`](#hieudoanm-file-tail)
      - [Flags](#flags-73)
    - [`hieudoanm file type`](#hieudoanm-file-type)
      - [Flags](#flags-74)
    - [`hieudoanm file write`](#hieudoanm-file-write)
      - [Flags](#flags-75)
  - [`hieudoanm gemini`](#hieudoanm-gemini)
    - [Flags](#flags-76)
    - [`hieudoanm gemini code`](#hieudoanm-gemini-code)
  - [`hieudoanm gh`](#hieudoanm-gh)
    - [Flags](#flags-77)
    - [`hieudoanm gh coc`](#hieudoanm-gh-coc)
      - [Flags](#flags-78)
    - [`hieudoanm gh ignore`](#hieudoanm-gh-ignore)
      - [Flags](#flags-79)
    - [`hieudoanm gh languages`](#hieudoanm-gh-languages)
      - [Flags](#flags-80)
    - [`hieudoanm gh license`](#hieudoanm-gh-license)
      - [Flags](#flags-81)
    - [`hieudoanm gh og`](#hieudoanm-gh-og)
      - [Flags](#flags-82)
  - [`hieudoanm image`](#hieudoanm-image)
    - [Flags](#flags-83)
    - [`hieudoanm image info`](#hieudoanm-image-info)
      - [Flags](#flags-84)
    - [`hieudoanm image convert`](#hieudoanm-image-convert)
      - [Flags](#flags-85)
    - [`hieudoanm image dominant`](#hieudoanm-image-dominant)
      - [Flags](#flags-86)
  - [`hieudoanm mcp`](#hieudoanm-mcp)
    - [`hieudoanm mcp serve`](#hieudoanm-mcp-serve)
  - [`hieudoanm net`](#hieudoanm-net)
    - [Flags](#flags-87)
    - [`hieudoanm net cert`](#hieudoanm-net-cert)
      - [Flags](#flags-88)
      - [`hieudoanm net cert info`](#hieudoanm-net-cert-info)
        - [Flags](#flags-89)
      - [`hieudoanm net cert check`](#hieudoanm-net-cert-check)
        - [Flags](#flags-90)
    - [`hieudoanm net dns`](#hieudoanm-net-dns)
      - [Flags](#flags-91)
    - [`hieudoanm net ip`](#hieudoanm-net-ip)
      - [Flags](#flags-92)
    - [`hieudoanm net ping`](#hieudoanm-net-ping)
      - [Flags](#flags-93)
    - [`hieudoanm net serve`](#hieudoanm-net-serve)
      - [Flags](#flags-94)
    - [`hieudoanm net status`](#hieudoanm-net-status)
      - [Flags](#flags-95)
    - [`hieudoanm net wifi`](#hieudoanm-net-wifi)
      - [Flags](#flags-96)
    - [`hieudoanm net http`](#hieudoanm-net-http)
      - [Flags](#flags-97)
    - [`hieudoanm net whois`](#hieudoanm-net-whois)
      - [Flags](#flags-98)
  - [`hieudoanm openapi`](#hieudoanm-openapi)
    - [Flags](#flags-99)
    - [`hieudoanm openapi openapi2postman`](#hieudoanm-openapi-openapi2postman)
      - [Flags](#flags-100)
    - [`hieudoanm openapi validate`](#hieudoanm-openapi-validate)
      - [Flags](#flags-101)
  - [`hieudoanm openrouter`](#hieudoanm-openrouter)
    - [Flags](#flags-102)
    - [`hieudoanm openrouter serve`](#hieudoanm-openrouter-serve)
      - [Flags](#flags-103)
    - [`hieudoanm openrouter status`](#hieudoanm-openrouter-status)
      - [Flags](#flags-104)
    - [`hieudoanm openrouter models`](#hieudoanm-openrouter-models)
      - [Flags](#flags-105)
    - [`hieudoanm openrouter hook`](#hieudoanm-openrouter-hook)
    - [`hieudoanm openrouter code`](#hieudoanm-openrouter-code)
      - [Flags](#flags-106)
  - [`hieudoanm port`](#hieudoanm-port)
    - [Flags](#flags-107)
    - [`hieudoanm port check`](#hieudoanm-port-check)
      - [Flags](#flags-108)
    - [`hieudoanm port find`](#hieudoanm-port-find)
      - [Flags](#flags-109)
    - [`hieudoanm port scan`](#hieudoanm-port-scan)
      - [Flags](#flags-110)
  - [`hieudoanm search`](#hieudoanm-search)
    - [Flags](#flags-111)
    - [`hieudoanm search files`](#hieudoanm-search-files)
      - [Flags](#flags-112)
    - [`hieudoanm search text`](#hieudoanm-search-text)
      - [Flags](#flags-113)
    - [`hieudoanm search code`](#hieudoanm-search-code)
      - [Flags](#flags-114)
    - [`hieudoanm search web`](#hieudoanm-search-web)
      - [Flags](#flags-115)
  - [`hieudoanm semver`](#hieudoanm-semver)
    - [Flags](#flags-116)
    - [`hieudoanm semver <command> [flags] validate`](#hieudoanm-semver-command-flags-validate)
      - [Flags](#flags-117)
    - [`hieudoanm semver <command> [flags] compare`](#hieudoanm-semver-command-flags-compare)
      - [Flags](#flags-118)
    - [`hieudoanm semver <command> [flags] sort`](#hieudoanm-semver-command-flags-sort)
      - [Flags](#flags-119)
  - [`hieudoanm system`](#hieudoanm-system)
    - [Flags](#flags-120)
    - [`hieudoanm system monitor`](#hieudoanm-system-monitor)
      - [Flags](#flags-121)
    - [`hieudoanm system clipboard`](#hieudoanm-system-clipboard)
      - [Flags](#flags-122)
    - [`hieudoanm system info`](#hieudoanm-system-info)
      - [Flags](#flags-123)
    - [`hieudoanm system env`](#hieudoanm-system-env)
      - [Flags](#flags-124)
    - [`hieudoanm system path`](#hieudoanm-system-path)
      - [Flags](#flags-125)
    - [`hieudoanm system disk`](#hieudoanm-system-disk)
      - [Flags](#flags-126)
    - [`hieudoanm system battery`](#hieudoanm-system-battery)
      - [Flags](#flags-127)
  - [`hieudoanm telegram`](#hieudoanm-telegram)
    - [Flags](#flags-128)
    - [`hieudoanm telegram message`](#hieudoanm-telegram-message)
      - [`hieudoanm telegram message send`](#hieudoanm-telegram-message-send)
    - [`hieudoanm telegram webhook`](#hieudoanm-telegram-webhook)
      - [`hieudoanm telegram webhook delete`](#hieudoanm-telegram-webhook-delete)
      - [`hieudoanm telegram webhook info`](#hieudoanm-telegram-webhook-info)
      - [`hieudoanm telegram webhook set`](#hieudoanm-telegram-webhook-set)
  - [`hieudoanm version`](#hieudoanm-version)
    - [Flags](#flags-129)
  - [`hieudoanm web`](#hieudoanm-web)
    - [Flags](#flags-130)
    - [`hieudoanm web instagram`](#hieudoanm-web-instagram)
      - [`hieudoanm web instagram download`](#hieudoanm-web-instagram-download)
        - [Flags](#flags-131)
    - [`hieudoanm web shopify`](#hieudoanm-web-shopify)
      - [`hieudoanm web shopify detect`](#hieudoanm-web-shopify-detect)
        - [Flags](#flags-132)
    - [`hieudoanm web simplify`](#hieudoanm-web-simplify)
      - [`hieudoanm web simplify csv`](#hieudoanm-web-simplify-csv)
        - [Flags](#flags-133)
      - [`hieudoanm web simplify md`](#hieudoanm-web-simplify-md)
        - [Flags](#flags-134)
    - [`hieudoanm web snapshot`](#hieudoanm-web-snapshot)
      - [Flags](#flags-135)
    - [`hieudoanm web weather`](#hieudoanm-web-weather)
      - [Flags](#flags-136)
    - [`hieudoanm web youtube`](#hieudoanm-web-youtube)
      - [`hieudoanm web youtube thumbnails`](#hieudoanm-web-youtube-thumbnails)
        - [Flags](#flags-137)
      - [`hieudoanm web youtube fetch`](#hieudoanm-web-youtube-fetch)
        - [Flags](#flags-138)

## `hieudoanm calc`

Financial and utility calculators

A collection of calculator tools including tax calculation and compound interest.

```bash
hieudoanm calc
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

---

### `hieudoanm calc tax`

Calculate Vietnam personal income tax

Calculate Vietnam personal income tax (PIT) with a terminal UI. Supports gross-to-net and net-to-gross modes, dependent deductions, and insurance.

```bash
hieudoanm calc tax
```

Example:

```bash
  calc tax
```

---

### `hieudoanm calc compound`

Compound interest calculator

Calculate compound interest with optional regular contributions.

Uses the formula: A = P(1+r/n)^(nt) + PMT \* ((1+r/n)^(nt) - 1) / (r/n)

```bash
hieudoanm calc compound
```

#### Flags

| Flag           | Shorthand | Default  | Description                                              |
| -------------- | --------- | -------- | -------------------------------------------------------- |
| `--principal`  | `-p`      | `0`      | Initial principal amount                                 |
| `--rate`       | `-r`      | `0`      | Annual interest rate (percentage)                        |
| `--years`      | `-y`      | `0`      | Number of years                                          |
| `--contribute` | `-c`      | `0`      | Regular contribution per compounding period              |
| `--compound`   | `-n`      | `yearly` | Compounding frequency: yearly, quarterly, monthly, daily |

Example:

```bash
  calc compound --principal 10000 --rate 5 --years 10 --compound monthly
  calc compound -p 50000 -r 7.5 -y 20 -n yearly -c 500
```

---

### `hieudoanm calc currency`

Convert between currencies using Frankfurter API

Convert amounts between world currencies using the European Central Bank's Frankfurter exchange rate API.

```bash
hieudoanm calc currency
```

#### Flags

| Flag       | Shorthand | Default | Description                   |
| ---------- | --------- | ------- | ----------------------------- |
| `--from`   | ``        | `EUR`   | Source currency (default EUR) |
| `--to`     | ``        | `USD`   | Target currency (default USD) |
| `--amount` | ``        | `1`     | Amount to convert (default 1) |

Example:

```bash
  calc currency --from USD --to EUR --amount 100
```

---

### `hieudoanm calc loan`

Loan amortization calculator

Calculate loan amortization schedule with monthly payments.

Uses the standard amortization formula to compute monthly payments
and generates a detailed schedule showing payment, interest, and balance over time.

```bash
hieudoanm calc loan
```

#### Flags

| Flag          | Shorthand | Default | Description                       |
| ------------- | --------- | ------- | --------------------------------- |
| `--principal` | `-p`      | `0`     | Loan principal amount             |
| `--rate`      | `-r`      | `0`     | Annual interest rate (percentage) |
| `--years`     | `-y`      | `0`     | Loan term in years                |

Example:

```bash
  calc loan --principal 30000 --rate 5 --years 5
  calc loan -p 30000 -r 5 -y 5
```

---

### `hieudoanm calc discount`

Calculate discount and sale price

Calculate the sale price after applying a percentage discount.

Given the original price and discount percentage, shows the amount saved and final price.

```bash
hieudoanm calc discount
```

#### Flags

| Flag         | Shorthand | Default | Description         |
| ------------ | --------- | ------- | ------------------- |
| `--original` | `-o`      | `0`     | Original price      |
| `--percent`  | `-p`      | `0`     | Discount percentage |

Example:

```bash
  calc discount --original 100 --percent 20
  calc discount -o 100 -p 20
```

---

### `hieudoanm calc tip`

Calculate tip and split bill

Calculate the tip amount, total bill, and per-person share when splitting.

Enter the bill amount, tip percentage, and number of people to split.

```bash
hieudoanm calc tip
```

#### Flags

| Flag        | Shorthand | Default | Description                |
| ----------- | --------- | ------- | -------------------------- |
| `--bill`    | `-b`      | `0`     | Bill amount                |
| `--percent` | `-p`      | `15`    | Tip percentage             |
| `--split`   | `-s`      | `1`     | Number of people splitting |

Example:

```bash
  calc tip --bill 50 --percent 15 --split 4
  calc tip -b 50 -p 15 -s 4
```

---

### `hieudoanm calc bmi`

Calculate Body Mass Index

Calculate Body Mass Index (BMI) from weight and height.

BMI is calculated as weight (kg) divided by height (m) squared.
The result includes a weight category: Underweight, Normal, Overweight, or Obese.

```bash
hieudoanm calc bmi
```

#### Flags

| Flag       | Shorthand | Default | Description  |
| ---------- | --------- | ------- | ------------ |
| `--weight` | `-w`      | `0`     | Weight in kg |
| `--height` | `-h`      | `0`     | Height in cm |

Example:

```bash
  calc bmi --weight 70 --height 175
```

---

### `hieudoanm calc base`

Convert between number bases (bin/oct/dec/hex)

Convert numbers between different bases (binary, octal, decimal, hexadecimal).

Supports standard prefixes and aliases for each base.
Results can be output in JSON format with --json.

```bash
hieudoanm calc base
```

#### Flags

| Flag      | Shorthand | Default | Description                   |
| --------- | --------- | ------- | ----------------------------- |
| `--value` | `-v`      | ``      | Value to convert              |
| `--from`  | `-f`      | `dec`   | Source base (bin/oct/dec/hex) |
| `--to`    | `-t`      | `hex`   | Target base (bin/oct/dec/hex) |

Example:

```bash
  calc base --value FF --from hex --to dec
  calc base --value 255 --from dec --to hex
  calc base --value 1010 --from bin --to dec
```

---

### `hieudoanm calc unit`

Convert between units (length, weight, temp, speed)

Convert values between different units of measurement.

```bash
hieudoanm calc unit
```

#### Flags

| Flag      | Shorthand | Default | Description      |
| --------- | --------- | ------- | ---------------- |
| `--value` | `-v`      | `0`     | Value to convert |
| `--from`  | `-f`      | ``      | Source unit      |
| `--to`    | `-t`      | ``      | Target unit      |

Example:

```bash
  calc unit --value 12 --from inch --to cm
  calc unit -v 32 -f f -t c
  calc unit -v 100 -f kg -t lb
```

---

### `hieudoanm calc percent`

Calculate percentages

Calculate what percent one number is of another, or add/subtract a percentage.

```bash
hieudoanm calc percent
```

#### Flags

| Flag      | Shorthand | Default | Description                       |
| --------- | --------- | ------- | --------------------------------- |
| `--value` | `-v`      | `0`     | Base value                        |
| `--of`    | `-o`      | `0`     | Calculate what % value is of this |
| `--plus`  | `-p`      | `0`     | Add percentage                    |
| `--minus` | `-m`      | `0`     | Subtract percentage               |

Example:

```bash
  calc percent --value 20 --of 50
  calc percent --value 50 --plus 20
  calc percent --value 50 --minus 20
```

---

### `hieudoanm calc mortgage`

Mortgage payment calculator

Calculate monthly mortgage payments including taxes, insurance, and PMI.

```bash
hieudoanm calc mortgage
```

#### Flags

| Flag          | Shorthand | Default | Description                       |
| ------------- | --------- | ------- | --------------------------------- |
| `--principal` | `-p`      | `0`     | Loan principal                    |
| `--rate`      | `-r`      | `0`     | Annual interest rate (percentage) |
| `--years`     | `-y`      | `30`    | Loan term in years                |
| `--taxes`     | ``        | `0`     | Annual property taxes             |
| `--insurance` | ``        | `0`     | Annual insurance                  |
| `--pmi`       | ``        | `0`     | Annual PMI                        |

Example:

```bash
  calc mortgage --principal 300000 --rate 6.5 --years 30
  calc mortgage -p 300000 -r 6.5 -y 30 --taxes 3000 --insurance 1200
```

---

### `hieudoanm calc date`

Date arithmetic and difference

Add/subtract days, months, or years from a date, or calculate difference between two dates.

```bash
hieudoanm calc date
```

#### Flags

| Flag           | Shorthand | Default | Description                                   |
| -------------- | --------- | ------- | --------------------------------------------- |
| `--add`        | ``        | `0`     | Add N days                                    |
| `--add-months` | ``        | `0`     | Add N months                                  |
| `--add-years`  | ``        | `0`     | Add N years                                   |
| `--diff`       | ``        | ``      | Calculate days between two dates (YYYY-MM-DD) |
| `--format`     | ``        | ``      | Output format (uses Go time layout)           |

Example:

```bash
  calc date --add 90
  calc date --add 30 "2026-01-01"
  calc date --diff "2026-06-01" "2026-01-01
```

---

### `hieudoanm calc eval`

Evaluate a mathematical expression

Evaluate arbitrary math expressions with operators and functions.

Operators: +, -, \*, /, ^ (power)
Functions: sqrt, sin, cos, tan, abs, floor, ceil, round, log, log10, exp
Constants: pi, e

Use parentheses for grouping.

```bash
hieudoanm calc eval [--expression <expression>]
```

#### Flags

| Flag           | Shorthand | Default | Description                         |
| -------------- | --------- | ------- | ----------------------------------- |
| `--expression` | `-e`      | ``      | Mathematical expression to evaluate |

Example:

```bash
  calc eval --expression "2 + 2"
  calc eval --expression "sqrt(144) * 2"
  calc eval --expression "pi * 5 ^ 2"
  calc eval --expression "sin(45) ^ 2 + cos(45) ^ 2
```

---

### `hieudoanm calc stats`

Statistical summary of numbers

Compute count, min, max, sum, mean, median, and standard deviation.

```bash
hieudoanm calc stats [--values <n1,n2,...>]
```

Example:

```bash
  calc stats --values 1,2,3,4,5
  calc stats --values 100,200,300
  calc stats --json --values 1,2,3,4,5,6,7,8,9,10
```

---

### `hieudoanm calc factorial`

Compute factorial of a number (n!)

Calculate the factorial of a non-negative integer using arbitrary-precision arithmetic.

```bash
hieudoanm calc factorial [--number <n>]
```

#### Flags

| Flag       | Shorthand | Default | Description          |
| ---------- | --------- | ------- | -------------------- |
| `--number` | `-n`      | `0`     | Non-negative integer |

Example:

```bash
  calc factorial --number 10
  calc factorial --number 100
```

---

### `hieudoanm calc random`

Generate random numbers

Generate random integers or floats within a range.

```bash
hieudoanm calc random
```

#### Flags

| Flag      | Shorthand | Default | Description      |
| --------- | --------- | ------- | ---------------- |
| `--min`   | `-m`      | `1`     | Minimum value    |
| `--max`   | `-x`      | `100`   | Maximum value    |
| `--count` | `-n`      | `1`     | Number of values |

Example:

```bash
  calc random --min 1 --max 100
  calc random --min 1 --max 100 --count 5
  calc random --min 0 --max 1 --float --count 3
```

---

### `hieudoanm calc prime`

Check if a number is prime, or generate primes up to N

Test primality of a number, or list/count primes up to a limit with --list.

```bash
hieudoanm calc prime [--number <n>]
```

#### Flags

| Flag       | Shorthand | Default | Description              |
| ---------- | --------- | ------- | ------------------------ |
| `--number` | `-n`      | `0`     | Number to check or limit |
| `--list`   | `-l`      | `false` | List all primes up to N  |

Example:

```bash
  calc prime --number 17
  calc prime --number 100 --list
  calc prime --number 1000000 --count
```

---

### `hieudoanm calc gcd`

Greatest common divisor of two numbers

Compute the greatest common divisor (GCD) of two integers using the Euclidean algorithm.

```bash
hieudoanm calc gcd [--a <a> --b <b>]
```

#### Flags

| Flag  | Shorthand | Default | Description   |
| ----- | --------- | ------- | ------------- |
| `--a` | `-a`      | `0`     | First number  |
| `--b` | `-b`      | `0`     | Second number |

Example:

```bash
  calc gcd --a 12 --b 18
  calc gcd --a 100 --b 75
```

---

### `hieudoanm calc lcm`

Least common multiple of two numbers

Compute the least common multiple (LCM) of two integers using the GCD method.

LCM(a, b) = |a \* b| / GCD(a, b)

```bash
hieudoanm calc lcm [--a <a> --b <b>]
```

#### Flags

| Flag  | Shorthand | Default | Description   |
| ----- | --------- | ------- | ------------- |
| `--a` | `-a`      | `0`     | First number  |
| `--b` | `-b`      | `0`     | Second number |

Example:

```bash
  calc lcm --a 12 --b 18
  calc lcm --a 7 --b 5
```

---

## `hieudoanm casino`

Casino games: blackjack, poker odds, and more

```bash
hieudoanm casino
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

---

### `hieudoanm casino blackjack`

Blackjack games

Blackjack subcommands: play a full game, or practice card counting.

```bash
hieudoanm casino blackjack
```

Example:

```bash
  casino blackjack play
  casino blackjack count
```

---

#### `hieudoanm casino blackjack count`

Practice card counting

A terminal-based Blackjack card counting game with a Bubble Tea TUI interface.

```bash
hieudoanm casino blackjack count
```

Example:

```bash
  casino blackjack count
```

---

#### `hieudoanm casino blackjack play`

Play a full game of Blackjack against the dealer

Play a full game of Blackjack against the dealer with a Bubble Tea TUI. Supports hit, stand, and double down. Starts with $1000 balance.

```bash
hieudoanm casino blackjack play
```

Example:

```bash
  casino blackjack play
```

---

### `hieudoanm casino poker`

Poker: odds calculator and Texas Hold'em

Poker subcommands: calculate Texas Hold'em odds, or play heads-up against an AI.

```bash
hieudoanm casino poker
```

Example:

```bash
  casino poker odds --hand "Ah Kh"
  casino poker play
```

---

#### `hieudoanm casino poker odds`

Calculate Texas Hold'em poker odds

Calculate win/tie/lose odds using Monte Carlo simulation for Texas Hold'em.

Hole cards are required (e.g. "Ah Kh" or "As Ks").
Use --board to specify community cards (0-5 cards).

```bash
hieudoanm casino poker odds [--hand <hole>]
```

##### Flags

| Flag            | Shorthand | Default | Description                         |
| --------------- | --------- | ------- | ----------------------------------- |
| `--hand`        | `-H`      | ``      | Hole cards (e.g. \"Ah Kh\")         |
| `--board`       | `-b`      | ``      | Community cards (e.g. \"2h 7s Tc\") |
| `--opponents`   | `-o`      | `1`     | Number of opponents                 |
| `--simulations` | `-n`      | `10000` | Number of Monte Carlo simulations   |

Example:

```bash
  casino poker odds --hand "Ah Kh"
  casino poker odds --hand "Ah Kh" --board "2h 7s Tc"
  casino poker odds --hand "As Ks" --board "2h 7s Tc" --opponents 3
```

---

#### `hieudoanm casino poker play`

Play heads-up Texas Hold'em against an AI opponent

Play heads-up Texas Hold'em against an AI opponent with a Bubble Tea TUI. Supports check, bet, call, raise, and fold. Starts with $1000 each.

```bash
hieudoanm casino poker play
```

Example:

```bash
  casino poker play
```

---

### `hieudoanm casino baccarat`

Baccarat games

Baccarat subcommands: play a game, or analyze betting strategy.

```bash
hieudoanm casino baccarat
```

Example:

```bash
  casino baccarat play
  casino baccarat strategy
```

---

#### `hieudoanm casino baccarat play`

Play a game of Baccarat

Play a game of Baccarat against the banker with a Bubble Tea TUI. Bet on Player, Banker, or Tie. Follows standard baccarat drawing rules.

```bash
hieudoanm casino baccarat play
```

Example:

```bash
  casino baccarat play
```

---

#### `hieudoanm casino baccarat strategy`

Baccarat strategy analysis and statistics

Analyze baccarat odds and optimal betting strategy through simulation.

```bash
hieudoanm casino baccarat strategy
```

##### Flags

| Flag            | Shorthand | Default  | Description           |
| --------------- | --------- | -------- | --------------------- |
| `--simulations` | `-n`      | `100000` | Number of simulations |

Example:

```bash
  casino baccarat strategy
  casino baccarat strategy --simulations 50000
```

---

### `hieudoanm casino slots`

Slot machine games

Slot machine subcommands: play a slot machine game.

```bash
hieudoanm casino slots
```

Example:

```bash
  casino slots play
```

---

#### `hieudoanm casino slots play`

Play a slot machine

Play a slot machine with a Bubble Tea TUI. Three reels with symbols: Cherry, Lemon, Bell, Diamond, 7, BAR. Match three of a kind to win.

```bash
hieudoanm casino slots play
```

Example:

```bash
  casino slots play
```

---

### `hieudoanm casino coin`

Flip a coin

Simulate flipping one or more coins and display the results.

Shows heads/tails distribution when flipping multiple coins.

```bash
hieudoanm casino coin
```

#### Flags

| Flag      | Shorthand | Default | Description          |
| --------- | --------- | ------- | -------------------- |
| `--count` | `-n`      | `1`     | Number of coin flips |

Example:

```bash
  casino coin
  casino coin --count 10
```

---

### `hieudoanm casino dice`

Roll dice

Roll one or more dice with a configurable number of sides.

Shows individual die results and the total when rolling multiple dice.

```bash
hieudoanm casino dice
```

#### Flags

| Flag      | Shorthand | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| `--sides` | `-s`      | `6`     | Number of sides per die |
| `--count` | `-n`      | `1`     | Number of dice to roll  |

Example:

```bash
  casino dice
  casino dice --sides 20
  casino dice --count 4 --sides 6
```

---

### `hieudoanm casino roulette`

Spin the roulette wheel

Spin a European roulette wheel (numbers 0-36) and display results.

Shows the number, color (Red/Black/Green), parity (Even/Odd), and half (1-18/19-36).

```bash
hieudoanm casino roulette
```

#### Flags

| Flag      | Shorthand | Default | Description     |
| --------- | --------- | ------- | --------------- |
| `--spins` | `-n`      | `1`     | Number of spins |

Example:

```bash
  casino roulette
  casino roulette --spins 5
```

---

## `hieudoanm chess`

Chess tools and utilities

Chess tools including board analysis, FEN/PGN utilities, and Lichess integration.

```bash
hieudoanm chess
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg
  chess pgn fen --pgn-file game.pgn
  chess pgn uci --pgn "1.e4 e5 2.Nf3"
  chess play
  chess elo
  chess random
  chess setup
  chess com player --username hikaru
  chess com leaderboards
  chess com titled
```

---

### `hieudoanm chess com`

Chess.com integration

Fetch data from Chess.com: player profiles, leaderboards, and titled player counts.

```bash
hieudoanm chess com
```

Example:

```bash
  chess com player --username hikaru
  chess com leaderboards --top 10
  chess com titled
```

---

#### `hieudoanm chess com player`

Show Chess.com player profile and stats

Fetch and display a Chess.com player's profile information including name, title, country, and ratings for bullet, blitz, and rapid.

```bash
hieudoanm chess com player [--username <username>]
```

##### Flags

| Flag         | Shorthand | Default | Description        |
| ------------ | --------- | ------- | ------------------ |
| `--username` | `-u`      | ``      | Chess.com username |

Example:

```bash
  chess com player --username hikaru
  chess com player --username magnuscarlsen
```

---

#### `hieudoanm chess com leaderboards`

Show Chess.com leaderboards

Fetch and display top players from Chess.com leaderboards for bullet, blitz, rapid, and Chess960 variants. Supports filtering by country.

```bash
hieudoanm chess com leaderboards
```

##### Flags

| Flag        | Shorthand | Default | Description                                   |
| ----------- | --------- | ------- | --------------------------------------------- |
| `--top`     | ``        | `5`     | Number of top players to display              |
| `--country` | ``        | ``      | Filter players by country code (e.g., US, RU) |

Example:

```bash
  chess com leaderboards
  chess com leaderboards --top 10
  chess com leaderboards --country US
```

---

#### `hieudoanm chess com titled`

Show Chess.com titled player counts

Fetch and display the number of Chess.com players holding each title (GM, IM, FM, etc.).

```bash
hieudoanm chess com titled
```

Example:

```bash
  chess com titled
```

---

### `hieudoanm chess elo`

Calculate new Elo rating after a game

Calculate your new Elo rating after a chess game given your rating, opponent's rating, result, and optional K-factor.

```bash
hieudoanm chess elo
```

Example:

```bash
  chess elo
```

---

### `hieudoanm chess fen`

FEN-based chess analysis tools

Analyze FEN strings with cloud evaluation and render boards to SVG.

```bash
hieudoanm chess fen
```

#### Flags

| Flag     | Shorthand | Default | Description                  |
| -------- | --------- | ------- | ---------------------------- |
| `--list` | `-l`      | `false` | List popular chess platforms |

Example:

```bash
  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg
```

---

#### `hieudoanm chess fen eval`

Evaluate a FEN position using Lichess cloud eval

Fetch a cloud-based evaluation for a FEN position from Lichess, returning centipawn scores and principal variations.

```bash
hieudoanm chess fen eval
```

##### Flags

| Flag        | Shorthand | Default | Description                       |
| ----------- | --------- | ------- | --------------------------------- |
| `--fen`     | ``        | ``      | FEN string to evaluate (required) |
| `--multipv` | ``        | `3`     | Number of principal variations    |

Example:

```bash
  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen eval --fen "..." --multipv 5
```

---

#### `hieudoanm chess fen svg`

Render a FEN position as an SVG board image

Generate an SVG image of a chess board from a FEN string, with standard light/dark square colors.

```bash
hieudoanm chess fen svg
```

##### Flags

| Flag    | Shorthand | Default | Description                          |
| ------- | --------- | ------- | ------------------------------------ |
| `--fen` | ``        | ``      | FEN string to render                 |
| `--out` | ``        | ``      | Output SVG file (default: board.svg) |

Example:

```bash
  chess fen svg --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg
```

---

### `hieudoanm chess pgn`

PGN chess game analysis tools

Convert PGN game notation to FEN positions per move, or extract UCI move sequences.

```bash
hieudoanm chess pgn
```

Example:

```bash
  chess pgn fen --pgn-file game.pgn
  chess pgn uci --pgn "1.e4 e5 2.Nf3
```

---

#### `hieudoanm chess pgn fen`

Convert PGN to FEN per move with evaluation

Parse a PGN game and display each move with its resulting FEN, centipawn evaluation from Lichess cloud eval, and a quality label (Best/Good/Inaccuracy/Mistake/Blunder).

```bash
hieudoanm chess pgn fen
```

##### Flags

| Flag         | Shorthand | Default | Description        |
| ------------ | --------- | ------- | ------------------ |
| `--pgn-file` | ``        | ``      | Path to a PGN file |
| `--pgn`      | ``        | ``      | Raw PGN string     |

Example:

```bash
  chess pgn fen --pgn-file game.pgn
  chess pgn fen --pgn "1.e4 e5 2.Nf3 Nc6
```

---

#### `hieudoanm chess pgn uci`

Convert PGN moves to UCI notation

Parse a PGN game and output the moves as a space-separated UCI (Universal Chess Interface) string.

```bash
hieudoanm chess pgn uci
```

##### Flags

| Flag         | Shorthand | Default | Description        |
| ------------ | --------- | ------- | ------------------ |
| `--pgn-file` | ``        | ``      | Path to a PGN file |
| `--pgn`      | ``        | ``      | Raw PGN string     |

Example:

```bash
  chess pgn uci --pgn-file game.pgn
  chess pgn uci --pgn "1.e4 e5 2.Nf3 Nc6 3.Bb5
```

---

### `hieudoanm chess play`

Play chess interactively in the terminal

Play a full chess game in your terminal with board display. Enter moves in SAN notation (e.g., e4, Nf3). Supports blind mode with --blind.

```bash
hieudoanm chess play
```

#### Flags

| Flag      | Shorthand | Default | Description                    |
| --------- | --------- | ------- | ------------------------------ |
| `--blind` | ``        | `false` | Hide the board after each move |

Example:

```bash
  chess play
  chess play --blind
```

---

### `hieudoanm chess random`

Pick a random Chess960 starting position

Select a random Chess960 starting position, display the FEN, and fetch a cloud evaluation from Lichess.

```bash
hieudoanm chess random
```

Example:

```bash
  chess random
```

---

### `hieudoanm chess setup`

Set up a specific Chess960 starting position

Select a Chess960 starting position by number, display the FEN, and fetch a cloud evaluation from Lichess.

```bash
hieudoanm chess setup
```

Example:

```bash
  chess setup
  chess setup 518
```

---

## `hieudoanm colors`

Color conversion and palette generation tools

Convert between color spaces (HEX, RGB, HSL, HCL, OKLCH, CMYK) and generate color palettes.

```bash
hieudoanm colors
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  colors hex
  colors rgb
  colors hcl
  colors oklch
  colors palette
  colors random
```

---

### `hieudoanm colors hcl`

Convert HCL values to HEX, RGB, HSL, OKLCH, and CMYK

Prompt for HCL (Hue, Chroma, Lightness) values and convert them to RGB, HEX, HSL, OKLCH, and CMYK color spaces.

```bash
hieudoanm colors hcl
```

Example:

```bash
  colors hcl
```

---

### `hieudoanm colors hex`

Convert a HEX color to RGB, HSL, HCL, OKLCH, and CMYK

Prompt for a HEX color code and convert it to RGB, HSL, HCL, OKLCH, and CMYK color spaces.

```bash
hieudoanm colors hex
```

Example:

```bash
  colors hex
```

---

### `hieudoanm colors oklch`

Convert OKLCH values to HEX, RGB, HSL, HCL, and CMYK

Prompt for OKLCH (Lightness, Chroma, Hue) values and convert them to RGB, HEX, HSL, HCL, and CMYK color spaces.

```bash
hieudoanm colors oklch
```

Example:

```bash
  colors oklch
```

---

### `hieudoanm colors rgb`

Convert RGB values to HEX, HSL, HCL, OKLCH, and CMYK

Prompt for R, G, B values and convert them to HEX, HSL, HCL, OKLCH, and CMYK color spaces.

```bash
hieudoanm colors rgb
```

Example:

```bash
  colors rgb
```

---

### `hieudoanm colors palette`

Generate a color palette from a base HEX color

Generate a 3-color palette (base, support, accent) from a base HEX color using triadic, complementary, or analogous harmony.

```bash
hieudoanm colors palette
```

Example:

```bash
  colors palette
```

---

### `hieudoanm colors random`

Generate random HEX colors with RGB preview

Generate one or more random HEX colors and display them alongside their RGB values.

```bash
hieudoanm colors random
```

#### Flags

| Flag    | Shorthand | Default | Description             |
| ------- | --------- | ------- | ----------------------- |
| `--max` | `-m`      | `1`     | number of random colors |

Example:

```bash
  colors random
  colors random --max 5
```

---

## `hieudoanm convert`

Text conversion utilities

Convert text between formats: Braille, Morse code, and string case transformations.

```bash
hieudoanm convert
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  convert base64 "hello world"
  convert morse "sos"
  convert slug "Hello World!
```

---

### `hieudoanm convert braille`

Convert text to Braille

Converts plain text to Unicode Braille characters. Supports letters, numbers, and common punctuation.

```bash
hieudoanm convert braille [text]
```

Example:

```bash
  convert braille "hello"
  convert braille "good morning
```

---

### `hieudoanm convert morse`

Convert text to Morse code

Converts plain text to Morse code. Supports letters, numbers, and common punctuation.

```bash
hieudoanm convert morse [text]
```

Example:

```bash
  convert morse "hello world"
  convert morse "sos
```

---

### `hieudoanm convert base64`

Encode or decode base64

Encode text to base64 or decode base64 back to text (use --decode for decoding).

```bash
hieudoanm convert base64 [text]
```

#### Flags

| Flag       | Shorthand | Default | Description   |
| ---------- | --------- | ------- | ------------- |
| `--decode` | `-d`      | `false` | Decode base64 |

Example:

```bash
  convert base64 "hello world"
  convert base64 --decode "aGVsbG8gd29ybGQ=
```

---

### `hieudoanm convert url`

Encode or decode a URL

URL-encode a string or URL-decode an encoded string (use --decode for decoding).

```bash
hieudoanm convert url [text]
```

#### Flags

| Flag       | Shorthand | Default | Description |
| ---------- | --------- | ------- | ----------- |
| `--decode` | `-d`      | `false` | Decode URL  |

Example:

```bash
  convert url "hello world"
  convert url --decode "hello+world
```

---

### `hieudoanm convert capitalise`

Capitalise the first letter of each word

Capitalise the first letter of each word in the provided text.

```bash
hieudoanm convert capitalise [text]
```

Example:

```bash
  convert capitalise "hello world"
  convert capitalise "the quick brown fox
```

---

### `hieudoanm convert deburr`

Remove diacritical marks (accents) from letters

Remove diacritical marks (accents) from letters, converting accented characters to their ASCII equivalents.

```bash
hieudoanm convert deburr [text]
```

Example:

```bash
  convert deburr "héllo wörld"
  convert deburr "café résumé
```

---

### `hieudoanm convert kebabcase`

Convert a string to kebab-case

Convert a string to kebab-case by replacing spaces, underscores, and camelCase boundaries with hyphens.

```bash
hieudoanm convert kebabcase [text]
```

Example:

```bash
  convert kebabcase "hello world"
  convert kebabcase "helloWorld"
  convert kebabcase "hello_world
```

---

### `hieudoanm convert camelcase`

Convert a string to camelCase

Convert a string to camelCase by joining words with the first word lowercased and subsequent words capitalised.

```bash
hieudoanm convert camelcase [text]
```

Example:

```bash
  convert camelcase "hello world"
  convert camelcase "hello-world"
  convert camelcase "hello_world
```

---

### `hieudoanm convert pascalcase`

Convert a string to PascalCase

Convert a string to PascalCase by capitalising the first letter of each word and joining them.

```bash
hieudoanm convert pascalcase [text]
```

Example:

```bash
  convert pascalcase "hello world"
  convert pascalcase "hello-world"
  convert pascalcase "hello_world
```

---

### `hieudoanm convert slug`

Generate a URL-friendly slug

Generate a URL-friendly slug by lowercasing, replacing spaces with hyphens, and removing special characters.

```bash
hieudoanm convert slug [text]
```

Example:

```bash
  convert slug "Hello World!"
  convert slug "My Blog Post Title
```

---

### `hieudoanm convert lowercase`

Convert a string to lowercase

Convert all characters in the provided text to lowercase.

```bash
hieudoanm convert lowercase [text]
```

Example:

```bash
  convert lowercase "HELLO WORLD"
  convert lowercase "The Quick Brown Fox
```

---

### `hieudoanm convert snakecase`

Convert a string to snake_case

Convert a string to snake_case by replacing spaces, hyphens, and camelCase boundaries with underscores.

```bash
hieudoanm convert snakecase [text]
```

Example:

```bash
  convert snakecase "hello world"
  convert snakecase "helloWorld"
  convert snakecase "hello-world
```

---

### `hieudoanm convert uppercase`

Convert a string to uppercase

Convert all characters in the provided text to uppercase.

```bash
hieudoanm convert uppercase [text]
```

Example:

```bash
  convert uppercase "hello world"
  convert uppercase "the quick brown fox
```

---

### `hieudoanm convert count`

Count characters, words, and lines in text

Count the number of characters, words, and lines in the provided text.
If no text is provided, reads from stdin.

```bash
hieudoanm convert count <text>
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  convert count "hello world"
  convert count --json "the quick brown fox"
  echo "hello world" | convert count
```

---

## `hieudoanm crypto`

Cryptographic and security tools

Hashing, password generation, JWT, UUIDs, and QR codes.

```bash
hieudoanm crypto
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  crypto uuid
  crypto hash --text "hello world"
  crypto passwd --length 32 --symbols
```

---

### `hieudoanm crypto hash`

Compute hashes of text or files

Compute MD5, SHA1, SHA256, or SHA512 hashes with optional HMAC support.

```bash
hieudoanm crypto hash
```

#### Flags

| Flag      | Shorthand | Default  | Description                                  |
| --------- | --------- | -------- | -------------------------------------------- |
| `--algo`  | `-a`      | `sha256` | Hash algorithm (md5, sha1, sha256, sha512)   |
| `--text`  | `-t`      | ``       | Text to hash                                 |
| `--key`   | `-k`      | ``       | HMAC key                                     |
| `--check` | ``        | `false`  | Verify file hash from 'hash filename' format |
| `--json`  | ``        | `false`  | Output in JSON format                        |

Example:

```bash
  hash --text "hello world"
  hash --text "hello" --algo sha256 --key secret
```

---

### `hieudoanm crypto jwt`

Encode and decode JWTs

Encode (sign) and decode JWT tokens using HMAC-based algorithms (HS256, HS384, HS512).

```bash
hieudoanm crypto jwt
```

Example:

```bash
  crypto jwt encode --key secret --claims '{"sub":"123","name":"John"}'
  crypto jwt decode --token eyJhbGci...
```

---

#### `hieudoanm crypto jwt decode`

Decode a JWT token without signature verification

Decode a JWT token to inspect its header and payload claims without verifying the signature. Supports JSON output.

```bash
hieudoanm crypto jwt decode [--token <token>]
```

##### Flags

| Flag      | Shorthand | Default | Description           |
| --------- | --------- | ------- | --------------------- |
| `--token` | `-t`      | ``      | JWT token to decode   |
| `--json`  | ``        | `false` | Output in JSON format |

Example:

```bash
  crypto jwt decode --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.abc
  crypto jwt decode --token eyJhbGci... --json
```

---

#### `hieudoanm crypto jwt encode`

Encode and sign a JWT token

Create a signed JWT token with custom claims and signing method.

```bash
hieudoanm crypto jwt encode
```

##### Flags

| Flag          | Shorthand | Default | Description                             |
| ------------- | --------- | ------- | --------------------------------------- |
| `--algorithm` | `-a`      | `HS256` | Signing algorithm (HS256, HS384, HS512) |
| `--key`       | `-k`      | ``      | Signing key (secret)                    |
| `--claims`    | `-c`      | ``      | Claims as JSON string                   |

Example:

```bash
  jwt encode --key secret --claims '{"sub":"123","name":"John"}'
  jwt encode --key secret --claims '{"sub":"123"}' --algorithm HS256
```

---

### `hieudoanm crypto keygen`

Generate a new SSH keypair

Generate an SSH keypair (RSA, ECDSA, or Ed25519).

Writes two files: <name> (private key) and <name>.pub (public key).
Private key is saved in PEM format with 0600 permissions.

```bash
hieudoanm crypto keygen
```

#### Flags

| Flag       | Shorthand | Default   | Description                                               |
| ---------- | --------- | --------- | --------------------------------------------------------- |
| `--algo`   | `-a`      | `ed25519` | Key algorithm (rsa, ecdsa, ed25519)                       |
| `--bits`   | `-b`      | `256`     | Key size (bits): 2048/4096 for rsa, 256/384/521 for ecdsa |
| `--output` | `-o`      | `id_rsa`  | Output file path                                          |

Example:

```bash
  crypto keygen --algo ed25519 -o id_ed25519
  crypto keygen --algo rsa --bits 4096 -o id_rsa
  crypto keygen --algo ecdsa --bits 256 -o id_ecdsa
```

---

### `hieudoanm crypto passwd`

Generate secure random passwords

Generate random passwords with configurable length, character sets, and pronounceable options.

```bash
hieudoanm crypto passwd
```

#### Flags

| Flag              | Shorthand | Default | Description                             |
| ----------------- | --------- | ------- | --------------------------------------- |
| `--length`        | `-l`      | `16`    | Password length                         |
| `--count`         | `-n`      | `1`     | Number of passwords                     |
| `--digits`        | `-d`      | `true`  | Include digits                          |
| `--symbols`       | `-s`      | `false` | Include symbols                         |
| `--no-upper`      | ``        | `false` | Exclude uppercase letters               |
| `--pin`           | ``        | `false` | Generate numeric PIN                    |
| `--clip`          | ``        | `false` | Copy to clipboard (first password only) |
| `--pronounceable` | ``        | `false` | Generate pronounceable password         |
| `--json`          | ``        | `false` | Output in JSON format                   |

Example:

```bash
  passwd
  passwd --length 32 --symbols
  passwd --pin --count 5
  passwd --pronounceable
```

---

### `hieudoanm crypto uuid`

Generate UUID v4 identifiers

Generate random UUID v4 (RFC 4122) identifiers. Supports generating multiple UUIDs at once and JSON output.

```bash
hieudoanm crypto uuid
```

#### Flags

| Flag      | Shorthand | Default | Description                 |
| --------- | --------- | ------- | --------------------------- |
| `--count` | `-n`      | `1`     | Number of UUIDs to generate |
| `--json`  | ``        | `false` | Output in JSON format       |

Example:

```bash
  crypto uuid
  crypto uuid --count 5
  crypto uuid --count 3 --json
```

---

### `hieudoanm crypto qrcode`

Generate a QR code in the terminal

Generate a QR code from text and display it in the terminal using Unicode block characters.

```bash
hieudoanm crypto qrcode [--data <text>]
```

#### Flags

| Flag     | Shorthand | Default | Description            |
| -------- | --------- | ------- | ---------------------- |
| `--data` | `-d`      | ``      | Text or data to encode |

Example:

```bash
  crypto qrcode --data "https://example.com"
  crypto qrcode --data "Hello, World!
```

---

### `hieudoanm crypto encrypt`

Encrypt a file with AES-256-GCM

Encrypt a file using AES-256-GCM with a key derived from the given password.

```bash
hieudoanm crypto encrypt [--file <file>]
```

#### Flags

| Flag         | Shorthand | Default | Description                       |
| ------------ | --------- | ------- | --------------------------------- |
| `--file`     | `-f`      | ``      | File to encrypt                   |
| `--password` | `-p`      | ``      | Encryption password               |
| `--output`   | `-o`      | ``      | Output file (default: <file>.enc) |

Example:

```bash
  crypto encrypt --file secret.txt --password "hunter2"
  crypto encrypt --file secret.txt --password "hunter2" --output secret.enc
```

---

### `hieudoanm crypto decrypt`

Decrypt a file encrypted with AES-256-GCM

Decrypt a file previously encrypted with "crypto encrypt" using the same password.

```bash
hieudoanm crypto decrypt [--file <file>]
```

#### Flags

| Flag         | Shorthand | Default | Description         |
| ------------ | --------- | ------- | ------------------- |
| `--file`     | `-f`      | ``      | File to decrypt     |
| `--password` | `-p`      | ``      | Decryption password |
| `--output`   | `-o`      | ``      | Output file         |

Example:

```bash
  crypto decrypt --file secret.enc --password "hunter2"
  crypto decrypt --file secret.enc --password "hunter2" --output secret.txt
```

---

### `hieudoanm crypto totp`

Generate a TOTP code from a Base32 secret

Generate a Time-based One-Time Password (RFC 6238) from a Base32-encoded secret key.

Accepts secrets with or without padding. Compatible with Google Authenticator, Authy, and most 2FA apps.

```bash
hieudoanm crypto totp [--secret <secret>]
```

#### Flags

| Flag       | Shorthand | Default | Description                          |
| ---------- | --------- | ------- | ------------------------------------ |
| `--secret` | `-s`      | ``      | Base32 secret                        |
| `--step`   | ``        | `30`    | Time step in seconds                 |
| `--digits` | ``        | `6`     | Number of digits (6 or 8)            |
| `--time`   | ``        | ``      | Time in RFC3339 format (for testing) |
| `--json`   | ``        | `false` | Output in JSON format                |

Example:

```bash
  crypto totp --secret JBSWY3DPEHPK3PXP
  crypto totp --secret JBSWY3DPEHPK3PXP --step 30 --digits 6
  crypto totp --secret JBSWY3DPEHPK3PXP --json
```

---

## `hieudoanm data`

Data serialization and transformation tools

Format, convert, and validate JSON, YAML, and CSV.

```bash
hieudoanm data
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  data csv data.csv
  data yml config.yml --validate
  data json data.json --query ".name
```

---

### `hieudoanm data csv`

View and format CSV files

Read a CSV file (or stdin) and display records as pipe-delimited text or JSON.

```bash
hieudoanm data csv <file>
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  data csv data.csv
  data csv data.csv --json
  cat data.csv | data csv
```

---

### `hieudoanm data json`

Query, format, diff, and merge JSON data

Pretty-print JSON, run jq-like queries, or diff/merge two JSON files.

```bash
hieudoanm data json [file]
```

#### Flags

| Flag       | Shorthand | Default | Description                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `--query`  | `-q`      | ``      | JQ-like query (e.g. .name, .items[0]) |
| `--diff`   | ``        | ``      | Diff with another JSON file           |
| `--merge`  | ``        | ``      | Merge with another JSON file (patch)  |
| `--pretty` | `-p`      | `false` | Pretty-print JSON                     |

Example:

```bash
  data json data.json
  data json data.json --query ".name"
  data json data.json --diff file2.json
  data json --merge base.json patch.json
```

---

### `hieudoanm data yml`

Parse, validate, and lint YAML files

Parse, validate, lint, and convert YAML files. Can output as JSON or reformatted YAML.

```bash
hieudoanm data yml <file>
```

#### Flags

| Flag         | Shorthand | Default | Description           |
| ------------ | --------- | ------- | --------------------- |
| `--validate` | `-V`      | `false` | Validate YAML syntax  |
| `--lint`     | ``        | `false` | Lint YAML file        |
| `--json`     | ``        | `false` | Output in JSON format |

Example:

```bash
  data yml config.yml
  data yml config.yml --validate
  data yml config.yml --json
```

---

## `hieudoanm docsify`

Codebase documentation and analysis tools

Generate documentation from Cobra CLI projects, scan codebases for symbols and call graphs, build wiki-link graphs from markdown files, and produce directory trees.

```bash
hieudoanm docsify
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  docsify cobra --file /path/to/project
  docsify scan --dir . --out graph.graphml
  docsify tree --dir . --out TREE.md
```

---

### `hieudoanm docsify cobra`

Generate README.md documentation from a Cobra CLI project

docsify cobra scans Go source files for &cobra.Command{} definitions and generates a single README.md documenting all commands, subcommands, flags, and usage.

```bash
hieudoanm docsify cobra [--file <path>]
```

#### Flags

| Flag       | Shorthand | Default     | Description                                                  |
| ---------- | --------- | ----------- | ------------------------------------------------------------ |
| `--file`   | `-f`      | ``          | Path to cobra project directory (default: current directory) |
| `--output` | `-o`      | `README.md` | Output file path                                             |

Example:

```bash
  docsify cobra --file /path/to/project
  docsify cobra -f . -o README.md
```

---

### `hieudoanm docsify obsidian`

Build a wiki-link graph from markdown files

Walk a directory tree of markdown files, extract [[wiki-link]] references,
and output a graph of how files interconnect.

Formats:
dot - Graphviz DOT format (default)
json - JSON object with nodes[] and edges[]
edges - Plain text edge list

```bash
hieudoanm docsify obsidian
```

#### Flags

| Flag        | Shorthand | Default                                           | Description                            |
| ----------- | --------- | ------------------------------------------------- | -------------------------------------- |
| `--dir`     | ``        | `.`                                               | Root directory to scan                 |
| `--out`     | ``        | ``                                                | Output file path (default: stdout)     |
| `--format`  | ``        | `dot`                                             | Output format: dot, json, edges        |
| `--exclude` | ``        | `.git,node_modules,vendor,dist,.next,__pycache__` | Comma-separated directories to exclude |

Example:

```bash
  docsify obsidian --dir . --format dot --out graph.dot
  docsify obsidian --dir /path/to/vault --format json
```

---

### `hieudoanm docsify scan`

Scan a codebase and generate a GraphML file

Walk a codebase directory, extract symbols (functions, types, classes) and call edges from Go, TypeScript, Python, and Rust source files, and write the result as a GraphML file.

```bash
hieudoanm docsify scan
```

#### Flags

| Flag        | Shorthand | Default                                           | Description                            |
| ----------- | --------- | ------------------------------------------------- | -------------------------------------- |
| `--dir`     | ``        | `.`                                               | Root directory to scan                 |
| `--out`     | ``        | `codebase.graphml`                                | Output .graphml file path              |
| `--exclude` | ``        | `.git,node_modules,vendor,dist,.next,__pycache__` | Comma-separated directories to exclude |
| `--verbose` | ``        | `false`                                           | Print progress to stderr               |

Example:

```bash
  docsify scan --dir . --out graph.graphml
  docsify scan --dir /path/to/project --verbose
```

---

### `hieudoanm docsify tree`

Generate directory tree as Markdown

Walk the directory tree and write the structure to TREE.md, respecting .gitignore patterns.

```bash
hieudoanm docsify tree
```

#### Flags

| Flag    | Shorthand | Default   | Description            |
| ------- | --------- | --------- | ---------------------- |
| `--dir` | ``        | `.`       | Root directory to tree |
| `--out` | ``        | `TREE.md` | Output file path       |

Example:

```bash
  docsify tree --dir . --out TREE.md
  docsify tree --dir /path/to/project
```

---

## `hieudoanm doi`

DOI productivity tools

Tools for working with Digital Object Identifiers (DOIs): fetch metadata, generate citations, and validate identifiers.

```bash
hieudoanm doi
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  doi fetch 10.1000/xyz123
  doi cite 10.1000/xyz123
  doi ref 10.1000/xyz123
  doi validate 10.1000/xyz123
```

---

### `hieudoanm doi cite`

Generate an APA citation from a DOI

Fetches metadata for a given DOI from Crossref and generates an APA-formatted citation.

```bash
hieudoanm doi cite [doi]
```

Example:

```bash
  doi cite 10.1000/xyz123
  doi cite 10.1038/nature12373
```

---

### `hieudoanm doi ref`

Generate a formatted reference from a DOI

Fetches metadata for a given DOI from Crossref and generates a formatted reference entry.

```bash
hieudoanm doi ref [doi]
```

Example:

```bash
  doi ref 10.1000/xyz123
  doi ref 10.1038/nature12373
```

---

### `hieudoanm doi fetch`

Fetch raw metadata for a DOI

Fetches metadata for a given DOI from Crossref and displays the raw JSON response.

```bash
hieudoanm doi fetch [doi]
```

Example:

```bash
  doi fetch 10.1000/xyz123
  doi fetch 10.1038/nature12373
```

---

### `hieudoanm doi validate`

Validate a DOI string format

Checks whether a given string conforms to the DOI syntax (10.NNNN/...).

```bash
hieudoanm doi validate [doi]
```

Example:

```bash
  doi validate 10.1000/xyz123
  doi validate 10.1234/invalid
```

---

## `hieudoanm english`

English dictionary tools

English dictionary lookup tool that fetches word definitions, synonyms, antonyms, and usage examples.

```bash
hieudoanm english
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  english define --word hello
  english define --word serendipity --json
```

---

### `hieudoanm english define`

Look up the definition of an English word

Fetches and displays the definition, part of speech, synonyms, and antonyms for a given English word from a local dictionary data source.

```bash
hieudoanm english define [--word <word>]
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--word` | `-w`      | ``      | Word to define        |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  english define --word hello
  english define --word serendipity --json
```

---

## `hieudoanm file`

File introspection and analysis tools

Check file checksums, detect types, analyze sizes, find duplicates, search, read, write, and edit files.

```bash
hieudoanm file
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

Example:

```bash
  file checksum --file document.pdf --algorithm sha256
  file type --file image.png
  file read -f main.go --lines 50
  file grep --pattern "TODO" --path .
```

---

### `hieudoanm file checksum`

Compute file checksum

Compute a cryptographic hash of a file. Supports md5, sha1, sha256 (default), and sha512.

```bash
hieudoanm file checksum [--file <path>]
```

#### Flags

| Flag          | Shorthand | Default  | Description                               |
| ------------- | --------- | -------- | ----------------------------------------- |
| `--algorithm` | `-a`      | `sha256` | Hash algorithm: md5, sha1, sha256, sha512 |
| `--file`      | `-f`      | ``       | File path                                 |

Example:

```bash
  file checksum --file document.pdf
  file checksum --algorithm sha256 --file document.pdf
  file checksum -f document.pdf --algorithm sha256
```

---

### `hieudoanm file chmod`

Change file permissions

Change permissions of a file. Mode is an octal string (e.g. 755, 644, 600).

```bash
hieudoanm file chmod [--mode <octal>] [--file <path>]
```

#### Flags

| Flag          | Shorthand | Default | Description                      |
| ------------- | --------- | ------- | -------------------------------- |
| `--mode`      | `-m`      | ``      | Octal permission mode (e.g. 755) |
| `--file`      | `-f`      | ``      | File or directory path           |
| `--recursive` | `-r`      | `false` | Change permissions recursively   |

Example:

```bash
  file chmod --mode 755 --file script.sh
  file chmod -m 644 -f README.md
  file chmod -r -m 755 -f dir/
```

---

### `hieudoanm file count`

Count lines, words, and bytes in a file

Count lines, words, and bytes in a file (like Unix wc).

```bash
hieudoanm file count [--file <path>]
```

#### Flags

| Flag     | Shorthand | Default | Description |
| -------- | --------- | ------- | ----------- |
| `--file` | `-f`      | ``      | File path   |

Example:

```bash
  file count --file main.go
  file count -f main.go --json
```

---

### `hieudoanm file duplicates`

Find duplicate files by size and partial hash

Scan a directory for duplicate files by comparing SHA-256 hashes of files with the same size.

```bash
hieudoanm file duplicates [--dir <path>]
```

#### Flags

| Flag         | Shorthand | Default | Description                           |
| ------------ | --------- | ------- | ------------------------------------- |
| `--dir`      | `-d`      | ``      | Directory to scan                     |
| `--min-size` | `-m`      | `1`     | Minimum file size to consider (bytes) |

Example:

```bash
  file duplicates --dir .
  file duplicates -d /path/to/files --min-size 1024
  file duplicates -d . --json
```

---

### `hieudoanm file edit`

Find and replace text in a file

Replace occurrences of a string (or regex pattern) in a file.

```bash
hieudoanm file edit [--file <path>] [--old <text>] [--new <text>]
```

#### Flags

| Flag        | Shorthand | Default | Description                                |
| ----------- | --------- | ------- | ------------------------------------------ |
| `--file`    | `-f`      | ``      | File path                                  |
| `--old`     | `-o`      | ``      | Text or pattern to replace                 |
| `--new`     | ``        | ``      | Replacement text                           |
| `--regex`   | `-r`      | `false` | Interpret old as a regex pattern           |
| `--preview` | `-p`      | `false` | Preview changes without modifying the file |
| `--count`   | `-n`      | `0`     | Number of occurrences to replace (0 = all) |

Example:

```bash
  file edit -f main.go --old "foo" --new "bar"
  file edit --regex -f main.go --old "foo.*" --new "bar"
  file edit -f main.go -o "foo" -n "bar" --preview
  file edit -f main.go -o "foo" -n "bar" --count 1
```

---

### `hieudoanm file grep`

Search file contents using regex or fixed strings

Search for a pattern in files (grep = global regular expression print). Supports recursive directory search and glob patterns.

```bash
hieudoanm file grep [--pattern <regex>] [--path <dir>]
```

#### Flags

| Flag            | Shorthand | Default | Description                                  |
| --------------- | --------- | ------- | -------------------------------------------- |
| `--pattern`     | `-p`      | ``      | Regex or fixed string pattern to search for  |
| `--path`        | `-P`      | ``      | File or directory to search (default: .)     |
| `--include`     | `-i`      | ``      | Glob pattern for file names (e.g. \"\*.go\") |
| `--context`     | `-C`      | `0`     | Show N lines of context around matches       |
| `--fixed`       | `-F`      | `false` | Fixed string match (not regex)               |
| `--max-count`   | `-m`      | `0`     | Maximum number of matches                    |
| `--ignore-case` | `-v`      | `false` | Case-insensitive search                      |

Example:

```bash
  file grep --pattern "TODO" --path main.go
  file grep -p "func" --path . --ignore-case
  file grep --pattern "error" --include "*.go"
  file grep --fixed -p "fmt.Println" --path src/
  file grep -p "panic" --path . --context 2
```

---

### `hieudoanm file head`

Show the first N lines of a file

Display the first N lines of a file (like Unix head).

```bash
hieudoanm file head [--file <path>]
```

#### Flags

| Flag      | Shorthand | Default | Description     |
| --------- | --------- | ------- | --------------- |
| `--file`  | `-f`      | ``      | File path       |
| `--lines` | `-n`      | `10`    | Number of lines |

Example:

```bash
  file head --file main.go
  file head -f main.go --lines 20
```

---

### `hieudoanm file read`

Read file content with line numbers

Read a file and display its content with optional line numbers, offset, and line limit.

```bash
hieudoanm file read [--file <path>]
```

#### Flags

| Flag        | Shorthand | Default | Description                       |
| ----------- | --------- | ------- | --------------------------------- |
| `--file`    | `-f`      | ``      | File path                         |
| `--lines`   | `-n`      | `0`     | Number of lines to show (0 = all) |
| `--offset`  | `-o`      | `0`     | Starting line offset (0-based)    |
| `--numbers` | ``        | `true`  | Show line numbers                 |

Example:

```bash
  file read --file main.go
  file read -f main.go --lines 50
  file read -f main.go --offset 10 --lines 20
  file read -f main.go --no-numbers
```

---

### `hieudoanm file size`

Show file or directory size

Display the size of a file or the total size of a directory (recursive).

```bash
hieudoanm file size [--path <file-or-dir>]
```

#### Flags

| Flag     | Shorthand | Default | Description            |
| -------- | --------- | ------- | ---------------------- |
| `--path` | `-p`      | ``      | File or directory path |

Example:

```bash
  file size --path main.go
  file size -p /path/to/directory
  file size -p . --json
```

---

### `hieudoanm file stats`

Show file statistics by extension

Walk a directory and produce statistics about files grouped by extension. Shows file count and total size per extension.

```bash
hieudoanm file stats [--dir <path>]
```

#### Flags

| Flag    | Shorthand | Default | Description    |
| ------- | --------- | ------- | -------------- |
| `--dir` | `-d`      | ``      | Directory path |

Example:

```bash
  file stats --dir .
  file stats -d /path/to/project
  file stats -d . --json
```

---

### `hieudoanm file tail`

Show the last N lines of a file

Display the last N lines of a file (like Unix tail). Uses a ring buffer to efficiently stream through the file.

```bash
hieudoanm file tail [--file <path>]
```

#### Flags

| Flag      | Shorthand | Default | Description     |
| --------- | --------- | ------- | --------------- |
| `--file`  | `-f`      | ``      | File path       |
| `--lines` | `-n`      | `10`    | Number of lines |

Example:

```bash
  file tail --file main.go
  file tail -f main.go --lines 20
```

---

### `hieudoanm file type`

Detect file type by extension

Detect a file's MIME type based on its extension and display file metadata (size, mode, modification time).

```bash
hieudoanm file type [--file <path>]
```

#### Flags

| Flag     | Shorthand | Default | Description |
| -------- | --------- | ------- | ----------- |
| `--file` | `-f`      | ``      | File path   |

Example:

```bash
  file type --file image.png
  file type -f document.pdf
```

---

### `hieudoanm file write`

Write or append content to a file

Write content to a file. Content can be provided via --content flag or piped via stdin.

```bash
hieudoanm file write [--file <path>] [--content <text>]
```

#### Flags

| Flag        | Shorthand | Default | Description                            |
| ----------- | --------- | ------- | -------------------------------------- |
| `--file`    | `-f`      | ``      | File path                              |
| `--content` | `-c`      | ``      | File content (omit to read from stdin) |
| `--append`  | `-a`      | `false` | Append to file instead of overwriting  |
| `--mkdir`   | `-p`      | `false` | Create parent directories if needed    |
| `--mode`    | `-m`      | ``      | File permissions (octal, e.g. 644)     |

Example:

```bash
  file write -f hello.txt -c "Hello, World!"
  file write --file hello.txt      (reads from stdin)
  file write -f log.txt -c "new log entry" --append
  file write -f newdir/file.txt --mkdir -c "content"
  echo "data" | file write -f output.txt
```

---

## `hieudoanm gemini`

Interact with Google Gemini AI models

Interact with Google Gemini AI models. Provides a TUI coding assistant with support for multiple Gemini models, chat history, and slash commands.

```bash
hieudoanm gemini
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  gemini code
```

---

### `hieudoanm gemini code`

Gemini-powered AI coding assistant

An interactive TUI coding assistant powered by Google Gemini.

Provides a chat interface with markdown rendering and code block support.

```bash
hieudoanm gemini code
```

Example:

```bash
  gemini code
```

---

## `hieudoanm gh`

GitHub CLI tools

GitHub CLI utilities for interacting with GitHub APIs.

```bash
hieudoanm gh
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  gh languages --repo hieudoanm/hieudoanm.github.io
  gh license
  gh coc
  gh ignore
  gh og --url hieudoanm/hieudoanm.github.io
```

---

### `hieudoanm gh coc`

Fetch a GitHub Code of Conduct

Fetch and save a GitHub Code of Conduct to a file.

Fetches the list of available codes of conduct from the GitHub API,
prompts the user to select one (or uses --key), then writes the body
to a file.

```bash
hieudoanm gh coc
```

#### Flags

| Flag       | Shorthand | Default           | Description                       |
| ---------- | --------- | ----------------- | --------------------------------- |
| `--key`    | ``        | ``                | Code of Conduct key (skip prompt) |
| `--output` | `-o`      | `CODE_OF_CONDUCT` | Output file path                  |

Example:

```bash
  gh coc
  gh coc --key citizen_code_of_conduct
  gh coc --key contributor_covenant -o COC.md
```

---

### `hieudoanm gh ignore`

Fetch a .gitignore template from GitHub

Fetch and save a .gitignore template from the GitHub gitignore API.

Fetches the list of available templates, prompts the user to select
one (or uses --name), then writes the template content to a file.

```bash
hieudoanm gh ignore
```

#### Flags

| Flag       | Shorthand | Default      | Description                           |
| ---------- | --------- | ------------ | ------------------------------------- |
| `--name`   | ``        | ``           | Gitignore template name (skip prompt) |
| `--output` | `-o`      | `.gitignore` | Output file path                      |

Example:

```bash
  gh ignore
  gh ignore --name Go
  gh ignore --name Python -o .gitignore
```

---

### `hieudoanm gh languages`

Show repository language breakdown and generate SVG bar chart

Fetches language statistics for a GitHub repository and generates
an SVG bar chart showing the breakdown.

```bash
hieudoanm gh languages [--repo <owner/repo>]
```

#### Flags

| Flag       | Shorthand | Default         | Description             |
| ---------- | --------- | --------------- | ----------------------- |
| `--repo`   | `-r`      | ``              | Repository (owner/repo) |
| `--output` | `-o`      | `languages.svg` | Output SVG file path    |

Example:

```bash
  gh languages --repo hieudoanm/hieudoanm.github.io
  gh languages --repo hieudoanm/hieudoanm --output lang.svg
```

---

### `hieudoanm gh license`

Fetch a license template from GitHub

Fetch and save a license template from the GitHub licenses API.

Fetches the list of available licenses, prompts the user to select
one (or uses --spdx-id), then writes the license body to a file.

```bash
hieudoanm gh license
```

#### Flags

| Flag        | Shorthand | Default   | Description                           |
| ----------- | --------- | --------- | ------------------------------------- |
| `--spdx-id` | ``        | ``        | SPDX license identifier (skip prompt) |
| `--output`  | `-o`      | `LICENSE` | Output file path                      |

Example:

```bash
  gh license
  gh license --spdx-id MIT
  gh license --spdx-id Apache-2.0 -o LICENSE.txt
```

---

### `hieudoanm gh og`

Generate an Open Graph SVG for a GitHub repository

Fetches repository metadata from GitHub and generates
a 1200×630 Open Graph SVG image (social preview card).

```bash
hieudoanm gh og [--url <owner/repo>]
```

#### Flags

| Flag       | Shorthand | Default  | Description             |
| ---------- | --------- | -------- | ----------------------- |
| `--url`    | `-u`      | ``       | Repository (owner/repo) |
| `--output` | `-o`      | `og.svg` | Output SVG file path    |

Example:

```bash
  gh og --url hieudoanm/hieudoanm.github.io
  gh og --url hieudoanm/hieudoanm --output preview.svg
```

---

## `hieudoanm image`

Image inspection and conversion tools

Get image metadata, convert between formats, and extract dominant colors.

```bash
hieudoanm image
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

Example:

```bash
  image info --file photo.jpg
  image convert --file photo.jpg --format png
  image dominant --file photo.jpg
```

---

### `hieudoanm image info`

Show image metadata (dimensions, format, etc.)

Display detailed metadata for an image file including dimensions (width/height), file format, file size on disk, and color model information.

```bash
hieudoanm image info [--file <file>]
```

#### Flags

| Flag     | Shorthand | Default | Description |
| -------- | --------- | ------- | ----------- |
| `--file` | `-f`      | ``      | Image file  |

Example:

```bash
  image info --file photo.jpg
  image info -f logo.png
  image info --file screenshot.png --json
```

---

### `hieudoanm image convert`

Convert image to another format

Convert an image file from one format to another. Supports PNG, JPEG/JPG, and GIF output formats.

```bash
hieudoanm image convert [--file <file>]
```

#### Flags

| Flag       | Shorthand | Default | Description                   |
| ---------- | --------- | ------- | ----------------------------- |
| `--file`   | `-i`      | ``      | Input image file              |
| `--format` | `-f`      | `png`   | Output format (png, jpg, gif) |
| `--output` | `-o`      | ``      | Output file path              |

Example:

```bash
  image convert --file photo.jpg --format png
  image convert --file photo.png --format jpg --output photo.jpg
```

---

### `hieudoanm image dominant`

Extract dominant color from an image

Analyze an image and extract its top 5 dominant colors by sampling pixels. Each color is returned as a hex code with its percentage of the sampled pixels.

```bash
hieudoanm image dominant [--file <file>]
```

#### Flags

| Flag     | Shorthand | Default | Description |
| -------- | --------- | ------- | ----------- |
| `--file` | `-f`      | ``      | Image file  |

Example:

```bash
  image dominant --file photo.jpg
  image dominant -f logo.png
  image dominant --file wallpaper.jpg --json
```

---

## `hieudoanm mcp`

MCP server exposing CLI tools to AI agents

Run an MCP (Model Context Protocol) server over stdio.

Exposes all hieudoanm CLI commands as MCP tools that AI agents can discover and call.
Each CLI command becomes a tool named with dot notation (e.g., file.read, search.files).

Protocol: JSON-RPC 2.0 over stdio (newline-delimited JSON)

```bash
hieudoanm mcp
```

Example:

```bash
  hieudoanm mcp serve
```

---

### `hieudoanm mcp serve`

Start the MCP server over stdio

Start the MCP stdio server. Reads JSON-RPC messages from stdin and writes responses to stdout.

```bash
hieudoanm mcp serve
```

---

## `hieudoanm net`

Network diagnostics and servers

IP geolocation, WiFi scanning, TLS certificates, HTTP serving, and cloud status.

```bash
hieudoanm net
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  net ip
  net ping --host google.com --port 443
  net whois --domain example.com
  net cert info --host google.com:443
```

---

### `hieudoanm net cert`

SSL/TLS certificate inspection

Inspect SSL/TLS certificates for domains: check expiry, issuer, SANs, and chain.

```bash
hieudoanm net cert
```

#### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

Example:

```bash
  net cert info --host google.com:443
  net cert check --host google.com:443
```

---

#### `hieudoanm net cert info`

Show detailed certificate information

Retrieve and display the full certificate chain for a TLS endpoint.

```bash
hieudoanm net cert info [--host <host:port>]
```

##### Flags

| Flag     | Shorthand | Default | Description          |
| -------- | --------- | ------- | -------------------- |
| `--host` | `-H`      | ``      | Host:port to inspect |

Example:

```bash
  cert info --host google.com:443
  cert info --host example.org:8443
```

---

#### `hieudoanm net cert check`

Quick certificate health check (expiry warning)

Quickly check the TLS certificate for a host and report whether it is valid, expiring soon, or expired. Returns remaining validity time and SAN entries.

```bash
hieudoanm net cert check [--host <host:port>]
```

##### Flags

| Flag     | Shorthand | Default | Description               |
| -------- | --------- | ------- | ------------------------- |
| `--host` | `-H`      | ``      | Host:port to check        |
| `--warn` | `-w`      | `30`    | Warning threshold in days |

Example:

```bash
  net cert check --host google.com:443
  cert check --host example.org --warn 30
```

---

### `hieudoanm net dns`

DNS record lookup

Look up DNS records (A, AAAA, CNAME, MX, NS, TXT) for a domain. Defaults to all record types.

```bash
hieudoanm net dns [--domain <domain>]
```

#### Flags

| Flag       | Shorthand | Default | Description                               |
| ---------- | --------- | ------- | ----------------------------------------- |
| `--domain` | `-d`      | ``      | Domain to look up                         |
| `--type`   | `-t`      | ``      | Record type (a, aaaa, cname, mx, ns, txt) |
| `--json`   | ``        | `false` | Output in JSON format                     |

Example:

```bash
  hieudoanm net dns --domain example.com
  hieudoanm net dns --domain example.com --type mx
  hieudoanm net dns --domain example.com --json
```

---

### `hieudoanm net ip`

Look up your public IP and geolocation

Look up your public IP address and geolocation information from multiple providers.

```bash
hieudoanm net ip
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--raw`  | `-r`      | `false` | Output raw JSON       |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  net ip
  net ip --json
  net ip --raw
```

---

### `hieudoanm net ping`

TCP ping to check host reachability

Test TCP connectivity to a host with timing statistics. Uses TCP dial (not ICMP).

```bash
hieudoanm net ping [--host <host>]
```

#### Flags

| Flag        | Shorthand | Default | Description           |
| ----------- | --------- | ------- | --------------------- |
| `--host`    | `-H`      | ``      | Host to ping          |
| `--port`    | `-p`      | `80`    | TCP port              |
| `--count`   | `-c`      | `4`     | Number of pings       |
| `--timeout` | `-t`      | ``      | Per-ping timeout      |
| `--json`    | ``        | `false` | Output in JSON format |

Example:

```bash
  net ping --host example.com
  net ping --host example.com --port 443
  net ping --host example.com --count 5
  net ping --host google.com --port 443 --count 3 --timeout 2s
```

---

### `hieudoanm net serve`

Start an HTTP file server

Serve static files over HTTP with optional CORS, directory listing, and TLS support.

```bash
hieudoanm net serve
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--port` | `-p`      | `8080`  | Port to listen on     |
| `--dir`  | `-d`      | `.`     | Directory to serve    |
| `--cors` | ``        | `false` | Enable CORS headers   |
| `--cert` | ``        | ``      | TLS certificate file  |
| `--key`  | ``        | ``      | TLS key file          |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  serve
  serve --port 9000 --dir ./public
  serve --port 443 --cert cert.pem --key key.pem
```

---

### `hieudoanm net status`

Check the uptime status of cloud services

Check and display the current operational status of various cloud services including Atlassian, GitHub, Vercel, and more via a Bubble Tea TUI.

```bash
hieudoanm net status
```

#### Flags

| Flag      | Shorthand | Default | Description           |
| --------- | --------- | ------- | --------------------- |
| `--debug` | `-d`      | `false` | Enable debug logging  |
| `--json`  | ``        | `false` | Output in JSON format |

Example:

```bash
  net status
  net status --json
```

---

### `hieudoanm net wifi`

List nearby Wi-Fi networks

Scan and list nearby Wi-Fi networks with signal strength and security information.

```bash
hieudoanm net wifi
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  net wifi
  net wifi --json
```

---

### `hieudoanm net http`

Make HTTP requests

Make HTTP GET, POST, PUT, DELETE requests to URLs.

```bash
hieudoanm net http [--url <url>]
```

#### Flags

| Flag       | Shorthand | Default | Description                          |
| ---------- | --------- | ------- | ------------------------------------ |
| `--url`    | `-u`      | ``      | URL to request                       |
| `--method` | `-X`      | `GET`   | HTTP method (GET, POST, PUT, DELETE) |
| `--data`   | `-d`      | ``      | Request body data                    |
| `--header` | `-H`      | ``      | Request headers (key:val,key2:val2)  |
| `--json`   | ``        | `false` | Pretty-print JSON response           |

Example:

```bash
  net http --url https://api.example.com/data
  net http --url https://api.example.com --method POST --data '{"key":"value"}'
  net http --url https://api.example.com/resource/1 --method DELETE
  net http --url https://api.example.com --header "Authorization: Bearer token
```

---

### `hieudoanm net whois`

WHOIS lookup for a domain

Query WHOIS servers for domain registration information.

```bash
hieudoanm net whois [--domain <domain>]
```

#### Flags

| Flag       | Shorthand | Default | Description           |
| ---------- | --------- | ------- | --------------------- |
| `--domain` | `-d`      | ``      | Domain to look up     |
| `--server` | `-s`      | ``      | WHOIS server to query |

Example:

```bash
  net whois --domain example.com
  net whois --domain google.com
  net whois --domain example.com --server whois.verisign-grs.com
```

---

## `hieudoanm openapi`

OpenAPI related tools

Tools for interacting with and managing OpenAPI specifications.

```bash
hieudoanm openapi
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  openapi validate -f spec.yaml
  openapi openapi2postman -i spec.yaml
```

---

### `hieudoanm openapi openapi2postman`

Convert OpenAPI to Postman collection

Convert an OpenAPI specification (JSON or YAML) to a Postman v2.1 collection. Generates folders by tag, auto-generates example bodies from schemas, and preserves query/path/header parameters.

```bash
hieudoanm openapi openapi2postman
```

#### Flags

| Flag       | Shorthand | Default | Description              |
| ---------- | --------- | ------- | ------------------------ |
| `--input`  | `-i`      | ``      | OpenAPI file (json/yaml) |
| `--output` | `-o`      | ``      | Output Postman file      |

Example:

```bash
  openapi openapi2postman -i spec.yaml
  openapi openapi2postman -i spec.yaml -o collection.json
  openapi openapi2postman -i petstore.yaml
```

---

### `hieudoanm openapi validate`

Validate an OpenAPI specification

Parse and validate an OpenAPI specification file (JSON or YAML). Checks for required fields (openapi, info, paths), valid operation methods, operationId uniqueness, and response definitions.

```bash
hieudoanm openapi validate [--file <file>]
```

#### Flags

| Flag     | Shorthand | Default | Description       |
| -------- | --------- | ------- | ----------------- |
| `--file` | `-f`      | ``      | OpenAPI spec file |

Example:

```bash
  openapi validate -f spec.yaml
  openapi validate -f openapi.json
  openapi validate -f petstore-v3.yaml --json
```

---

## `hieudoanm openrouter`

Interact with OpenRouter AI models and services

Interact with OpenRouter AI models: serve a local API proxy, probe model availability, list free models, and run an AI coding assistant TUI.

```bash
hieudoanm openrouter
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  openrouter serve
  openrouter status
  openrouter models
  openrouter code
```

---

### `hieudoanm openrouter serve`

Start the OpenRouter HTTP server

Starts a lightweight Go HTTP server that exposes:
GET / — health check
POST /chat — forward {prompt, model} to OpenRouter and return the response

```bash
hieudoanm openrouter serve
```

#### Flags

| Flag     | Shorthand | Default | Description       |
| -------- | --------- | ------- | ----------------- |
| `--port` | `-p`      | `8080`  | Port to listen on |

Example:

```bash
  openrouter serve
  openrouter serve -p 8080
```

---

### `hieudoanm openrouter status`

Probe free models for availability and latency

Probe free OpenRouter models in parallel to check which are currently available, rate-limited, restricted, or erroring. Reports latency for available models and sorts results by status.

```bash
hieudoanm openrouter status
```

#### Flags

| Flag        | Shorthand | Default | Description                                |
| ----------- | --------- | ------- | ------------------------------------------ |
| `--search`  | `-s`      | ``      | Filter models by name or ID before probing |
| `--workers` | `-w`      | `6`     | Parallel probe workers                     |

Example:

```bash
  openrouter status
  openrouter status --search gemma
  openrouter status --workers 10
```

---

### `hieudoanm openrouter models`

List available free models from OpenRouter

Fetch and display all free models available on OpenRouter. Models can be filtered by name or ID with --search, and grouped by provider for easy browsing.

```bash
hieudoanm openrouter models
```

#### Flags

| Flag       | Shorthand | Default | Description                 |
| ---------- | --------- | ------- | --------------------------- |
| `--search` | `-s`      | ``      | Filter models by name or ID |
| `--json`   | ``        | `false` | Output raw JSON             |

Example:

```bash
  openrouter models
  openrouter models --search gemma
  openrouter models --json
```

---

### `hieudoanm openrouter hook`

Start webhook server on :8080 and expose via ngrok and hook it to telegram

Start a webhook server on port 8080, expose it via ngrok, and register with Telegram. Routes incoming Telegram messages through OpenRouter AI and sends replies back. Requires TELEGRAM_API_TOKEN and OPEN_ROUTER_API_KEY env vars.

```bash
hieudoanm openrouter hook
```

Example:

```bash
  openrouter hook
```

---

### `hieudoanm openrouter code`

AI coding assistant with file editing and bash access

An interactive TUI coding assistant powered by OpenRouter.

Supports reading, writing, and editing files, as well as running bash commands.
All tool calls require your approval before execution.

```bash
hieudoanm openrouter code
```

#### Flags

| Flag      | Shorthand | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `--model` | ``        | ``      | Model ID (default: auto-select tool-capable model) |

Example:

```bash
  openrouter code
  openrouter code --model google/gemma-4-26b-a4b-it:free
```

---

## `hieudoanm port`

Network port checking tools

Check if ports are open, find available ports, and scan common ports.

```bash
hieudoanm port
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

Example:

```bash
  port check --target localhost:8080
  port find --start 3000 --end 3010
  port scan --host localhost
```

---

### `hieudoanm port check`

Check if a port is open

Check whether a specific TCP port is open on a given host. Supports configurable connection timeout.

```bash
hieudoanm port check [--target <host:port>]
```

#### Flags

| Flag        | Shorthand | Default | Description                   |
| ----------- | --------- | ------- | ----------------------------- |
| `--target`  | `-T`      | ``      | Host:port to check            |
| `--timeout` | `-t`      | `3`     | Connection timeout in seconds |

Example:

```bash
  port check --target localhost:8080
  port check --target google.com:443
  port check --target 192.168.1.1:22 --timeout 5
```

---

### `hieudoanm port find`

Find an available port in a range

Find the first available TCP port within a given range. Useful for finding a free port for local development servers.

```bash
hieudoanm port find
```

#### Flags

| Flag      | Shorthand | Default | Description         |
| --------- | --------- | ------- | ------------------- |
| `--start` | `-s`      | `8000`  | Start of port range |
| `--end`   | `-e`      | `9000`  | End of port range   |

Example:

```bash
  port find
  port find --start 3000 --end 3010
```

---

### `hieudoanm port scan`

Scan common ports on a host

Scan a host for open ports. Defaults to the common ports list.

```bash
hieudoanm port scan [--host <host>]
```

#### Flags

| Flag        | Shorthand | Default | Description                             |
| ----------- | --------- | ------- | --------------------------------------- |
| `--host`    | `-H`      | ``      | Host to scan                            |
| `--ports`   | ``        | ``      | Port list (e.g. 22,80,443 or 8000-8100) |
| `--timeout` | `-t`      | `2`     | Per-port timeout in seconds             |

Example:

```bash
  port scan --host localhost
  port scan --host google.com --ports 22,80,443
  port scan --host localhost --ports 8000-8100
```

---

## `hieudoanm search`

Universal search for files, text, code, and the web

Search for files by name, text inside files, code symbols, and web content.

Search is the universal entry point for finding things:
search files - find files by glob pattern
search text - search file contents by regex
search code - find code symbols (functions, types, etc.)
search web - search the internet

```bash
hieudoanm search
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | ``        | `false` | Output in JSON format |

Example:

```bash
  search files --pattern "*.go"
  search text --pattern "TODO" --path .
  search code --symbol "NewCommand"
  search web --query "golang concurrency patterns
```

---

### `hieudoanm search files`

Find files by glob pattern

Find files matching a glob pattern starting from an optional root directory.

Patterns use glob syntax:
_.go - all Go files
\*\*/_.ts - TypeScript files in any subdirectory
src/\*_/_.ts - TypeScript files under src/
test*\*.py - files matching test* prefix with .py extension

```bash
hieudoanm search files [--pattern <pattern>] [--dir <dir>]
```

#### Flags

| Flag          | Shorthand | Default | Description                               |
| ------------- | --------- | ------- | ----------------------------------------- |
| `--pattern`   | `-p`      | ``      | Glob pattern to match                     |
| `--dir`       | `-d`      | `.`     | Root directory to search                  |
| `--max-depth` | `-D`      | `0`     | Maximum directory depth (0 = unlimited)   |
| `--type`      | `-t`      | ``      | Filter by type: f (file) or d (directory) |
| `--hidden`    | `-H`      | `false` | Include hidden files and directories      |

Example:

```bash
  search files --pattern "*.go"
  search files --pattern "*.ts" --dir src/
  search files --pattern "**/*.md" --dir docs/
  search files --pattern "*.py" --type f
  search files --pattern "config.*" --hidden
```

---

### `hieudoanm search text`

Search file contents using regex

Search for a regex pattern inside files. If a directory is given, searches recursively.

```bash
hieudoanm search text [--pattern <pattern>] [--path <path>]
```

#### Flags

| Flag            | Shorthand | Default | Description                                  |
| --------------- | --------- | ------- | -------------------------------------------- |
| `--pattern`     | `-p`      | ``      | Regex pattern to search                      |
| `--path`        | `-P`      | `.`     | File or directory to search                  |
| `--ignore-case` | `-i`      | `false` | Case-insensitive search                      |
| `--max-count`   | `-m`      | `0`     | Maximum number of matches                    |
| `--include`     | ``        | ``      | Glob pattern for file names (e.g. \"\*.go\") |
| `--max-depth`   | `-d`      | `0`     | Maximum directory depth (0 = unlimited)      |

Example:

```bash
  search text --pattern "TODO" --path .
  search text --pattern "func.*error" --include "*.go"
  search text --pattern "import" --path src/ --ignore-case
  search text --pattern "panic" --max-count 5
```

---

### `hieudoanm search code`

Search for code symbols (functions, types, variables)

Find code symbol definitions matching a name pattern.

Supports Go, TypeScript/JavaScript, Python, and Rust.

```bash
hieudoanm search code [--symbol <symbol>] [--dir <dir>]
```

#### Flags

| Flag            | Shorthand | Default | Description                                           |
| --------------- | --------- | ------- | ----------------------------------------------------- |
| `--symbol`      | `-s`      | ``      | Symbol name to search                                 |
| `--dir`         | `-d`      | `.`     | Root directory to search                              |
| `--lang`        | `-l`      | ``      | Language filter (go, ts, py, rs)                      |
| `--kind`        | `-k`      | ``      | Symbol kind (function, type, variable, method, class) |
| `--max-results` | `-n`      | `0`     | Maximum number of results (0 = unlimited)             |

Example:

```bash
  search code --symbol "ParseCard"
  search code --symbol "handle" --dir src/
  search code --symbol "NewCommand" --lang go
  search code --symbol "getUser" --kind function
  search code --symbol "fetchAPI" --lang ts
```

---

### `hieudoanm search web`

Search the internet

Search the web for a query. Uses DuckDuckGo by default (no API key needed).

```bash
hieudoanm search web [--query <query>]
```

#### Flags

| Flag            | Shorthand | Default      | Description                |
| --------------- | --------- | ------------ | -------------------------- |
| `--query`       | `-q`      | ``           | Search query               |
| `--max-results` | `-n`      | `5`          | Maximum number of results  |
| `--source`      | `-s`      | `duckduckgo` | Search source (duckduckgo) |

Example:

```bash
  search web --query "golang concurrency patterns"
  search web --query "latest AI news 2026" --max-results 10
  search web --query "site:github.com golang cli" --source google
```

---

## `hieudoanm semver`

Parse, compare, sort, and bump semver strings

Tools for working with semantic version strings (major.minor.patch).

```bash
hieudoanm semver <command> [flags]
```

### Flags

| Flag                  | Shorthand | Default | Description                                              |
| --------------------- | --------- | ------- | -------------------------------------------------------- |
| `--bump`              | ``        | ``      | Bump version part: major, minor, patch                   |
| `--prerelease`        | ``        | ``      | Set prerelease label after bump                          |
| `--range`             | ``        | ``      | Check if version matches a range (e.g. '>=1.0.0 <2.0.0') |
| `--version`           | ``        | ``      | Single version for --bump or --range                     |
| `--json (persistent)` | ``        | `false` | Output in JSON format                                    |

Example:

```bash
  semver validate --versions 1.2.3
  semver compare --a 1.0.0 --b 2.0.0
  semver sort --versions 1.2.0,2.0.0,1.10.0
  semver --bump minor --version 1.2.3
  semver --bump patch --prerelease alpha --version 1.2.3
  semver --range ">=1.0.0 <2.0.0" --version 1.5.0
```

---

### `hieudoanm semver <command> [flags] validate`

Validate one or more semver strings

Validate whether one or more comma-separated strings conform to semantic versioning (major.minor.patch, optionally with "v" prefix).

```bash
hieudoanm semver <command> [flags] validate [--versions <v1,v2,...>]
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  semver validate --versions 1.2.3
  semver validate --versions 1.2.3,2.0.0,abc
  semver validate --versions v1.0.0
```

---

### `hieudoanm semver <command> [flags] compare`

Compare two semver strings

Compare two semantic versions and output their relationship (less than, greater than, or equal). Versions may be prefixed with "v".

```bash
hieudoanm semver <command> [flags] compare --a <version> --b <version>
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--a`    | ``        | ``      | First version         |
| `--b`    | ``        | ``      | Second version        |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  semver compare --a 1.0.0 --b 2.0.0
  semver compare --a v1.2.3 --b v1.2.3
```

---

### `hieudoanm semver <command> [flags] sort`

Sort one or more semver strings

Sort a list of comma-separated semantic version strings in ascending order. Versions may be prefixed with "v".

```bash
hieudoanm semver <command> [flags] sort [--versions <v1,v2,...>]
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  semver sort --versions 1.2.0,2.0.0,1.10.0
  semver sort --versions v3.0.0,v1.0.0,v2.0.0
```

---

## `hieudoanm system`

System utilities

System monitoring and clipboard management.

```bash
hieudoanm system
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  system monitor
  system info
  system disk
  system battery
  system env PATH
  system path go
```

---

### `hieudoanm system monitor`

Monitor system resources in real-time

Display real-time CPU, memory, and process information in a Bubble Tea TUI, or output a one-shot JSON snapshot with --json.

```bash
hieudoanm system monitor
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  system monitor
  system monitor --json
```

---

### `hieudoanm system clipboard`

Watch clipboard changes and store them in SQLite

Monitors the system clipboard for changes and saves each unique entry to a local SQLite database.

```bash
hieudoanm system clipboard
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  system clipboard
```

---

### `hieudoanm system info`

Show system information

Display OS, architecture, CPU count, uptime, and memory.

```bash
hieudoanm system info
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  system info
  system info --json
```

---

### `hieudoanm system env`

List or search environment variables

Display all environment variables, or filter by key prefix.

```bash
hieudoanm system env [key]
```

#### Flags

| Flag     | Shorthand | Default | Description                |
| -------- | --------- | ------- | -------------------------- |
| `--sort` | ``        | `false` | Sort alphabetically by key |
| `--json` | ``        | `false` | Output in JSON format      |

Example:

```bash
  system env
  system env PATH
  system env HOME
  system env --sort
  system env --json
```

---

### `hieudoanm system path`

List or search PATH directories and commands

Show all directories in PATH, or find which path a command resolves to.

With no arguments, lists all PATH entries.
With a command name, shows which executable would be found first.

```bash
hieudoanm system path [command]
```

#### Flags

| Flag     | Shorthand | Default | Description                 |
| -------- | --------- | ------- | --------------------------- |
| `--sort` | ``        | `false` | Sort alphabetically by path |
| `--json` | ``        | `false` | Output in JSON format       |

Example:

```bash
  system path
  system path go
  system path --sort
  system path --json
```

---

### `hieudoanm system disk`

Show disk usage for mounted filesystems

Display disk capacity, used space, available space, and mount points (like df -h).

```bash
hieudoanm system disk
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  system disk
  system disk --json
```

---

### `hieudoanm system battery`

Show battery status

Display battery percentage, charging state, and time remaining.

```bash
hieudoanm system battery
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  system battery
  system battery --json
```

---

## `hieudoanm telegram`

Telegram bot and message tools

Tools for interacting with the Telegram Bot API: send messages and manage webhooks.

```bash
hieudoanm telegram
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  telegram message send
  telegram webhook set
  telegram webhook info
  telegram webhook delete
```

---

### `hieudoanm telegram message`

Send Telegram messages

Send messages via the Telegram Bot API.

```bash
hieudoanm telegram message
```

Example:

```bash
  telegram message send
```

---

#### `hieudoanm telegram message send`

Send a Telegram message

Prompt for a Telegram Bot API token, chat ID, and message text, then send the message via the Telegram Bot API.

```bash
hieudoanm telegram message send
```

Example:

```bash
  telegram message send
```

---

### `hieudoanm telegram webhook`

Manage Telegram webhooks

Manage Telegram Bot webhooks: set, check info, or delete.

```bash
hieudoanm telegram webhook
```

Example:

```bash
  telegram webhook set
  telegram webhook info
  telegram webhook delete
```

---

#### `hieudoanm telegram webhook delete`

Delete the Telegram webhook

Prompt for a Telegram Bot API token and delete the currently registered webhook.

```bash
hieudoanm telegram webhook delete
```

Example:

```bash
  telegram webhook delete
```

---

#### `hieudoanm telegram webhook info`

Get current webhook info

Prompt for a Telegram Bot API token and fetch the current webhook configuration.

```bash
hieudoanm telegram webhook info
```

Example:

```bash
  telegram webhook info
```

---

#### `hieudoanm telegram webhook set`

Set a Telegram webhook URL

Prompt for a Telegram Bot API token and webhook URL, then register the webhook with Telegram.

```bash
hieudoanm telegram webhook set
```

Example:

```bash
  telegram webhook set
```

---

## `hieudoanm version`

Print the application version

Print the version number of the application.

```bash
hieudoanm version
```

### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  version
  version --json
```

---

## `hieudoanm web`

Web service tools

Interact with web services: download Instagram content, detect Shopify sites, capture page snapshots, fetch weather, and retrieve YouTube transcripts.

```bash
hieudoanm web
```

### Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

Example:

```bash
  web weather London
  web snapshot --url https://example.com
  web youtube fetch --url dQw4w9WgXcQ
  web instagram download --url CLI7qRNhI_o
```

---

### `hieudoanm web instagram`

Instagram related tools

Instagram related tools like downloading images and reels.

```bash
hieudoanm web instagram
```

Example:

```bash
  web instagram download --url CLI7qRNhI_o
```

---

#### `hieudoanm web instagram download`

Download images from Instagram

Download images from an Instagram post, reel, or video.
Supports carousels and specific image selection via --index.

```bash
hieudoanm web instagram download [--url <url>]
```

##### Flags

| Flag       | Shorthand | Default | Description                                |
| ---------- | --------- | ------- | ------------------------------------------ |
| `--url`    | `-u`      | ``      | Instagram post URL or shortcode            |
| `--output` | `-o`      | `.`     | Output directory                           |
| `--index`  | `-i`      | `0`     | Specific image index to download (1-based) |
| `--proxy`  | `-p`      | `false` | Use proxy to fetch content                 |
| `--json`   | ``        | `false` | Output in JSON format                      |

Example:

```bash
  web instagram download --url https://www.instagram.com/p/CLI7qRNhI_o/
  web instagram download --url CLI7qRNhI_o --index 1
  web instagram download --url CLI7qRNhI_o --output ./downloads --json
```

---

### `hieudoanm web shopify`

Shopify detection and analysis tools

Detect whether a website is built with Shopify and identify Shopify Plus stores.

```bash
hieudoanm web shopify
```

Example:

```bash
  web shopify detect example.com
```

---

#### `hieudoanm web shopify detect`

Detect if a website is using Shopify

Check a website URL for Shopify indicators including CDN references, script patterns, storefront API, and Shopify Plus headers.

```bash
hieudoanm web shopify detect [url]
```

##### Flags

| Flag        | Shorthand | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| `--verbose` | `-v`      | `false` | Show detection signals |
| `--json`    | ``        | `false` | Output in JSON format  |

Example:

```bash
  web shopify detect example.com
  web shopify detect https://shop.example.com --verbose
```

---

### `hieudoanm web simplify`

Extract and convert web content

Extract tables to CSV or webpage content to Markdown.

```bash
hieudoanm web simplify
```

Example:

```bash
  web simplify csv --url https://en.wikipedia.org/wiki/List_of_countries_by_population
  web simplify md --url https://en.wikipedia.org/wiki/Go_(programming_language)
```

---

#### `hieudoanm web simplify csv`

Extract HTML tables to CSV

Fetch a webpage, detect all <table> elements, and save each table as a CSV file.

If the page contains a single table it is saved as <domain>.csv.
Multiple tables produce individual <domain>-table-<N>.csv files.

```bash
hieudoanm web simplify csv --url <url>
```

##### Flags

| Flag    | Shorthand | Default | Description                  |
| ------- | --------- | ------- | ---------------------------- |
| `--url` | `-u`      | ``      | URL to fetch                 |
| `--out` | `-o`      | ``      | Output directory (default .) |

Example:

```bash
  web simplify csv --url https://en.wikipedia.org/wiki/List_of_countries_by_population
  web simplify csv --url https://example.com/data --out ./output
```

---

#### `hieudoanm web simplify md`

Convert webpage to markdown

Fetch a webpage, extract its readable content (reader view), and save it as a markdown file.

If reader view is not available the raw page is converted instead.

```bash
hieudoanm web simplify md --url <url>
```

##### Flags

| Flag    | Shorthand | Default | Description                  |
| ------- | --------- | ------- | ---------------------------- |
| `--url` | `-u`      | ``      | URL to fetch                 |
| `--out` | `-o`      | ``      | Output directory (default .) |

Example:

```bash
  web simplify md --url https://en.wikipedia.org/wiki/Go_(programming_language)
  web simplify md --url https://example.com/article --out ./output
```

---

### `hieudoanm web snapshot`

Take a screenshot of a web page

Take a full or viewport screenshot of a given URL.
The output file is saved as PNG (default) or PDF.
If --output is a directory, the filename is derived from the URL hostname + timestamp.

```bash
hieudoanm web snapshot [--url <url>]
```

#### Flags

| Flag          | Shorthand | Default   | Description                            |
| ------------- | --------- | --------- | -------------------------------------- | ------ | ------ | ------ | --- | --- |
| `--url`       | `-u`      | ``        | URL to capture                         |
| `--output`    | `-o`      | ``        | Output file or directory               |
| `--width`     | ``        | `0`       | Viewport width (overrides --preset)    |
| `--height`    | ``        | `0`       | Viewport height (overrides --preset)   |
| `--preset`    | ``        | `desktop` | Viewport preset: desktop               | laptop | tablet | mobile | hd  | 4k  |
| `--full-page` | ``        | `false`   | Capture full scrollable page           |
| `--delay`     | ``        | `0`       | Wait before capturing (e.g. 500ms, 2s) |
| `--pdf`       | ``        | `false`   | Save as PDF instead of PNG             |
| `--quality`   | ``        | `90`      | Screenshot quality 1-100 (JPEG only)   |
| `--verbose`   | `-v`      | `false`   | Print extra info                       |
| `--json`      | ``        | `false`   | Output in JSON format                  |

Example:

```bash
  web snapshot --url https://example.com
  web snapshot --url https://example.com --full-page
  web snapshot --url https://example.com --pdf
  web snapshot --url https://example.com --preset mobile
  web snapshot --url https://example.com --delay 2s
```

---

### `hieudoanm web weather`

Check current weather for a city

Get current weather conditions using wttr.in (free, no API key needed).

```bash
hieudoanm web weather [city]
```

#### Flags

| Flag         | Shorthand | Default  | Description                 |
| ------------ | --------- | -------- | --------------------------- |
| `--forecast` | `-f`      | `false`  | Show 3-day forecast         |
| `--json`     | `-j`      | `false`  | Output in JSON format       |
| `--units`    | `-u`      | `metric` | Units: metric, imperial, uk |

Example:

```bash
  weather London
  weather "Ho Chi Minh City"
  weather --forecast Tokyo
  weather --json London
  weather --units us "New York
```

---

### `hieudoanm web youtube`

YouTube transcript and thumbnail tools

Fetch YouTube video transcripts and download thumbnails in various qualities.

```bash
hieudoanm web youtube
```

Example:

```bash
  web youtube fetch --url dQw4w9WgXcQ
  web youtube thumbnails --url dQw4w9WgXcQ
```

---

#### `hieudoanm web youtube thumbnails`

Download YouTube video thumbnails

Download all available thumbnail qualities for a YouTube video.

Accepts any of:

- Full URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
- Short URL: https://youtu.be/dQw4w9WgXcQ
- Embed URL: https://www.youtube.com/embed/dQw4w9WgXcQ
- Shorts URL: https://www.youtube.com/shorts/dQw4w9WgXcQ
- Raw ID: dQw4w9WgXcQ

```bash
hieudoanm web youtube thumbnails [--url <video-url-or-id>]
```

##### Flags

| Flag        | Shorthand | Default | Description                             |
| ----------- | --------- | ------- | --------------------------------------- |
| `--url`     | `-u`      | ``      | Video URL or ID                         |
| `--quality` | `-q`      | ``      |                                         |
| `--output`  | `-o`      | `.`     | output directory                        |
| `--all`     | `-a`      | `false` | download all quality variants           |
| `--list`    | `-l`      | `false` | list thumbnail URLs without downloading |
| `--json`    | ``        | `false` | Output in JSON format (with --list)     |

Example:

```bash
  web youtube thumbnails --url dQw4w9WgXcQ
  web youtube thumbnails --url dQw4w9WgXcQ --quality hqdefault
  web youtube thumbnails --url dQw4w9WgXcQ --output ./thumbs
  web youtube thumbnails --url dQw4w9WgXcQ --all
```

---

#### `hieudoanm web youtube fetch`

Fetch YouTube video transcript

Fetch the transcript/captions for a YouTube video by URL or video ID. Supports language selection and multiple output formats.

```bash
hieudoanm web youtube fetch [--url <video-id-or-url>]
```

##### Flags

| Flag              | Shorthand | Default | Description                      |
| ----------------- | --------- | ------- | -------------------------------- |
| `--url`           | `-u`      | ``      | Video URL or ID                  |
| `--lang`          | `-l`      | `en`    | Language code (e.g. en, es, fr)  |
| `--output`        | `-o`      | ``      | Save to file instead of stdout   |
| `--format`        | `-f`      | `text`  | Output format: text or json      |
| `--no-timestamps` | ``        | `false` | Omit timestamps from text output |

Example:

```bash
  web youtube fetch --url dQw4w9WgXcQ
  web youtube fetch --url dQw4w9WgXcQ --lang es
  web youtube fetch --url dQw4w9WgXcQ --format json
  web youtube fetch --url dQw4w9WgXcQ --no-timestamps
```

---
