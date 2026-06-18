package calc

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"

	"charm.land/bubbles/v2/textinput"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"
)

type step int

const (
	stepMode step = iota
	stepPeriod
	stepIncome
	stepDependents
	stepInsurance
	stepResult
)

type model struct {
	step       step
	mode       SalaryMode
	period     Period
	income     float64
	dependents int
	insurance  bool
	input      textinput.Model
}

var title = lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("212"))
var active = lipgloss.NewStyle().Foreground(lipgloss.Color("42"))
var dim = lipgloss.NewStyle().Foreground(lipgloss.Color("240"))

func initialModel() model {
	ti := textinput.New()
	ti.Focus()
	ti.CharLimit = 20

	return model{
		step:      stepMode,
		mode:      Gross,
		period:    Monthly,
		insurance: true,
		input:     ti,
	}
}

func (m model) Init() tea.Cmd {
	return nil
}

func runTaxUI() error {
	_, err := tea.NewProgram(initialModel()).Run()
	return err
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.KeyMsg:
		switch msg.String() {

		case "ctrl+c", "q":
			return m, tea.Quit

		case "left", "right":
			m.toggle()
			return m, nil

		case "enter":
			return m.next()
		}
	}

	if m.step == stepIncome || m.step == stepDependents {
		var cmd tea.Cmd
		m.input, cmd = m.input.Update(msg)
		return m, cmd
	}

	return m, nil
}

func (m *model) toggle() {
	switch m.step {
	case stepMode:
		if m.mode == Gross {
			m.mode = Net
		} else {
			m.mode = Gross
		}
	case stepPeriod:
		if m.period == Monthly {
			m.period = Annual
		} else {
			m.period = Monthly
		}
	case stepInsurance:
		m.insurance = !m.insurance
	}
}

func (m model) next() (tea.Model, tea.Cmd) {
	switch m.step {

	case stepMode:
		m.step = stepPeriod

	case stepPeriod:
		m.step = stepIncome
		m.input.Placeholder = "Thu nh\u1eadp (VND)"
		m.input.SetValue("")
		m.input.Focus()

	case stepIncome:
		if val, err := strconv.ParseFloat(m.input.Value(), 64); err == nil {
			m.income = val
		}
		m.step = stepDependents
		m.input.Placeholder = "S\u1ed1 ng\u01b0\u1eddi ph\u1ee5 thu\u1ed9c"
		m.input.SetValue("")
		m.input.Focus()

	case stepDependents:
		if val, err := strconv.Atoi(m.input.Value()); err == nil {
			m.dependents = val
		}
		m.input.Blur()
		m.step = stepInsurance

	case stepInsurance:
		m.step = stepResult

	case stepResult:
		exportCSV(m)
		return m, tea.Quit
	}

	return m, nil
}

func (m model) View() tea.View {
	switch m.step {

	case stepMode:
		return tea.NewView(
			title.Render("Ch\u1ebf \u0111\u1ed9 l\u01b0\u01a1ng\n\n") +
				radio("Gross \u2192 Net", m.mode == Gross) +
				radio("Net \u2192 Gross", m.mode == Net),
		)

	case stepPeriod:
		return tea.NewView(
			title.Render("K\u1ef3 t\u00ednh\n\n") +
				radio("Th\u00e1ng", m.period == Monthly) +
				radio("N\u0103m", m.period == Annual),
		)

	case stepIncome, stepDependents:
		return tea.NewView(
			title.Render("Nh\u1eadp d\u1eef li\u1ec7u\n\n") +
				m.input.View() + "\n\nEnter ti\u1ebfp t\u1ee5c",
		)

	case stepInsurance:
		return tea.NewView(
			title.Render("B\u1ea3o hi\u1ec3m\n\n") +
				radio("C\u00f3", m.insurance) +
				radio("Kh\u00f4ng", !m.insurance),
		)

	case stepResult:
		return tea.NewView(m.resultView())
	}

	return tea.NewView("")
}

func radio(label string, on bool) string {
	if on {
		return active.Render("\u25ce " + label + "\n")
	}
	return dim.Render("\u25cb " + label + "\n")
}

func (m model) resultView() string {
	var gross float64
	if m.mode == Gross {
		gross = toMonthly(m.income, m.period)
	} else {
		gross = solveGrossFromNet(m.income, m.dependents, m.insurance)
	}

	base := clampInsuranceBase(gross, m.insurance)
	empIns := base * sumRates(EmployeeInsurance)

	deductions := PersonalDeduction + float64(m.dependents)*DependentDeduction + empIns
	taxable := max(0, gross-deductions)
	breakdown, tax := calculateTax(taxable)
	net := gross - empIns - tax

	out := title.Render("K\u1ebft qu\u1ea3\n\n")
	out += fmt.Sprintf("Gross: %.0f VND\n", gross)
	out += fmt.Sprintf("Net:   %.0f VND\n", net)
	out += fmt.Sprintf("Tax:   %.0f VND\n\n", tax)

	out += "Chi ti\u1ebft:\n"
	for _, b := range breakdown {
		out += fmt.Sprintf(" %.0f%% \u2192 %.0f\n", b.Rate*100, b.Tax)
	}

	out += "\nEnter \u0111\u1ec3 xu\u1ea5t CSV \u2022 q \u0111\u1ec3 tho\u00e1t"
	return out
}

func exportCSV(m model) {
	file, _ := os.Create("pit-vietnam.csv")
	defer file.Close()

	w := csv.NewWriter(file)
	defer w.Flush()

	w.WriteAll([][]string{
		{"Gross", fmt.Sprintf("%.0f", m.income)},
	})
}
