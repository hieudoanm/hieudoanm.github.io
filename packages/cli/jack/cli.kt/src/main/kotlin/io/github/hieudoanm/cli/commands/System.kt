package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.google.gson.GsonBuilder
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.lang.management.ManagementFactory
import java.lang.management.OperatingSystemMXBean
import kotlin.system.exitProcess

class SystemCommand : CliktCommand(name = "system", help = "System utilities") {
    init {
        subcommands(
            SystemInfo(), SystemEnv(), SystemPath(), SystemDisk(),
            SystemBattery(), SystemClipboard(), SystemMonitor()
        )
    }
    override fun run() = Unit
}

class SystemInfo : CliktCommand(name = "info", help = "Show system information") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val os = System.getProperty("os.name")
        val arch = System.getProperty("os.arch")
        val cpuCount = Runtime.getRuntime().availableProcessors()
        val osBean = ManagementFactory.getOperatingSystemMXBean()
        val totalMem = Runtime.getRuntime().totalMemory()

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("os" to os, "arch" to arch, "cpu_count" to cpuCount)))
        } else {
            echo("OS:     $os")
            echo("Arch:   $arch")
            echo("CPU:    $cpuCount cores")
            echo("Memory: ${totalMem / 1024 / 1024} MB")
        }
    }
}

class SystemEnv : CliktCommand(name = "env", help = "List or search environment variables") {
    private val filter by argument().default("")
    private val sortOut by option("--sort", help = "Sort alphabetically by key").flag()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val env = System.getenv()
        val entries = env.entries.map { (k, v) -> Entry(k, v) }
            .filter { filter.isEmpty() || it.key.startsWith(filter) }
            .let { if (sortOut) it.sortedBy { e -> e.key } else it }

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(entries))
        } else {
            entries.forEach { echo("${it.key}=${it.value}") }
        }
    }

    private data class Entry(val key: String, val value: String)
}

class SystemPath : CliktCommand(name = "path", help = "List or search PATH directories and commands") {
    private val command by argument().default("")
    private val sortOut by option("--sort", help = "Sort alphabetically by path").flag()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val pathStr = System.getenv("PATH") ?: ""
        val dirs = pathStr.split(File.pathSeparatorChar)

        if (command.isNotEmpty()) {
            for (dir in dirs) {
                val f = File(dir, command)
                if (f.isFile && f.canExecute()) {
                    if (json) {
                        val gson = GsonBuilder().setPrettyPrinting().create()
                        echo(gson.toJson(mapOf("command" to command, "path" to f.absolutePath)))
                    } else {
                        echo(f.absolutePath)
                    }
                    return
                }
            }
            echo("command $command not found in PATH")
            return
        }

        val entries = dirs.mapIndexed { i, d -> PathEntry(i, d, File(d).exists()) }
            .let { if (sortOut) it.sortedBy { e -> e.dir } else it }

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(entries))
        } else {
            entries.forEach { e ->
                val mark = if (e.exists) " " else "\u2717"
                echo(" $mark ${e.dir}")
            }
        }
    }

    private data class PathEntry(val index: Int, val dir: String, val exists: Boolean)
}

class SystemDisk : CliktCommand(name = "disk", help = "Show disk usage for mounted filesystems") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val roots = File.listRoots()
        val mounts = roots.map { root ->
            val total = root.totalSpace
            val free = root.freeSpace
            val used = total - free
            val pct = if (total > 0) used * 100 / total else 0
            DiskEntry(root.absolutePath, formatBytes(total), formatBytes(used), formatBytes(free), "${pct}%")
        }

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mounts))
        } else {
            echo("%-20s %10s %10s %10s %6s".format("Filesystem", "Size", "Used", "Avail", "Use%"))
            mounts.forEach { m ->
                val warn = if (m.usePercent.removeSuffix("%").toIntOrNull() ?: 0 >= 90) "\u26A0 " else ""
                echo("%-20s %10s %10s %10s %6s".format(warn + m.filesystem, m.size, m.used, m.avail, m.usePercent))
            }
        }
    }

    private data class DiskEntry(val filesystem: String, val size: String, val used: String, val avail: String, val usePercent: String)

    private fun formatBytes(b: Long): String {
        val unit = 1024L
        if (b < unit) return "$b B"
        val sizes = listOf("KB", "MB", "GB", "TB")
        var div = unit
        var exp = 0
        var n = b / unit
        while (n >= unit && exp < sizes.size - 1) {
            div *= unit
            exp++
            n /= unit
        }
        return "%.1f %s".format(b.toDouble() / div, sizes[exp])
    }
}

