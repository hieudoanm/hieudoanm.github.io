package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/hieudoanm/hieudoanm/src/services/transcript"
	"github.com/spf13/cobra"
)

var (
	lang                 string
	outputTranscriptFile string
	format               string
	noTS                 bool
	listLangs            bool
)

var transcriptCmd = &cobra.Command{
	Use:   "fetch <video-id-or-url>",
	Short: "Run the fetch operation for the transcript app",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		videoID, err := extractVideoID(args[0])
		if err != nil {
			return err
		}

		client := transcript.NewClient()
		t, err := client.Fetch(videoID, lang)
		if err != nil {
			return err
		}

		fmt.Fprintf(os.Stderr, "✓ %s (%s, %s)\n", videoID, t.Language, t.Kind)

		var out string
		switch strings.ToLower(format) {
		case "json":
			b, _ := json.MarshalIndent(t, "", "  ")
			out = string(b)
		default:
			var sb strings.Builder
			for _, line := range t.Lines {
				if noTS {
					sb.WriteString(line.Text + "\n")
				} else {
					sb.WriteString(fmt.Sprintf("[%6.2fs] %s\n", line.Start, line.Text))
				}
			}
			out = sb.String()
		}

		if outputTranscriptFile != "" {
			return os.WriteFile(outputTranscriptFile, []byte(out), 0644)
		}
		fmt.Print(out)
		return nil
	},
}

func init() {
	youtubeCmd.AddCommand(transcriptCmd)
	transcriptCmd.Flags().StringVarP(&lang, "lang", "l", "en", "Language code (e.g. en, es, fr)")
	transcriptCmd.Flags().StringVarP(&outputTranscriptFile, "output", "o", "", "Save to file instead of stdout")
	transcriptCmd.Flags().StringVarP(&format, "format", "f", "text", "Output format: text or json")
	transcriptCmd.Flags().BoolVar(&noTS, "no-timestamps", false, "Omit timestamps from text output")
}
