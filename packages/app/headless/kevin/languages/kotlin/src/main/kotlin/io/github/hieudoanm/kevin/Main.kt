package io.github.hieudoanm.kevin

import com.github.ajalt.clikt.core.main
import com.github.ajalt.clikt.core.subcommands
import io.github.hieudoanm.kevin.cli.Kevin
import io.github.hieudoanm.kevin.cli.ServeCommand

fun main(args: Array<String>) = Kevin().subcommands(ServeCommand()).main(args)
