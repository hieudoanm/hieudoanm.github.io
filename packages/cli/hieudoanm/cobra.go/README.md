# `time`

Time and scheduling tools

Current time, pomodoro timer, countdown timer, epoch conversion, and cron expression utilities.

## Flags

| Flag                  | Shorthand | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `--json (persistent)` | `-j`      | `false` | Output in JSON format |

---

## Table of Contents

- [`time`](#time)
  - [Flags](#flags)
  - [Table of Contents](#table-of-contents)
  - [`time clock`](#time-clock)
    - [`time clock now`](#time-clock-now)
      - [Flags](#flags-1)
  - [`time cron`](#time-cron)
    - [Flags](#flags-2)
  - [`time epoch`](#time-epoch)
    - [Flags](#flags-3)
  - [`time pomodoro`](#time-pomodoro)
    - [Flags](#flags-4)
  - [`time timer`](#time-timer)
    - [Flags](#flags-5)
  - [`time until`](#time-until)
    - [Flags](#flags-6)
  - [`time world`](#time-world)
  - [`time age`](#time-age)
    - [Flags](#flags-7)
  - [`time stopwatch`](#time-stopwatch)
    - [Flags](#flags-8)

## `time clock`

Clock and timer utilities

Clock and timer utilities including current time display.

```bash
time clock
```

Example:

```bash
  time clock now
```

---

### `time clock now`

Display the current date and time

Display the current date, time, and timezone in a formatted output.

```bash
time clock now
```

#### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  time clock now
  time clock now --json
```

---

## `time cron`

Describe a cron expression in plain English and compute next runs

Parse a 5-field cron expression, describe when it runs, and compute upcoming occurrences.

```bash
time cron [--expression <expression>]
```

### Flags

| Flag           | Shorthand | Default | Description                            |
| -------------- | --------- | ------- | -------------------------------------- |
| `--expression` | `-e`      | ``      | Cron expression                        |
| `--next`       | `-n`      | `0`     | Show next N run times                  |
| `--until`      | ``        | ``      | Show runs until this date (YYYY-MM-DD) |
| `--json`       | ``        | `false` | Output in JSON format                  |

Example:

```bash
  cron --expression "*/15 * * * *"
  cron --expression "0 9 * * 1-5"
  cron --expression "0 0 1 1 *"
  cron --next 5 --expression "*/30 * * * *"
  cron --next 10 --until "2026-12-31" --expression "0 0 * * *
```

---

## `time epoch`

Convert between epoch timestamps and human-readable dates

Convert Unix epoch timestamps to human-readable dates and vice versa.

```bash
time epoch [timestamp]
```

### Flags

| Flag         | Shorthand | Default | Description                                             |
| ------------ | --------- | ------- | ------------------------------------------------------- |
| `--from`     | `-f`      | ``      | Convert a date string to epoch                          |
| `--relative` | ``        | ``      | Calculate relative time (e.g. '2 hours ago', '+3 days') |
| `--format`   | ``        | ``      | Output format for date (Go time layout)                 |
| `--iso`      | ``        | `false` | Output in ISO 8601 format                               |
| `--unix`     | ``        | `false` | Output as Unix timestamp                                |
| `--json`     | ``        | `false` | Output as JSON                                          |

Example:

```bash
  epoch 1718100000
  epoch --from "2024-06-11"
  epoch --from "2024-06-11T15:04:05Z"
  epoch --relative "2 hours ago"
  epoch --relative "+3 days"
  epoch --iso
```

---

## `time pomodoro`

Start a Pomodoro timer TUI session

Launch a Bubble Tea TUI Pomodoro timer with configurable work and break durations. Press p to pause/resume, s to stop, q to quit.

```bash
time pomodoro
```

### Flags

| Flag     | Shorthand | Default | Description          |
| -------- | --------- | ------- | -------------------- |
| `--work` | `-w`      | `25`    | work session minutes |
| `--rest` | `-r`      | `5`     | rest session minutes |

Example:

```bash
  time pomodoro
  time pomodoro --work 25 --rest 5
```

---

## `time timer`

Simple countdown timer

Set a countdown timer. Supports seconds (30s) and minutes (5m).

Press Ctrl+C to cancel.

```bash
time timer [--duration <duration>]
```

### Flags

| Flag         | Shorthand | Default | Description             |
| ------------ | --------- | ------- | ----------------------- |
| `--duration` | `-d`      | ``      | Duration (e.g. 30s, 5m) |
| `--json`     | ``        | `false` | Output in JSON format   |

Example:

```bash
  timer --duration 30s
  timer --duration 5m
  timer --duration 90
```

---

## `time until`

Countdown to a specific date/time

Show the time remaining until a given datetime.

Accepts formats: RFC3339 (2026-12-25T00:00:00Z), ISO date (2026-12-25),
date and time (2026-12-25 15:04:05), or a Unix timestamp in seconds.

```bash
time until [--time <datetime>]
```

### Flags

| Flag     | Shorthand | Default | Description     |
| -------- | --------- | ------- | --------------- |
| `--time` | `-t`      | ``      | Target datetime |

Example:

```bash
  hieudoanm time until --time 2026-12-25
  hieudoanm time until --time "2026-12-25 15:04:05"
  hieudoanm time until --time 2026-12-25T00:00:00Z
```

---

## `time world`

Display current time in multiple timezones

Show the current time in one or more timezones.

Common shorthand names: utc, ny, london, tokyo, hcmc, sf, paris, etc.
Accepts any valid IANA timezone name, or a UTC offset like "UTC+5:30", "UTC-8".

```bash
time world [zone1 zone2 ...]
```

Example:

```bash
  hieudoanm time world
  hieudoanm time world ny london tokyo hcmc
  hieudoanm time world UTC UTC+5:30
```

---

## `time age`

Calculate age from a birthdate

Calculate someone's age in years, months, and days from their birthdate.

Accepts formats: YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, RFC3339.

```bash
time age [--date <birthdate>]
```

### Flags

| Flag     | Shorthand | Default | Description            |
| -------- | --------- | ------- | ---------------------- |
| `--date` | `-d`      | ``      | Birthdate (YYYY-MM-DD) |
| `--json` | ``        | `false` | Output in JSON format  |

Example:

```bash
  time age --date 1990-01-15
  time age --date 1990-01-15 --json
```

---

## `time stopwatch`

Measure elapsed time like a stopwatch

Starts a stopwatch that runs until interrupted (Ctrl+C),
then displays the elapsed time.

```bash
time stopwatch
```

### Flags

| Flag     | Shorthand | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `--json` | ``        | `false` | Output in JSON format |

Example:

```bash
  time stopwatch
  time stopwatch --json
```

---
