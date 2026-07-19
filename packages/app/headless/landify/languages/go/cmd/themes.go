package cmd

import (
	"sort"
	"strings"

	"github.com/spf13/cobra"

	"landify/internal/landify"
)

var themesCmd = &cobra.Command{
	Use:   "themes",
	Short: "List the built-in theme presets",
	Long: `Lists every built-in theme preset (name and one-line description),
one per line. Pass a name to landify build --theme to override the YAML theme
section.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		themes := landify.Themes()
		sort.Slice(themes, func(i, j int) bool {
			return themes[i].Name < themes[j].Name
		})
		var b strings.Builder
		for _, nt := range themes {
			b.WriteString(nt.Name)
			b.WriteString("\t")
			b.WriteString(nt.Description)
			b.WriteString("\n")
		}
		cmd.Print(b.String())
		return nil
	},
}
