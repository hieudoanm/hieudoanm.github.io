package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.double
import io.github.hieudoanm.cli.services.Requests
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import kotlin.math.*
import kotlin.system.exitProcess
import java.io.File
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

class CalcCommand : CliktCommand(name = "calc", help = "Financial and utility calculators") {
    init {
        subcommands(
            CalcAge(), CalcBmi(), CalcCurrency(), CalcTax(), CalcCompound(), CalcLoan(),
            CalcDiscount(), CalcTip(), CalcBase(), CalcUnit(), CalcPercent(),
            CalcMortgage(), CalcDate(), CalcEval(), CalcStats(), CalcFactorial(),
            CalcRandom(), CalcPrime(), CalcGcd(), CalcLcm()
        )
    }
    override fun run() = Unit
}

class CalcAge : CliktCommand(name = "age", help = "Calculate age from birthdate") {
    private val year by option("--year", "-y", help = "Birth year").int().required()
    private val month by option("--month", "-m", help = "Birth month (1-12)").int().required()
    private val day by option("--day", "-d", help = "Birth day (1-31)").int().required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        if (month < 1 || month > 12 || day < 1 || day > 31 || year <= 0) {
            echo("invalid birth date: year/month/day must be valid values")
            return
        }

        val cal = java.util.Calendar.getInstance()
        cal.set(year, month - 1, day)
        val now = java.util.Calendar.getInstance()

        if (cal.get(java.util.Calendar.YEAR) != year ||
            cal.get(java.util.Calendar.MONTH) != month - 1 ||
            cal.get(java.util.Calendar.DAY_OF_MONTH) != day
        ) {
            echo("invalid birth date: $year/$month/$day does not exist")
            return
        }

        if (cal.after(now)) {
            echo("birth date cannot be in the future")
            return
        }

        var years = now.get(java.util.Calendar.YEAR) - cal.get(java.util.Calendar.YEAR)
        var months = now.get(java.util.Calendar.MONTH) - cal.get(java.util.Calendar.MONTH)
        var days = now.get(java.util.Calendar.DAY_OF_MONTH) - cal.get(java.util.Calendar.DAY_OF_MONTH)

        if (days < 0) {
            months--
            val prevMonth = now.clone() as java.util.Calendar
            prevMonth.add(java.util.Calendar.MONTH, -1)
            days += prevMonth.getActualMaximum(java.util.Calendar.DAY_OF_MONTH)
        }
        if (months < 0) {
            years--
            months += 12
        }

        if (json) {
            val gson = com.google.gson.GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("birth_date" to String.format("%04d-%02d-%02d", year, month, day), "years" to years, "months" to months, "days" to days)))
        } else {
            echo("$years years, $months months, $days days")
        }
    }
}

class CalcBmi : CliktCommand(name = "bmi", help = "Calculate Body Mass Index") {
    private val weight by argument()
    private val height by argument()
    override fun run() {
        val w = weight.toDouble()
        val h = height.toDouble() / 100
        val bmi = w / (h * h)
        val cat = when {
            bmi < 18.5 -> "Underweight"
            bmi < 25.0 -> "Normal"
            bmi < 30.0 -> "Overweight"
            else -> "Obese"
        }
        echo("=== BMI Calculator ===")
        echo("Weight:        ${"%.1f".format(w)} kg")
        echo("Height:        ${"%.1f".format(height.toDouble())} cm")
        echo("BMI:           ${"%.1f".format(bmi)}")
        echo("Category:      $cat")
    }
}

class CalcCurrency : CliktCommand(name = "currency", help = "Convert between currencies using Frankfurter API") {
    private val amount by argument()
    private val from by argument().default("EUR")
    private val to by argument().default("USD")
    override fun run() {
        val url = "https://api.frankfurter.app/latest?base=$from&symbols=$to"
        val result = Requests.get(url)
        result.onSuccess { body ->
            val resp = Gson().fromJson(body, FrankfurterResponse::class.java)
            val rate = resp.rates[to] ?: throw Exception("No rate found for $to")
            val converted = amount.toDouble() * rate
            echo("${"%.2f".format(amount.toDouble())} $from = ${"%.2f".format(converted)} $to (rate: $rate)")
        }.onFailure { e ->
            echo("Error: ${e.message}")
        }
    }
}

