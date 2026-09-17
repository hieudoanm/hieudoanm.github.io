/*
 * pagify — write Markdown, run one command, get a beautiful website.
 */
package main

import (
	"os"

	"pagify/cmd"
)

func main() {
	// Execute reports the exit code itself, so nothing is printed here.
	os.Exit(cmd.Execute())
}
