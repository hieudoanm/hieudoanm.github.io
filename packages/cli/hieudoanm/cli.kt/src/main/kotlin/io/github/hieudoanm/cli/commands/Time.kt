package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import java.time.*
import java.time.format.DateTimeFormatter
import kotlin.system.exitProcess

class TimeCommand : CliktCommand(name = "time", help = "Time and scheduling tools") {
    init {
        subcommands(
            TimeAge(), TimeClock(), TimeCron(), TimeEpoch(), TimePomodoro(),
            TimeStopwatch(), TimeTimer(), TimeUntil(), TimeWorld()
        )
    }
    override fun run() = Unit
}

class TimeAge : CliktCommand(name = "age", help = "Calculate age from a birthdate") {
    private val date by option("--date", "-d", help = "Birthdate (YYYY-MM-DD)").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val birth = LocalDate.parse(date)
        val now = LocalDate.now()
        if (birth.isAfter(now)) {
            echo("birthdate cannot be in the future")
            return
        }
        var years = Period.between(birth, now).years
        var months = Period.between(birth, now).months
        var days = Period.between(birth, now).days

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("birthdate" to date, "years" to years, "months" to months, "days" to days)))
        } else {
            echo("$years years, $months months, $days days")
        }
    }
}

class TimeClock : CliktCommand(name = "clock", help = "Clock and timer utilities") {
    init { subcommands(TimeClockNow()) }
    override fun run() = Unit
}

class TimeClockNow : CliktCommand(name = "now", help = "Display the current date and time") {
    private val format by option("--format", help = "Output format pattern").default("")
    private val timezone by option("--timezone", "-z", help = "Timezone (e.g. UTC, Asia/Tokyo)").default("")
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val zoneId = if (timezone.isNotEmpty()) ZoneId.of(timezone) else ZoneId.systemDefault()
        val zdt = ZonedDateTime.now(zoneId)
        val pattern = if (format.isNotEmpty()) format else "yyyy-MM-dd HH:mm:ss z"
        val formatter = DateTimeFormatter.ofPattern(pattern)

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf(
                "date" to zdt.format(DateTimeFormatter.ISO_LOCAL_DATE),
                "time" to zdt.format(DateTimeFormatter.ofPattern("HH:mm:ss")),
                "timezone" to zoneId.id,
                "iso" to zdt.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME),
                "unix" to zdt.toEpochSecond()
            )))
        } else {
            echo(zdt.format(formatter))
        }
    }
}

class TimeCron : CliktCommand(name = "cron", help = "Parse cron expressions and compute next runs") {
    private val expression by option("--expression", "-e", help = "Cron expression").required()
    private val next by option("--next", "-n", help = "Show next N run times").int().default(0)
    private val until by option("--until", help = "Show runs until this date (YYYY-MM-DD)").default("")
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val untilDate = if (until.isNotEmpty()) LocalDate.parse(until).atStartOfDay(ZoneId.systemDefault()).toInstant()
            else LocalDate.of(2100, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant()
        val runs = if (next > 0) cronNextRuns(expression, next, untilDate) else emptyList()

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf(
                "expression" to expression,
                "description" to cronDescribe(expression),
                "next_runs" to runs.map { it.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm EEE")) }
            )))
        } else {
            echo("Expression: $expression")
            echo("Description: ${cronDescribe(expression)}")
            echo("")
            if (runs.isNotEmpty()) {
                echo("Next ${runs.size} runs:")
                runs.forEachIndexed { i, t ->
                    echo("  ${"%2d".format(i + 1)}. ${t.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm EEE"))}")
                }
            }
        }
    }
}

private val cronMonthNames = mapOf(
    "jan" to 1, "feb" to 2, "mar" to 3, "apr" to 4, "may" to 5, "jun" to 6,
    "jul" to 7, "aug" to 8, "sep" to 9, "oct" to 10, "nov" to 11, "dec" to 12
)

private val cronWeekNames = mapOf(
    "sun" to 0, "mon" to 1, "tue" to 2, "wed" to 3, "thu" to 4, "fri" to 5, "sat" to 6
)

private fun cronExpandField(field: String, min: Int, max: Int, names: Map<String, Int>?): String {
    if (field == "*") return "every"
    if (field.startsWith("*/")) {
        val n = field.substring(2).toIntOrNull() ?: return field
        return "every $n"
    }
    if (field.contains("-")) {
        val parts = field.split("-", limit = 2)
        val from = cronResolveName(parts[0], names)
        val to = cronResolveName(parts[1], names)
        return "$from-$to"
    }
    if (field.contains(",")) return field
    return cronResolveName(field, names)
}