data class FrankfurterResponse(
    val amount: Double,
    val base: String,
    val date: String,
    val rates: Map<String, Double>
)

class CalcTax : CliktCommand(name = "tax", help = "Calculate Vietnam personal income tax") {
    private val income by argument("monthly income")
    private val dependents by option("--dependents", "-d", help = "Number of dependents").int().default(0)
    private val insurance by option("--insurance", "-i", help = "Enable insurance deductions").flag()

    override fun run() {
        val gross = income.toDouble()
        val personalDeduction = 11_000_000.0
        val dependentDeduction = 4_400_000.0
        val insuranceCap = 36_000_000.0
        val insRates = mapOf("BHXH" to 0.08, "BHYT" to 0.015, "BHTN" to 0.01)
        val brackets = listOf(
            5_000_000.0 to 0.05, 5_000_000.0 to 0.10, 8_000_000.0 to 0.15,
            14_000_000.0 to 0.20, 20_000_000.0 to 0.25, 28_000_000.0 to 0.30,
            Double.MAX_VALUE to 0.35
        )

        val insBase = if (insurance) minOf(gross, insuranceCap) else 0.0
        val insTotal = insBase * insRates.values.sum()
        val taxable = maxOf(0.0, gross - personalDeduction - dependents * dependentDeduction - insTotal)

        var remain = taxable
        var totalTax = 0.0
        echo("=== Vietnam PIT Calculator ===")
        echo("Gross income:     ${"%,.0f".format(gross)}")
        echo("Insurance base:   ${"%,.0f".format(insBase)}")
        echo("Insurance total:  ${"%,.0f".format(insTotal)}")
        echo("Personal ded:     ${"%,.0f".format(personalDeduction)}")
        echo("Dependent ded:    ${"%,.0f".format(dependents * dependentDeduction)}")
        echo("Taxable income:   ${"%,.0f".format(taxable)}")
        echo()
        echo("Bracket breakdown:")
        for ((limit, rate) in brackets) {
            if (remain <= 0) break
            val apply = minOf(limit, remain)
            val tax = apply * rate
            totalTax += tax
            echo("  ${"%,.0f".format(apply)} x ${"%.0f".format(rate * 100)}% = ${"%,.0f".format(tax)}")
            remain -= apply
        }
        echo()
        echo("Total tax:        ${"%,.0f".format(totalTax)}")
        echo("Net income:       ${"%,.0f".format(gross - insTotal - totalTax)}")
    }
}

class CalcCompound : CliktCommand(name = "compound", help = "Compound interest calculator") {
    private val principal by argument()
    private val rate by argument()
    private val years by argument()
    private val contribute by option("--contribute", "-c", help = "Regular contribution").double().default(0.0)
    private val compound by option("--compound", "-n", help = "Compounding frequency").default("yearly")

    override fun run() {
        val n = when (compound) {
            "daily" -> 365.0
            "monthly" -> 12.0
            "quarterly" -> 4.0
            else -> 1.0
        }
        val r = rate.toDouble() / 100.0
        val nt = n * years.toDouble()
        val p = principal.toDouble()

        val fvPrincipal = p * (1 + r / n).pow(nt)
        val fvContributions = if (contribute > 0) {
            if (r == 0.0) contribute * nt
            else contribute * ((1 + r / n).pow(nt) - 1) / (r / n)
        } else 0.0
        val fv = fvPrincipal + fvContributions
        val totalDeposits = p + contribute * nt
        val totalInterest = fv - totalDeposits

        val label = compound
        echo("=== Compound Interest Calculator ===")
        echo("Principal:         ${"%.2f".format(p)}")
        echo("Annual rate:       ${"%.2f".format(rate.toDouble())}%")
        echo("Years:             ${"%.0f".format(years.toDouble())}")
        echo("Compounding:       $label")
        if (contribute > 0) {
            val pl = when (compound) { "monthly" -> "per month"; "daily" -> "per day"; else -> "per ${compound.removeSuffix("ly")}y" }
            echo("Contribution:      ${"%.2f".format(contribute)} $pl")
        }
        echo()
        echo("%-6s %14s %14s %14s".format("Year", "Deposits", "Interest", "Balance"))
        echo("------   ------------   ------------   ------------")
        for (y in 1..years.toInt()) {
            val pt = n * y
            val fvy = p * (1 + r / n).pow(pt)
            val dep = p + contribute * n * y
            val fvyTotal = if (contribute > 0 && r > 0) fvy + contribute * ((1 + r / n).pow(pt) - 1) / (r / n) else fvy
            val bal = if (contribute > 0 && r == 0.0) p + contribute * n * y else fvyTotal
            val int = bal - dep
            echo("%-6d %14.2f %14.2f %14.2f".format(y, dep, int, bal))
        }
        echo()
        echo("%-6s %14.2f %14.2f %14.2f".format("Total", totalDeposits, totalInterest, fv))
    }
}

