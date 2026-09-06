package completion

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func NewCommand(rootCmd *cobra.Command) *cobra.Command {
	var shell string
	cmd := &cobra.Command{
		Use:   "completion [--shell <shell>]",
		Short: "Generate shell completion scripts",
		Long:  `Generate shell completion scripts for bash, zsh, or fish.`,
		Example: `  # Bash (add to ~/.bashrc)
  source <(jack completion --shell bash)

  # Zsh (add to ~/.zshrc)
  source <(jack completion --shell zsh)

  # Fish
  jack completion --shell fish > ~/.config/fish/completions/jack.fish`,
		RunE: func(cmd *cobra.Command, args []string) error {
			switch shell {
			case "bash":
				return rootCmd.GenBashCompletion(os.Stdout)
			case "zsh":
				return rootCmd.GenZshCompletion(os.Stdout)
			case "fish":
				return rootCmd.GenFishCompletion(os.Stdout, true)
			default:
				return fmt.Errorf("unsupported shell: %s (use bash, zsh, or fish)", shell)
			}
		},
	}

	cmd.Flags().StringVarP(&shell, "shell", "s", "", "Shell type (bash, zsh, fish)")
	return cmd
}
