/*
Landify — build a flat landing page from a single YAML file.
*/
package io.github.hieudoanm.landify

import com.github.ajalt.clikt.core.main
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.versionOption
import io.github.hieudoanm.landify.cli.BuildCommand
import io.github.hieudoanm.landify.cli.LandifyCommand
import io.github.hieudoanm.landify.cli.NewCommand
import io.github.hieudoanm.landify.cli.ServeCommand
import io.github.hieudoanm.landify.cli.StudioCommand
import io.github.hieudoanm.landify.cli.ThemesCommand
import io.github.hieudoanm.landify.cli.TuiCommand
import io.github.hieudoanm.landify.cli.ValidateCommand

/** Parses [args] and runs the matching command, exiting non-zero on failure. */
fun main(args: Array<String>) = LandifyCommand()
    .subcommands(
        NewCommand(),
        ValidateCommand(),
        BuildCommand(),
        ThemesCommand(),
        ServeCommand(),
        TuiCommand(),
        StudioCommand(),
    )
    .versionOption(VERSION, names = setOf("--version", "-V"), message = { "landify $it" })
    .main(args)