class CalcLoan : CliktCommand(name = "loan", help = "Loan amortization calculator") {
    private val principal by argument()
    private val rate by argument()
    private val years by argument()
    override fun run() {
        val p = principal.toDouble()
        val r = rate.toDouble() / 100.0 / 12
        val n = years.toDouble() * 12
        val payment = if (rate.toDouble() == 0.0) p / n else p * r * (1 + r).pow(n) / ((1 + r).pow(n) - 1)
        val totalPayment = payment * n
        val totalInterest = totalPayment - p

        echo("=== Loan Amortization ===")
        echo("Principal:     ${"%.2f".format(p)}")
        echo("Annual rate:   ${"%.2f".format(rate.toDouble())}%")
        echo("Years:         ${"%.0f".format(years.toDouble())}")
        echo("Monthly:       ${"%.2f".format(payment)}")
        echo("Total paid:    ${"%.2f".format(totalPayment)}")
        echo("Total interest:${"%.2f".format(totalInterest)}")
        echo()
        echo("%-6s %12s %12s %12s".format("Month", "Payment", "Interest", "Balance"))
        echo("------   ------------   ------------   ------------")
        var balance = p
        val totalMonths = n.toInt()
        for (i in 1..minOf(totalMonths, 12)) {
            val interest = balance * r
            val principalPaid = payment - interest
            balance -= principalPaid
            echo("%-6d %12.2f %12.2f %12.2f".format(i, payment, interest, balance))
        }
        if (totalMonths > 12) {
            echo("... (${totalMonths - 12} more months)")
        }
    }
}

class CalcDiscount : CliktCommand(name = "discount", help = "Calculate discount and sale price") {
    private val original by argument()
    private val percent by argument()
    override fun run() {
        val o = original.toDouble()
        val p = percent.toDouble()
        val discount = o * p / 100
        val final = o - discount
        echo("=== Discount Calculator ===")
        echo("Original price:  ${"%.2f".format(o)}")
        echo("Discount:        ${"%.2f".format(p)}%")
        echo("You save:        ${"%.2f".format(discount)}")
        echo("Final price:     ${"%.2f".format(final)}")
    }
}

class CalcTip : CliktCommand(name = "tip", help = "Calculate tip and split bill") {
    private val bill by argument()
    private val percent by argument().default("15")
    private val split by option("--split", "-s", help = "Number of people").int().default(1)
    override fun run() {
        var s = split
        if (s < 1) s = 1
        val tip = bill.toDouble() * percent.toDouble() / 100
        val total = bill.toDouble() + tip
        val perPerson = total / s
        echo("=== Tip Calculator ===")
        echo("Bill:          ${"%.2f".format(bill.toDouble())}")
        echo("Tip %%:          ${"%.0f".format(percent.toDouble())}%")
        echo("Tip amount:    ${"%.2f".format(tip)}")
        echo("Total:         ${"%.2f".format(total)}")
        echo("Split:         $s")
        echo("Per person:    ${"%.2f".format(perPerson)}")
    }
}

class CalcBase : CliktCommand(name = "base", help = "Convert between number bases") {
    private val value by argument()
    private val fromBase by argument().default("dec")
    private val toBase by argument().default("hex")
    override fun run() {
        val bases = mapOf("bin" to 2, "binary" to 2, "oct" to 8, "octal" to 8,
            "dec" to 10, "decimal" to 10, "hex" to 16, "hexadecimal" to 16)
        val baseNames = mapOf(2 to "binary", 8 to "octal", 10 to "decimal", 16 to "hexadecimal")
        val fb = bases[fromBase] ?: throw Exception("unknown base: $fromBase (use bin/oct/dec/hex)")
        val tb = bases[toBase] ?: throw Exception("unknown base: $toBase (use bin/oct/dec/hex)")
        val n = value.toLong(fb)
        val result = n.toString(tb)
        echo("$value (${baseNames[fb]}) = $result (${baseNames[tb]})")
    }
}

