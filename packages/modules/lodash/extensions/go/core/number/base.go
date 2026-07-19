package number

import (
	"fmt"
	"math/big"
	"strings"
)

type ConvertBaseBuilder struct {
	number string
}

type ConvertBaseTarget struct {
	decimal *big.Int
	ok      bool
}

func ConvertBase(number string) ConvertBaseBuilder {
	return ConvertBaseBuilder{number: number}
}

func (c ConvertBaseBuilder) From(fromBase int) ConvertBaseTarget {
	n, ok := new(big.Int).SetString(c.number, fromBase)
	return ConvertBaseTarget{decimal: n, ok: ok}
}

func (t ConvertBaseTarget) To(toBase int) string {
	if !t.ok || t.decimal == nil {
		return "Invalid number or base"
	}
	return strings.ToUpper(fmt.Sprintf("%X", t.decimal))
}
