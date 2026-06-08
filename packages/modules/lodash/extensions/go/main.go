//go:build js && wasm

package main

import (
	"syscall/js"
	"time"

	"github.com/hieudoanm/lodashx/core/color"
	"github.com/hieudoanm/lodashx/core/convert"
	"github.com/hieudoanm/lodashx/core/date"
	"github.com/hieudoanm/lodashx/core/number"
)

func jsDate(v js.Value) time.Time {
	if v.IsNull() || v.IsUndefined() {
		return time.Now()
	}
	millis := v.Get("getTime").Invoke().Int()
	return time.UnixMilli(int64(millis))
}

func main() {
	// --- Date: Diff ---
	js.Global().Set("diff", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		a, b := jsDate(args[0]), jsDate(args[1])
		d := date.Diff(a, b)
		return map[string]interface{}{
			"days":    d.Days(),
			"hours":   d.Hours(),
			"minutes": d.Minutes(),
			"seconds": d.Seconds(),
		}
	}))
	js.Global().Set("diffTime", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.DiffTime(jsDate(args[0]), jsDate(args[1]))
	}))
	js.Global().Set("diffDays", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.DiffDays(jsDate(args[0]), jsDate(args[1]))
	}))
	js.Global().Set("diffHours", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.DiffHours(jsDate(args[0]), jsDate(args[1]))
	}))
	js.Global().Set("diffMinutes", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.DiffMinutes(jsDate(args[0]), jsDate(args[1]))
	}))
	js.Global().Set("diffSeconds", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.DiffSeconds(jsDate(args[0]), jsDate(args[1]))
	}))

	// --- Date: Format ---
	js.Global().Set("formatDate", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		sep := "-"
		if len(args) > 1 && args[1].Type() == js.TypeString {
			sep = args[1].String()
		}
		return date.FormatDate(jsDate(args[0]), sep)
	}))
	js.Global().Set("formatTime", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		ws := false
		if len(args) > 1 {
			ws = args[1].Bool()
		}
		return date.FormatTime(jsDate(args[0]), ws)
	}))
	js.Global().Set("formatDateTime", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.FormatDateTime(jsDate(args[0]))
	}))

	// --- Date: Calendar ---
	js.Global().Set("calendar", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		year, month := args[0].Int(), args[1].Int()
		grid := date.Calendar(year, month)
		result := make([]interface{}, len(grid))
		for i, week := range grid {
			w := make([]interface{}, len(week))
			for j, day := range week {
				cm := "current"
				switch day.CurrentMonth {
				case date.CurrentMonthPrevious:
					cm = "previous"
				case date.CurrentMonthNext:
					cm = "next"
				}
				w[j] = map[string]interface{}{
					"date":         day.Date,
					"currentMonth": cm,
				}
			}
			result[i] = w
		}
		return result
	}))
	js.Global().Set("weekOfYear", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return date.WeekOfYear(jsDate(args[0]))
	}))

	// --- Date: LunarCalendar ---
	js.Global().Set("LunarCalendar", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		lc := date.LunarCalendar{}
		return map[string]interface{}{
			"leapDays": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				return lc.LeapDays(args2[0].Int())
			}),
			"leapMonth": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				return lc.LeapMonth(args2[0].Int())
			}),
			"lYearDays": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				return lc.LYearDays(args2[0].Int())
			}),
			"monthDays": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				return lc.MonthDays(args2[0].Int(), args2[1].Int())
			}),
			"solarToLunar": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				result, err := lc.SolarToLunar(args2[0].Int(), args2[1].Int(), args2[2].Int())
				if err != nil {
					return -1
				}
				return map[string]interface{}{
					"isToday": result.IsToday,
					"lYear":   result.LYear,
					"lMonth":  result.LMonth,
					"lDay":    result.LDay,
					"cYear":   result.CYear,
					"cMonth":  result.CMonth,
					"cDay":    result.CDay,
				}
			}),
		}
	}))

	// --- Number ---
	js.Global().Set("convertBase", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		n := args[0].String()
		return map[string]interface{}{
			"from": js.FuncOf(func(this js.Value, args2 []js.Value) interface{} {
				fb := args2[0].Int()
				return map[string]interface{}{
					"to": js.FuncOf(func(this js.Value, args3 []js.Value) interface{} {
						return number.ConvertBase(n).From(fb).To(args3[0].Int())
					}),
				}
			}),
		}
	}))
	js.Global().Set("padZero", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		l := 2
		if len(args) > 1 {
			l = args[1].Int()
		}
		return number.PadZero(int64(args[0].Int()), l)
	}))
	js.Global().Set("formatCurrency", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		cur := "USD"
		if len(args) > 1 {
			cur = args[1].String()
		}
		return number.FormatCurrency(args[0].Float(), cur)
	}))
	js.Global().Set("formatComma", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return number.FormatComma(int64(args[0].Int()))
	}))
	js.Global().Set("arabicToRoman", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return number.ArabicToRoman(args[0].Int())
	}))
	js.Global().Set("romanToArabic", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return number.RomanToArabic(args[0].String())
	}))

	// --- Color ---
	js.Global().Set("componentToHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.ComponentToHex(uint8(args[0].Int()))
	}))
	js.Global().Set("rgbToHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.RgbToHex(uint8(args[0].Int()), uint8(args[1].Int()), uint8(args[2].Int()))
	}))
	js.Global().Set("hexToRgb", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		r, g, b, ok := color.HexToRgb(args[0].String())
		if !ok {
			return nil
		}
		return map[string]interface{}{"r": r, "g": g, "b": b}
	}))
	js.Global().Set("hexToHsl", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		h, s, l := color.HexToHsl(args[0].String())
		return map[string]interface{}{"h": h, "s": s, "l": l}
	}))
	js.Global().Set("rgbToHsl", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		h, s, l := color.RgbToHsl(uint8(args[0].Int()), uint8(args[1].Int()), uint8(args[2].Int()))
		return map[string]interface{}{"h": h, "s": s, "l": l}
	}))
	js.Global().Set("hslToRgb", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		r, g, b := color.HslToRgb(args[0].Float(), args[1].Float(), args[2].Float())
		return map[string]interface{}{"r": r, "g": g, "b": b}
	}))
	js.Global().Set("hslToHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.HslToHex(args[0].Float(), args[1].Float(), args[2].Float())
	}))
	js.Global().Set("hexToCmyk", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		c, m, y, k := color.HexToCmyk(args[0].String())
		return map[string]interface{}{"c": c, "m": m, "y": y, "k": k}
	}))
	js.Global().Set("cmykToHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.CmykToHex(args[0].Float(), args[1].Float(), args[2].Float(), args[3].Float())
	}))
	js.Global().Set("cmykToHsl", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		h, s, l := color.CmykToHsl(args[0].Float(), args[1].Float(), args[2].Float(), args[3].Float())
		return map[string]interface{}{"h": h, "s": s, "l": l}
	}))
	js.Global().Set("hslToCmyk", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		c, m, y, k := color.HslToCmyk(args[0].Float(), args[1].Float(), args[2].Float())
		return map[string]interface{}{"c": c, "m": m, "y": y, "k": k}
	}))
	js.Global().Set("hexToOklch", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		l, c, h := color.HexToOklch(args[0].String())
		return map[string]interface{}{"l": l, "c": c, "h": h}
	}))
	js.Global().Set("oklchToHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.OklchToHex(args[0].Float(), args[1].Float(), args[2].Float())
	}))
	js.Global().Set("brightness", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.Brightness(args[0].String())
	}))
	js.Global().Set("randomHex", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return color.RandomHex()
	}))

	// --- Convert (JSON / Code Gen) ---
	js.Global().Set("parseJson", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		def := interface{}(nil)
		if len(args) > 1 {
			def = args[1].String()
		}
		return convert.ParseJson(args[0].String(), def)
	}))
	js.Global().Set("jsonToCsv", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		data := jsToInterface(args[0])
		return convert.JsonToCsv(data)
	}))
	js.Global().Set("toJava", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		rootName := "Root"
		if len(args) > 1 {
			rootName = args[1].String()
		}
		return convert.ToJava(jsToInterface(args[0]), rootName)
	}))
	js.Global().Set("toPython", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		rootName := "Root"
		if len(args) > 1 {
			rootName = args[1].String()
		}
		return convert.ToPython(jsToInterface(args[0]), rootName)
	}))
	js.Global().Set("toRust", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		rootName := "Root"
		if len(args) > 1 {
			rootName = args[1].String()
		}
		return convert.ToRust(jsToInterface(args[0]), rootName)
	}))
	js.Global().Set("toTS", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		rootName := "Root"
		indentSize := 2
		if len(args) > 1 {
			rootName = args[1].String()
		}
		if len(args) > 2 {
			indentSize = args[2].Int()
		}
		return convert.ToTS(jsToInterface(args[0]), rootName, indentSize)
	}))
	js.Global().Set("toXml", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		indent := true
		indentSize := 2
		declaration := false
		rootName := ""
		if len(args) > 1 {
			indent = args[1].Bool()
		}
		if len(args) > 2 {
			indentSize = args[2].Int()
		}
		if len(args) > 3 {
			declaration = args[3].Bool()
		}
		if len(args) > 4 && args[4].Type() == js.TypeString {
			rootName = args[4].String()
		}
		return convert.ToXml(jsToInterface(args[0]), indent, indentSize, declaration, rootName)
	}))

	select {}
}

func jsToInterface(v js.Value) interface{} {
	switch v.Type() {
	case js.TypeNull, js.TypeUndefined:
		return nil
	case js.TypeBoolean:
		return v.Bool()
	case js.TypeNumber:
		f := v.Float()
		if f == float64(int64(f)) {
			return int64(f)
		}
		return f
	case js.TypeString:
		return v.String()
	case js.TypeObject:
		if v.InstanceOf(js.Global().Get("Array")) {
			length := v.Get("length").Int()
			arr := make([]interface{}, length)
			for i := 0; i < length; i++ {
				arr[i] = jsToInterface(v.Index(i))
			}
			return arr
		}
		if !v.IsNull() {
			keys := js.Global().Get("Object").Call("keys", v)
			length := keys.Get("length").Int()
			obj := make(map[string]interface{}, length)
			for i := 0; i < length; i++ {
				key := keys.Index(i).String()
				obj[key] = jsToInterface(v.Get(key))
			}
			return obj
		}
		return nil
	default:
		return nil
	}
}