class CalcUnit : CliktCommand(name = "unit", help = "Convert between units") {
    private val value by argument()
    private val from by argument()
    private val to by argument()
    override fun run() {
        data class UnitConv(val cat: String, val aliases: List<String>, val toBase: (Double) -> Double, val fromBase: (Double) -> Double)
        val units = listOf(
            UnitConv("length", listOf("mm", "millimeter", "millimetre"), { it / 1000 }, { it * 1000 }),
            UnitConv("length", listOf("cm", "centimeter", "centimetre"), { it / 100 }, { it * 100 }),
            UnitConv("length", listOf("m", "meter", "metre"), { it }, { it }),
            UnitConv("length", listOf("km", "kilometer", "kilometre"), { it * 1000 }, { it / 1000 }),
            UnitConv("length", listOf("in", "inch"), { it * 0.0254 }, { it / 0.0254 }),
            UnitConv("length", listOf("ft", "foot", "feet"), { it * 0.3048 }, { it / 0.3048 }),
            UnitConv("length", listOf("yd", "yard"), { it * 0.9144 }, { it / 0.9144 }),
            UnitConv("length", listOf("mi", "mile"), { it * 1609.344 }, { it / 1609.344 }),
            UnitConv("weight", listOf("mg", "milligram"), { it / 1e6 }, { it * 1e6 }),
            UnitConv("weight", listOf("g", "gram"), { it / 1000 }, { it * 1000 }),
            UnitConv("weight", listOf("kg", "kilogram"), { it }, { it }),
            UnitConv("weight", listOf("t", "tonne", "metric-ton"), { it * 1000 }, { it / 1000 }),
            UnitConv("weight", listOf("lb", "lbs", "pound"), { it * 0.453592 }, { it / 0.453592 }),
            UnitConv("weight", listOf("oz", "ounce"), { it * 0.0283495 }, { it / 0.0283495 }),
            UnitConv("temperature", listOf("c", "celsius"), { it }, { it }),
            UnitConv("temperature", listOf("f", "fahrenheit"), { (it - 32) * 5 / 9 }, { it * 9 / 5 + 32 }),
            UnitConv("temperature", listOf("k", "kelvin"), { it - 273.15 }, { it + 273.15 }),
            UnitConv("speed", listOf("m/s", "mps"), { it }, { it }),
            UnitConv("speed", listOf("km/h", "kph"), { it / 3.6 }, { it * 3.6 }),
            UnitConv("speed", listOf("mph"), { it * 0.44704 }, { it / 0.44704 }),
            UnitConv("speed", listOf("kn", "knot", "knots"), { it * 0.514444 }, { it / 0.514444 }),
        )
        fun find(name: String) = units.firstOrNull { it.aliases.contains(name.lowercase()) }
        val fu = find(from) ?: throw Exception("unknown unit: $from")
        val tu = find(to) ?: throw Exception("unknown unit: $to")
        if (fu.cat != tu.cat) throw Exception("cannot convert $from (${fu.cat}) to $to (${tu.cat})")
        val base = fu.toBase(value.toDouble())
        val result = tu.fromBase(base)
        echo("${value.toDouble().let { if (it == it.toLong().toDouble()) "${it.toLong()}" else "$it" }} $from = ${"%.10f".format(result).trimEnd('0').trimEnd('.')} $to")
    }
}

class CalcPercent : CliktCommand(name = "percent", help = "Calculate percentages") {
    private val value by argument()
    private val total by argument()
    override fun run() {
        val v = value.toDouble()
        val t = total.toDouble()
        val pct = v / t * 100
        echo("${"%.2f".format(v)} is ${"%.2f".format(pct)}% of ${"%.2f".format(t)}")
    }
}

