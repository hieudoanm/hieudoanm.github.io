package utils

import (
	"fmt"

	"github.com/mbndr/figlet4go"
)

// LogProgramName ...
func LogProgramName() {
	ascii := figlet4go.NewAsciiRender()
	programString, _ := ascii.Render("Nothing CLI")
	fmt.Println(programString)
}