private fun cronResolveName(valStr: String, names: Map<String, Int>?): String {
    if (names != null) {
        val v = names[valStr.lowercase()]
        if (v != null) return v.toString()
    }
    return valStr
}

private fun cronZeropad(s: String): String {
    val n = s.toIntOrNull() ?: return s
    return if (n < 10) "0$n" else s
}

private fun cronDescribe(expr: String): String {
    val fields = expr.split("\\s+".toRegex())
    if (fields.size != 5) return "invalid cron expression (need 5 fields)"
    val minute = cronExpandField(fields[0], 0, 59, null)
    val hour = cronExpandField(fields[1], 0, 23, null)
    val dom = cronExpandField(fields[2], 1, 31, null)
    val month = cronExpandField(fields[3], 1, 12, cronMonthNames)
    val dow = cronExpandField(fields[4], 0, 6, cronWeekNames)
    val parts = mutableListOf<String>()
    if (minute == "every" && hour == "every") parts.add("every minute")
    else if (hour == "every") parts.add("minute $minute of every hour")
    else if (minute == "every") parts.add("every minute of hour $hour")
    else parts.add("at ${cronZeropad(hour)}:${cronZeropad(minute)}")
    if (month != "*" && month != "every") parts.add("in $month")
    if (dom != "*" && dom != "every") parts.add("on day $dom")
    if (dow != "*" && dow != "every") parts.add("on $dow")
    return parts.joinToString(" ")
}

private fun matchCronField(spec: String, value: Int, min: Int, max: Int): Boolean {
    if (spec == "*") return true
    if (spec.startsWith("*/")) {
        val step = spec.substring(2).toIntOrNull() ?: return value == spec.toIntOrNull()
        return step > 0 && value % step == 0
    }
    if (spec.contains(",")) {
        return spec.split(",").any { it.trim().toIntOrNull() == value }
    }
    if (spec.contains("-")) {
        val parts = spec.split("-", limit = 2)
        val lo = parts[0].toIntOrNull() ?: return false
        val hi = parts[1].toIntOrNull() ?: return false
        return value in lo..hi
    }
    return spec.toIntOrNull() == value
}

private fun cronNextRuns(expr: String, count: Int, until: Instant): List<ZonedDateTime> {
    val fields = expr.split("\\s+".toRegex())
    if (fields.size != 5) return emptyList()
    val minSpec = fields[0]
    val hourSpec = fields[1]
    val runs = mutableListOf<ZonedDateTime>()
    var current = LocalDateTime.now().truncatedTo(java.time.temporal.ChronoUnit.MINUTES)
    val untilLdt = LocalDateTime.ofInstant(until, ZoneId.systemDefault())
    val zone = ZoneId.systemDefault()
    while (runs.size < count && current.isBefore(untilLdt)) {
        if (matchCronField(minSpec, current.minute, 0, 59) && matchCronField(hourSpec, current.hour, 0, 23)) {
            runs.add(current.atZone(zone))
        }
        current = current.plusMinutes(1)
    }
    return runs
}

class TimeEpoch : CliktCommand(name = "epoch", help = "Convert between epoch timestamps and human-readable dates") {
    private val timestamp by argument().default("")
    private val from by option("--from", "-f", help = "Convert a date string to epoch").default("")
    private val relative by option("--relative", help = "Calculate relative time (e.g. '2 hours ago', '+3 days')").default("")
    private val format by option("--format", help = "Output format pattern").default("")
    private val iso by option("--iso", help = "Output in ISO 8601 format").flag()
    private val unix by option("--unix", help = "Output as Unix timestamp").flag()
    private val json by option("--json", help = "Output as JSON").flag()

