package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newPrimeCmd() *cobra.Command {
	var list bool

	cmd := &cobra.Command{
		Use:   "prime <n>",
		Short: "Check if a number is prime, or generate primes up to N",
		Long:  `Test primality of a number, or list/count primes up to a limit with --list.`,
		Example: `  calc prime 17
  calc prime 100 --list
  calc prime 1000000 --count`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var n int64
			if _, err := fmt.Sscanf(args[0], "%d", &n); err != nil {
				return fmt.Errorf("invalid integer %q", args[0])
			}
			if n < 2 {
				return fmt.Errorf("number must be >= 2")
			}

			if list {
				primes := sieve(n)
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"limit":  n,
						"count":  len(primes),
						"primes": primes,
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					for _, p := range primes {
						fmt.Println(p)
					}
				}
				return nil
			}

			isPrime := isPrime(n)
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"number":   n,
					"is_prime": isPrime,
				}, "", "  ")
				fmt.Println(string(b))
			} else if isPrime {
				fmt.Printf("%d is prime\n", n)
			} else {
				fmt.Printf("%d is not prime\n", n)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&list, "list", "l", false, "List all primes up to N")
	return cmd
}