class CalcMortgage : CliktCommand(name = "mortgage", help = "Mortgage payment calculator") {
    private val principal by argument()
    private val rate by argument()
    private val years by argument().default("30")
    override fun run() {
        val p = principal.toDouble()
        val r = rate.toDouble()
        val y = years.toDouble()
        val n = y * 12
        val payment = if (r == 0.0) p / n else {
            val mr = r / 100.0 / 12
            p * mr * (1 + mr).pow(n) / ((1 + mr).pow(n) - 1)
        }
        val totalPaid = payment * n
        val totalInterest = totalPaid - p
        echo("=== Mortgage Calculator ===")
        echo("Principal:           ${"%.2f".format(p)}")
        echo("Annual rate:         ${"%.2f".format(r)}%")
        echo("Years:               ${"%.0f".format(y)}")
        echo()
        echo("Principal & Interest: ${"%.2f".format(payment)}")
        echo("-".repeat(35))
        echo("Total monthly:       ${"%.2f".format(payment)}")
        echo()
        echo("Total paid:          ${"%.2f".format(totalPaid)}")
        echo("Total interest:      ${"%.2f".format(totalInterest)}")
    }
}

class CalcDate : CliktCommand(name = "date", help = "Date arithmetic and difference") {
    private val dateStr by argument("YYYY-MM-DD").default("")
    private val days by argument("days to add").default("0")
    override fun run() {
        val today = LocalDate.now()
        val date = if (dateStr.isBlank()) today else LocalDate.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE)
        if (days.startsWith("-") || days.toIntOrNull() != null) {
            val d = days.toInt()
            val result = date.plusDays(d.toLong())
            echo(result.format(DateTimeFormatter.ISO_LOCAL_DATE))
        } else {
            val d = days.toInt()
            val result = date.plusDays(d.toLong())
            echo(result.format(DateTimeFormatter.ISO_LOCAL_DATE))
        }
    }
}

class CalcEval : CliktCommand(name = "eval", help = "Evaluate a mathematical expression") {
    private val expr by argument()
    override fun run() {
        val result = evaluate(expr)
        echo(result)
    }
}

private fun evaluate(s: String): Double {
    val toks = mutableListOf<Tok>()
    var i = 0
    while (i < s.length) {
        when {
            s[i].isWhitespace() -> i++
            s[i] in '0'..'9' || s[i] == '.' -> {
                val start = i
                while (i < s.length && (s[i] in '0'..'9' || s[i] == '.')) i++
                toks.add(Tok(TokType.NUM, s.substring(start, i)))
            }
            s[i] in 'a'..'z' || s[i] in 'A'..'Z' || s[i] == '_' -> {
                val start = i
                while (i < s.length && (s[i] in 'a'..'z' || s[i] in 'A'..'Z' || s[i] in '0'..'9' || s[i] == '_')) i++
                toks.add(Tok(TokType.ID, s.substring(start, i)))
            }
            else -> {
                toks.add(Tok(TokType.OP, s[i].toString()))
                i++
            }
        }
    }
    toks.add(Tok(TokType.EOF, ""))
    val p = Parser(toks)
    return p.parseExpr()
}

private enum class TokType { NUM, ID, OP, EOF }
private data class Tok(val type: TokType, val s: String)
private data class Parser(val toks: List<Tok>) {
    var pos = 0
    fun cur() = toks[pos]
    fun next() { pos++ }

    fun parseExpr(): Double {
        var v = parseTerm()
        while (cur().s == "+" || cur().s == "-") {
            val op = cur().s; next()
            val rhs = parseTerm()
            v = if (op == "+") v + rhs else v - rhs
        }
        return v
    }

    fun parseTerm(): Double {
        var v = parsePow()
        while (cur().s == "*" || cur().s == "/") {
            val op = cur().s; next()
            val rhs = parsePow()
            v = if (op == "*") v * rhs else {
                if (rhs == 0.0) throw Exception("division by zero")
                v / rhs
            }
        }
        return v
    }

    fun parsePow(): Double {
        var v = parseUnary()
        if (cur().s == "^") { next(); v = v.pow(parsePow()) }
        return v
    }

    fun parseUnary(): Double {
        if (cur().s == "-") { next(); return -parseUnary() }
        if (cur().s == "+") { next(); return parseUnary() }
        return parsePrimary()
    }