    override fun run() {
        when {
            relative.isNotEmpty() -> {
                val t = parseEpochRelative(relative)
                val epoch = t.toEpochSecond()
                if (json) printEpochJSON(epoch, t.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                else echo(epoch.toString())
            }
            from.isNotEmpty() -> {
                val t = parseEpochDateString(from)
                val epoch = t.toEpochSecond()
                if (json) printEpochJSON(epoch, t.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                else echo(epoch.toString())
            }
            timestamp.isEmpty() -> {
                val now = Instant.now()
                if (json) printEpochJSON(now.epochSecond, now.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                else echo(now.epochSecond.toString())
            }
            else -> {
                val sec = timestamp.toLongOrNull() ?: throw IllegalArgumentException("invalid epoch timestamp: $timestamp")
                val t = Instant.ofEpochSecond(sec)
                if (json) {
                    printEpochJSON(sec, t.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                } else {
                    when {
                        iso -> echo(t.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                        unix -> echo(t.epochSecond.toString())
                        format.isNotEmpty() -> echo(t.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern(format)))
                        else -> echo(t.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                    }
                }
            }
        }
    }
}

private fun parseEpochDateString(s: String): ZonedDateTime {
    val formats = listOf(
        DateTimeFormatter.ISO_OFFSET_DATE_TIME,
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"),
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"),
        DateTimeFormatter.ISO_LOCAL_DATE,
        DateTimeFormatter.RFC_1123_DATE_TIME
    )
    for (f in formats) {
        try {
            val adt = f.parseBest(s, ZonedDateTime::from, LocalDateTime::from, LocalDate::from)
            return when (adt) {
                is ZonedDateTime -> adt
                is LocalDateTime -> adt.atZone(ZoneId.systemDefault())
                is LocalDate -> adt.atStartOfDay(ZoneId.systemDefault())
                else -> continue
            }
        } catch (_: Exception) {}
    }
    throw IllegalArgumentException("unable to parse date: $s")
}

private fun parseEpochRelative(s: String): ZonedDateTime {
    val now = ZonedDateTime.now()
    val parts = s.trim().split("\\s+".toRegex())
    require(parts.size >= 2) { "invalid relative time: $s (expected e.g. '2 hours ago')" }
    val n = parts[0].toIntOrNull() ?: throw IllegalArgumentException("invalid number: ${parts[0]}")
    val unit = parts[1].trimEnd('s').lowercase()
    var direction = 1
    if (parts.size >= 3 && parts.last() == "ago") direction = -1
    if (s.trim().startsWith("+")) direction = 1
    else if (s.trim().startsWith("-")) direction = -1
    val dur = when (unit) {
        "second" -> Duration.ofSeconds(1)
        "minute" -> Duration.ofMinutes(1)
        "hour" -> Duration.ofHours(1)
        "day" -> Duration.ofDays(1)
        "week" -> Duration.ofDays(7)
        "month" -> Duration.ofDays(30)
        "year" -> Duration.ofDays(365)
        else -> throw IllegalArgumentException("unknown unit: $unit")
    }
    return now.plus(dur.multipliedBy(n.toLong()).multipliedBy(direction.toLong()))
}

private fun printEpochJSON(epoch: Long, rfc3339: String) {
    val gson = GsonBuilder().setPrettyPrinting().create()
    println(gson.toJson(mapOf("epoch" to epoch, "rfc3339" to rfc3339)))
}

class TimePomodoro : CliktCommand(name = "pomodoro", help = "Start a Pomodoro timer") {
    private val work by option("--work", "-w", help = "Work session minutes").int().default(25)
    private val rest by option("--rest", "-r", help = "Rest session minutes").int().default(5)

    override fun run() {
        echo("Pomodoro: ${work}min work / ${rest}min rest")
        echo("Press Ctrl+C to stop")
        var session = "work"
        var remaining = work * 60
        while (true) {
            val mins = remaining / 60
            val secs = remaining % 60
            echo("\r$session: ${"%02d:%02d".format(mins, secs)}  ", trailingNewline = false)
            Thread.sleep(1000)
            remaining--
            if (remaining <= 0) {
                echo("")
                if (session == "work") {
                    echo("Work session complete! Take a break.")
                    session = "rest"
                    remaining = rest * 60
                } else {
                    echo("Break complete!")
                    break
                }
            }
        }
    }
}

class TimeStopwatch : CliktCommand(name = "stopwatch", help = "Measure elapsed time") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val start = System.currentTimeMillis()
        echo("Stopwatch started. Press Ctrl+C to stop.")
        try {
            while (true) {
                val elapsed = System.currentTimeMillis() - start
                val s = (elapsed / 1000) % 60
                val m = (elapsed / 60000) % 60
                val h = elapsed / 3600000
                echo("\rElapsed: ${"%02d:%02d:%02d".format(h, m, s)}  ", trailingNewline = false)
                Thread.sleep(100)
            }
        } catch (_: InterruptedException) {
            val elapsed = System.currentTimeMillis() - start
            if (json) {
                val gson = GsonBuilder().setPrettyPrinting().create()
                echo(gson.toJson(mapOf("elapsed" to "${elapsed}ms")))
            } else {
                echo("\nElapsed: ${elapsed}ms")
            }
        }
    }
}

class TimeTimer : CliktCommand(name = "timer", help = "Simple countdown timer") {
    private val duration by option("--duration", "-d", help = "Duration (e.g. 30s, 5m)").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val dur = parseTimerDuration(duration)
        var remaining = dur
        echo("Timer: ${formatTimerDuration(remaining)}")
        while (remaining > 0) {
            Thread.sleep(1000)
            remaining -= 1000
            if (remaining > 0) echo("\rTimer: ${formatTimerDuration(remaining)}  ", trailingNewline = false)
        }
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("duration" to dur, "status" to "completed")))
        } else {
            echo("\nTime's up!")
        }
    }
}