class SystemBattery : CliktCommand(name = "battery", help = "Show battery status") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val os = System.getProperty("os.name").lowercase()
        when {
            os.contains("mac") -> darwinBattery()
            os.contains("linux") -> linuxBattery()
            else -> echo("unsupported platform: $os")
        }
    }

    private fun darwinBattery() {
        try {
            val proc = Runtime.getRuntime().exec(arrayOf("pmset", "-g", "batt"))
            val reader = BufferedReader(InputStreamReader(proc.inputStream))
            val output = reader.readText()
            reader.close()
            var percent = 0
            var charging = false
            var timeRemain = ""
            for (line in output.lines()) {
                if (!line.contains("InternalBattery")) continue
                val fields = line.split("\\s+".toRegex())
                for (f in fields) {
                    if (f.endsWith("%")) percent = f.trimEnd('%').toIntOrNull() ?: 0
                    if (f == "charging" || f == "AC" || f == "charged") charging = true
                    if (f.endsWith(";") && f.length > 4 && f.contains(":")) timeRemain = f.trimEnd(';')
                }
            }
            printBattery(BatteryInfo(percent, charging, timeRemain))
        } catch (e: Exception) {
            echo("pmset failed: ${e.message}")
        }
    }

    private fun linuxBattery() {
        var percent = 0
        var charging = false
        try {
            val capFile = File("/sys/class/power_supply/BAT0/capacity")
            if (capFile.exists()) percent = capFile.readText().trim().toIntOrNull() ?: 0
            val statFile = File("/sys/class/power_supply/BAT0/status")
            if (statFile.exists()) charging = statFile.readText().trim() == "Charging"
        } catch (_: Exception) {}
        printBattery(BatteryInfo(percent, charging, ""))
    }

    private fun printBattery(info: BatteryInfo) {
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(info))
        } else {
            val status = if (info.charging) "charging" else "discharging"
            echo("Battery: ${info.percent}% ($status)")
            if (info.timeRemain.isNotEmpty()) echo("Time remaining: ${info.timeRemain}")
        }
    }

    private data class BatteryInfo(val percent: Int, val charging: Boolean, val timeRemain: String)
}

class SystemClipboard : CliktCommand(name = "clipboard", help = "Read/write clipboard") {
    private val write by option("--write", help = "Text to write to clipboard").default("")
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        if (write.isNotEmpty()) {
            val clipboard = java.awt.Toolkit.getDefaultToolkit().systemClipboard
            val selection = java.awt.datatransfer.StringSelection(write)
            clipboard.setContents(selection, null)
            echo("Clipboard updated")
        } else {
            val clipboard = java.awt.Toolkit.getDefaultToolkit().systemClipboard
            val contents = clipboard.getContents(null)
            val text = if (contents != null && contents.isDataFlavorSupported(java.awt.datatransfer.DataFlavor.stringFlavor)) {
                contents.getTransferData(java.awt.datatransfer.DataFlavor.stringFlavor) as String
            } else ""
            if (json) {
                val gson = GsonBuilder().setPrettyPrinting().create()
                echo(gson.toJson(mapOf("content" to text)))
            } else {
                echo(text)
            }
        }
    }
}

class SystemMonitor : CliktCommand(name = "monitor", help = "Monitor system resources") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val osBean = ManagementFactory.getOperatingSystemMXBean()
        val runtime = Runtime.getRuntime()

        val cpuLoad = if (osBean is com.sun.management.OperatingSystemMXBean) {
            "%.1f%%".format(osBean.cpuLoad * 100)
        } else "N/A"

        val totalMem = runtime.totalMemory()
        val freeMem = runtime.freeMemory()
        val usedMem = totalMem - freeMem
        val memPct = if (totalMem > 0) usedMem * 100.0 / totalMem else 0.0

        val roots = File.listRoots()
        val diskTotal = roots.sumOf { it.totalSpace }
        val diskFree = roots.sumOf { it.freeSpace }
        val diskUsed = diskTotal - diskFree

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf(
                "cpu_percent" to cpuLoad,
                "ram_percent" to "%.1f".format(memPct),
                "ram_used_gb" to "%.1f".format(usedMem / 1e9),
                "ram_total_gb" to "%.1f".format(totalMem / 1e9),
                "disk_used_gb" to "%.1f".format(diskUsed / 1e9),
                "disk_total_gb" to "%.1f".format(diskTotal / 1e9)
            )))
        } else {
            echo("CPU:  $cpuLoad")
            echo("RAM:  ${"%.1f".format(memPct)}% (${"%.1f".format(usedMem / 1e9)}/${"%.1f".format(totalMem / 1e9)} GB)")
            echo("Disk: ${"%.1f".format(diskUsed / 1e9)}/${"%.1f".format(diskTotal / 1e9)} GB")
        }
    }
}
