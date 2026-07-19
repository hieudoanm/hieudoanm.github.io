package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.google.gson.GsonBuilder

const val APP_VERSION = "0.1.0"

class VersionCommand : CliktCommand(name = "version", help = "Print the application version") {
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("version" to APP_VERSION)))
        } else {
            echo("Version: $APP_VERSION")
        }
    }
}