private fun parseTimerDuration(s: String): Long {
    return when {
        s.endsWith("s") -> {
            val n = s.removeSuffix("s").toIntOrNull() ?: throw IllegalArgumentException("invalid duration: $s")
            n * 1000L
        }
        s.endsWith("m") -> {
            val n = s.removeSuffix("m").toIntOrNull() ?: throw IllegalArgumentException("invalid duration: $s")
            n * 60000L
        }
        else -> {
            val n = s.toIntOrNull() ?: throw IllegalArgumentException("invalid duration: $s (use e.g. 30s, 5m)")
            n * 1000L
        }
    }
}

private fun formatTimerDuration(ms: Long): String {
    val totalSecs = ms / 1000
    val m = totalSecs / 60
    val s = totalSecs % 60
    return "%02d:%02d".format(m, s)
}

class TimeUntil : CliktCommand(name = "until", help = "Countdown to a specific date/time") {
    private val time by option("--time", "-t", help = "Target datetime").required()

    override fun run() {
        val target = parseDatetimeZoned(time)
        val now = ZonedDateTime.now()
        if (target.isBefore(now)) {
            echo("That time has already passed.")
            return
        }
        val d = Duration.between(now, target)
        val days = d.toDays()
        val hours = d.toHours() % 24
        val minutes = d.toMinutes() % 60
        val seconds = d.seconds % 60
        echo("${days}d ${hours}h ${minutes}m ${seconds}s")
    }
}

private fun parseDatetimeZoned(s: String): ZonedDateTime {
    val formats = listOf(
        DateTimeFormatter.ISO_OFFSET_DATE_TIME,
        DateTimeFormatter.ISO_LOCAL_DATE_TIME,
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"),
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"),
        DateTimeFormatter.ISO_LOCAL_DATE
    )
    for (f in formats) {
        try {
            val adt = f.parseBest(s, ZonedDateTime::from, LocalDateTime::from, LocalDate::from)
            return when (adt) {
                is ZonedDateTime -> adt
                is LocalDateTime -> adt.atZone(ZoneId.systemDefault())
                is LocalDate -> adt.atStartOfDay(ZoneId.systemDefault())
                else -> continue
            }
        } catch (_: Exception) {}
    }
    throw IllegalArgumentException("unrecognized datetime format: $s")
}

private val commonZones = mapOf(
    "utc" to "UTC", "ny" to "America/New_York", "london" to "Europe/London",
    "tokyo" to "Asia/Tokyo", "hcmc" to "Asia/Ho_Chi_Minh", "hanoi" to "Asia/Ho_Chi_Minh",
    "sf" to "America/Los_Angeles", "la" to "America/Los_Angeles", "paris" to "Europe/Paris",
    "berlin" to "Europe/Berlin", "mumbai" to "Asia/Kolkata", "beijing" to "Asia/Shanghai",
    "seoul" to "Asia/Seoul", "sydney" to "Australia/Sydney", "dubai" to "Asia/Dubai",
    "singapore" to "Asia/Singapore", "hk" to "Asia/Hong_Kong", "ams" to "Europe/Amsterdam",
    "chi" to "America/Chicago", "den" to "America/Denver", "phx" to "America/Phoenix"
)

class TimeWorld : CliktCommand(name = "world", help = "Display current time in multiple timezones") {
    private val zones by argument().default("")

    override fun run() {
        val zoneList = zones.split(Regex("\\s+")).filter { it.isNotEmpty() }
        val zoneNames = if (zoneList.isNotEmpty()) zoneList else listOf("ny", "london", "hcmc", "tokyo", "utc")
        val now = ZonedDateTime.now()
        zoneNames.forEachIndexed { i, z ->
            val zoneIdStr = commonZones[z.lowercase()] ?: z
            try {
                val zoneId = ZoneId.of(zoneIdStr)
                val t = now.withZoneSameInstant(zoneId)
                if (i > 0) echo("")
                echo("%-12s %s".format("$z:", t.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))))
            } catch (e: Exception) {
                echo("unknown timezone $z")
            }
        }
    }
}
