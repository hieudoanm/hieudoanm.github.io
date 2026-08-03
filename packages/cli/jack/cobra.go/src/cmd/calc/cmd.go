package calc

import (
	"github.com/hieudoanm/jack/src/cmd/calc/age"
	"github.com/hieudoanm/jack/src/cmd/calc/base"
	"github.com/hieudoanm/jack/src/cmd/calc/bmi"
	"github.com/hieudoanm/jack/src/cmd/calc/compound"
	"github.com/hieudoanm/jack/src/cmd/calc/currency"
	"github.com/hieudoanm/jack/src/cmd/calc/date"
	"github.com/hieudoanm/jack/src/cmd/calc/discount"
	"github.com/hieudoanm/jack/src/cmd/calc/eval"
	"github.com/hieudoanm/jack/src/cmd/calc/factorial"
	"github.com/hieudoanm/jack/src/cmd/calc/gcd"
	"github.com/hieudoanm/jack/src/cmd/calc/lcm"
	"github.com/hieudoanm/jack/src/cmd/calc/loan"
	"github.com/hieudoanm/jack/src/cmd/calc/mortgage"
	"github.com/hieudoanm/jack/src/cmd/calc/percent"
	"github.com/hieudoanm/jack/src/cmd/calc/prime"
	"github.com/hieudoanm/jack/src/cmd/calc/random"
	"github.com/hieudoanm/jack/src/cmd/calc/stats"
	"github.com/hieudoanm/jack/src/cmd/calc/tax"
	"github.com/hieudoanm/jack/src/cmd/calc/tip"
	"github.com/hieudoanm/jack/src/cmd/calc/unit"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "calc",
		Short: "Financial and utility calculators",
		Long:  `A collection of calculator tools including tax calculation and compound interest.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		tax.NewCmd(),
		compound.NewCmd(),
		currency.NewCmd(),
		loan.NewCmd(),
		discount.NewCmd(),
		tip.NewCmd(),
		bmi.NewCmd(),
		base.NewCmd(),
		unit.NewCmd(),
		percent.NewCmd(),
		mortgage.NewCmd(),
		date.NewCmd(),
		eval.NewCmd(),
		stats.NewCmd(),
		factorial.NewCmd(),
		random.NewCmd(),
		prime.NewCmd(),
		gcd.NewCmd(),
		lcm.NewCmd(),
		age.NewCmd(),
	)

	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
