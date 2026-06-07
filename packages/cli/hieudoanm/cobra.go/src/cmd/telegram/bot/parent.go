package bot

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "bot",
		Short: "Bot management",
		Long:  `Get bot info, manage bot profile, and configure bot settings.`,
		Example: `  telegram bot get-me
  telegram bot set-name --name "MyBot"
  telegram bot set-description --description "A helpful bot"
  telegram bot set-short-description --short-description "Does cool things"
  telegram bot set-commands --commands '[{"command":"start","description":"Start"}]'`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newGetMeCmd())
	cmd.AddCommand(newSetNameCmd())
	cmd.AddCommand(newSetDescriptionCmd())
	cmd.AddCommand(newSetShortDescriptionCmd())
	cmd.AddCommand(newSetCommandsCmd())
	return cmd
}
