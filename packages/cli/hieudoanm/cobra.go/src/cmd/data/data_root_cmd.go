package data

import (
	"github.com/hieudoanm/jack/src/cmd/data/csv"
	"github.com/hieudoanm/jack/src/cmd/data/json"
	"github.com/hieudoanm/jack/src/cmd/data/yml"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "data",
		Short: "Data serialization and transformation tools",
		Long:  `Format, convert, and validate JSON, YAML, and CSV.`,
		Example: `  data csv data.csv
  data yml config.yml --validate
  data json data.json --query ".name"`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		csv.NewCmd(),
		json.NewCmd(),
		yml.NewCmd(),
	)
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
