package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newCompletionCmd() *cobra.Command {
	var shell string
	cmd := &cobra.Command{
		Use:   "completion [--shell <shell>]",
		Short: "Generate shell completion scripts",
		Long:  `Generate shell completion scripts for bash, zsh, or fish.`,
		Example: `  # Bash (add to ~/.bashrc)
  source <(hieudoanm completion --shell bash)

  # Zsh (add to ~/.zshrc)
  source <(hieudoanm completion --shell zsh)

  # Fish
  hieudoanm completion --shell fish > ~/.config/fish/completions/hieudoanm.fish`,
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

var completionCmd = newCompletionCmd()

func init() {
	rootCmd.AddCommand(completionCmd)
}
