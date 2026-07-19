package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"landify/internal/landify"
)

var newCmd = &cobra.Command{
	Use:   "new",
	Short: "Create a landify.yaml with placeholder content",
	Long: `Creates a landify.yaml file with placeholder content and a hint on
every field describing how to update it. --type selects which page layout to
scaffold (default: product); other types write their own annotated example.
Refuses to overwrite an existing file unless --force is given.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		file, err := cmd.Flags().GetString("file")
		if err != nil {
			return err
		}
		if _, err := os.Stat(file); err == nil && !force {
			return fmt.Errorf("%s already exists (use --force to overwrite)", file)
		}
		if err := landify.WritePlaceholder(file, newType); err != nil {
			return err
		}
		cmd.Printf("Created %s\nNext: landify validate\nthen: landify build\n", file)
		return nil
	},
}

var (
	force   bool
	newType string
)

func init() {
	newCmd.Flags().BoolVarP(&force, "force", "F", false, "overwrite an existing file")
	newCmd.Flags().StringVarP(&newType, "type", "t", "product", "page type to scaffold: product (default) | waitlist | event | download | app | pricing | portfolio | docs | faq | team | status | linktree")
}
