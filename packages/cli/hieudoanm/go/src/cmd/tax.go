package cmd

import (
	"github.com/hieudoanm/hieudoanm/src/services/tax"
	"github.com/spf13/cobra"
)

/* =======================
   COMMAND
======================= */

var taxCmd = &cobra.Command{
	Use:   "tax",
	Short: "Run the calculate operation for the tax app",
	RunE: func(cmd *cobra.Command, args []string) error {
		return tax.RunUI()
	},
}

func init() {
	rootCmd.AddCommand(taxCmd)
}
