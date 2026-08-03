package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import java.net.InetSocketAddress
import java.net.Socket

class PortCommand : CliktCommand(name = "port", help = "Network port checking tools") {
    init {
        subcommands(PortCheck(), PortFind(), PortScan())
    }
    override fun run() = Unit
}

// ─── Common ports ────────────────────────────────────────────────────────────

private val commonPorts = mapOf(
    21 to "FTP", 22 to "SSH", 23 to "Telnet", 25 to "SMTP",
    53 to "DNS", 80 to "HTTP", 110 to "POP3", 143 to "IMAP",
    443 to "HTTPS", 465 to "SMTPS", 587 to "SMTP Submission",
    993 to "IMAPS", 995 to "POP3S", 1433 to "MSSQL",
    3306 to "MySQL", 3389 to "RDP", 5432 to "PostgreSQL",
    6379 to "Redis", 8080 to "HTTP-Alt", 8443 to "HTTPS-Alt",
    27017 to "MongoDB"
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

private fun checkPortOpen(host: String, port: Int, timeout: Int): Boolean {
    return try {
        Socket().use { it.connect(InetSocketAddress(host, port), timeout * 1000); true }
    } catch (_: Exception) { false }
}

// ─── Check ───────────────────────────────────────────────────────────────────

class PortCheck : CliktCommand(name = "check", help = "Check if a port is open") {
    private val target by option("--target", "-T")
    private val timeout by option("--timeout", "-t").int().default(3)
    private val json by option("--json").flag()
    override fun run() {
        val t = target ?: error("use host:port format (e.g. localhost:8080)")
        val parts = t.split(":")
        if (parts.size != 2) error("use host:port format (e.g. localhost:8080)")
        val host = parts[0]; val port = parts[1].toInt()
        val open = checkPortOpen(host, port, timeout)
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("host" to host, "port" to port, "open" to open)))
        } else {
            echo("Port $t is ${if (open) "open" else "closed"}")
        }
    }
}

// ─── Find ────────────────────────────────────────────────────────────────────

class PortFind : CliktCommand(name = "find", help = "Find an available port in a range") {
    private val start by option("--start", "-s").int().default(8000)
    private val end by option("--end", "-e").int().default(9000)
    private val json by option("--json").flag()
    override fun run() {
        for (port in start..end) {
            if (!checkPortOpen("localhost", port, 1)) {
                if (json) {
                    echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("port" to port)))
                } else {
                    echo("Available port: $port")
                }
                return
            }
        }
        error("no available ports in range $start-$end")
    }
}

// ─── Scan ────────────────────────────────────────────────────────────────────

class PortScan : CliktCommand(name = "scan", help = "Scan common ports on a host") {
    private val host by option("--host", "-H")
    private val ports by option("--ports")
    private val timeout by option("--timeout", "-t").int().default(2)
    private val json by option("--json").flag()
    override fun run() {
        val h = host ?: error("--host required")
        val portsVal = ports
        val portList = if (portsVal != null) {
            portsVal.split(",").flatMap { part ->
                val p = part.trim()
                if (p.contains("-")) {
                    val range = p.split("-")
                    (range[0].trim().toInt()..range[1].trim().toInt()).toList()
                } else {
                    listOf(p.toInt())
                }
            }.sorted().distinct()
        } else {
            commonPorts.keys.sorted()
        }
        val openPorts = portList.filter { checkPortOpen(h, it, timeout) }
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf(
                "host" to h,
                "ports" to openPorts.map { mapOf("port" to it, "name" to (commonPorts[it] ?: "Unknown")) }
            )))
        } else if (openPorts.isEmpty()) {
            echo("No open ports found on $h")
        } else {
            echo("Open ports on $h:")
            openPorts.forEach { echo("  %5d  %s".format(it, commonPorts[it] ?: "Unknown")) }
        }
    }
}