    fun parsePrimary(): Double {
        return when (cur().type) {
            TokType.NUM -> { val v = cur().s.toDouble(); next(); v }
            TokType.ID -> {
                val name = cur().s; next()
                if (name == "pi" || name == "\u03c0") return PI
                if (name == "e") return E
                if (cur().s != "(") throw Exception("expected '(' after $name")
                next()
                val arg = parseExpr()
                if (cur().s != ")") throw Exception("expected ')' after argument")
                next()
                when (name.lowercase()) {
                    "sqrt" -> sqrt(arg)
                    "sin" -> sin(arg)
                    "cos" -> cos(arg)
                    "tan" -> tan(arg)
                    "abs" -> abs(arg)
                    "floor" -> floor(arg)
                    "ceil" -> ceil(arg)
                    "round" -> round(arg)
                    "log" -> ln(arg)
                    "log10" -> log10(arg)
                    "exp" -> exp(arg)
                    else -> throw Exception("unknown function \"$name\"")
                }
            }
            TokType.OP -> if (cur().s == "(") { next(); val v = parseExpr(); if (cur().s != ")") throw Exception("expected ')'"); next(); v } else throw Exception("unexpected operator")
            else -> throw Exception("unexpected token")
        }
    }
}

class CalcStats : CliktCommand(name = "stats", help = "Statistical summary of numbers") {
    private val values by argument().default("")
    override fun run() {
        val nums = values.split(Regex("\\s+")).filter { it.isNotEmpty() }.map { it.toDouble() }.sorted()
        val n = nums.size
        val sum = nums.sum()
        val mean = sum / n
        val variance = nums.map { (it - mean).pow(2) }.sum() / n
        val stddev = sqrt(variance)
        val median = if (n % 2 == 0) (nums[n / 2 - 1] + nums[n / 2]) / 2 else nums[n / 2]

        echo("count:  $n")
        echo("min:    ${nums.first()}")
        echo("max:    ${nums.last()}")
        echo("sum:    $sum")
        echo("mean:   $mean")
        echo("median: $median")
        echo("stddev: $stddev")
    }
}

class CalcFactorial : CliktCommand(name = "factorial", help = "Compute factorial of a number") {
    private val number by argument()
    override fun run() {
        val n = number.toLong()
        if (n < 0) throw Exception("factorial of negative number is undefined")
        var result = java.math.BigInteger.ONE
        for (i in 2..n) result = result.multiply(java.math.BigInteger.valueOf(i))
        echo(result.toString())
    }
}

class CalcRandom : CliktCommand(name = "random", help = "Generate random numbers") {
    private val min by argument().default("1")
    private val max by argument().default("100")
    private val count by option("--count", "-n", help = "Number of values").int().default(1)
    override fun run() {
        val c = maxOf(1, count)
        val lo = min.toDouble()
        val hi = max.toDouble()
        for (i in 0 until c) {
            val v = lo + kotlin.random.Random.nextDouble() * (hi - lo)
            echo(if (v == v.toLong().toDouble()) "%.0f".format(v) else "$v")
        }
    }
}

class CalcPrime : CliktCommand(name = "prime", help = "Check if a number is prime, or generate primes") {
    private val number by argument()
    private val list by option("--list", "-l", help = "List all primes up to N").flag()
    override fun run() {
        val n = number.toLong()
        if (n < 2) throw Exception("number must be >= 2")

        fun isPrime(x: Long): Boolean {
            if (x < 2) return false
            if (x == 2L || x == 3L) return true
            if (x % 2 == 0L || x % 3 == 0L) return false
            var i = 5L
            val limit = sqrt(x.toDouble()).toLong()
            while (i <= limit) {
                if (x % i == 0L || x % (i + 2) == 0L) return false
                i += 6
            }
            return true
        }

        if (list) {
            val primes = mutableListOf<Long>()
            for (i in 2..n) {
                if (isPrime(i)) primes.add(i)
            }
            primes.forEach { echo(it.toString()) }
        } else {
            echo(if (isPrime(n)) "$n is prime" else "$n is not prime")
        }
    }
}

class CalcGcd : CliktCommand(name = "gcd", help = "Greatest common divisor") {
    private val a by argument()
    private val b by argument()
    override fun run() {
        fun gcd(x: Long, y: Long): Long = if (y == 0L) x else gcd(y, x % y)
        echo(gcd(a.toLong(), b.toLong()).toString())
    }
}

class CalcLcm : CliktCommand(name = "lcm", help = "Least common multiple") {
    private val a by argument()
    private val b by argument()
    override fun run() {
        fun gcd(x: Long, y: Long): Long = if (y == 0L) x else gcd(y, x % y)
        val ai = a.toLong()
        val bi = b.toLong()
        val result = ai / gcd(ai, bi) * bi
        echo(result.toString())
    }
}
