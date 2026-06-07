package reaction

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/AlecAivazis/survey/v2"
	"github.com/spf13/cobra"
)

const rounds = 5

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "reaction",
		Short: "Test your reaction time",
		Long:  `Press Enter when you see the cue. Your reaction time is measured in milliseconds over 5 rounds.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return play()
		},
	}
}

func play() error {
	fmt.Println()
	fmt.Println("  REACTION TIME")
	fmt.Println("  Press Enter when you see the cue.")
	fmt.Printf("  %d rounds. Best, worst, and average will be shown.\n\n", rounds)
	fmt.Println("  Press Enter to start...")
	fmt.Scanln()

	var times []time.Duration

	for i := 0; i < rounds; i++ {
		fmt.Print("  Get ready...")
		delay := time.Duration(1000+rand.Intn(4000)) * time.Millisecond
		time.Sleep(delay)

		fmt.Print("\r  \033[32mNOW!\033[0m                 \n")

		start := time.Now()
		var input string
		prompt := &survey.Input{
			Message: "  >",
		}
		if err := survey.AskOne(prompt, &input); err != nil {
			return nil
		}
		reaction := time.Since(start)
		times = append(times, reaction)

		fmt.Printf("  \033[90m%dms\033[0m\n\n", reaction.Milliseconds())
	}

	best := times[0]
	worst := times[0]
	var total time.Duration
	for _, t := range times {
		if t < best {
			best = t
		}
		if t > worst {
			worst = t
		}
		total += t
	}
	avg := total / time.Duration(len(times))

	fmt.Printf("  Results:\n")
	fmt.Printf("    Best:    %dms\n", best.Milliseconds())
	fmt.Printf("    Worst:   %dms\n", worst.Milliseconds())
	fmt.Printf("    Average: %dms\n", avg.Milliseconds())
	fmt.Println()

	return nil
}
