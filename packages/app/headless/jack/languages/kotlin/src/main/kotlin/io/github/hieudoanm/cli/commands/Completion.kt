package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.PrintCompletionMessage
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.core.parse
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option

class CompletionCommand : CliktCommand(name = "completion") {
    override fun help(context: Context) = "Generate shell completion scripts"
    private val shell by option("--shell", "-s", help = "Shell type (bash, zsh, fish)").default("bash")

    override fun run() {
        val root = currentContext.findRoot().command as CliktCommand
        try {
            root.parse(arrayOf("--generate-completion", shell))
        } catch (e: PrintCompletionMessage) {
            echo(e.message!!.trimEnd())
        }
    }
}
