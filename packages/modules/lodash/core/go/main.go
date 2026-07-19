package main

import (
	"fmt"
	"reflect"
	"syscall/js"

	"github.com/hieudoanm/lodash/core/array"
	"github.com/hieudoanm/lodash/core/collection"
	"github.com/hieudoanm/lodash/core/date"
	"github.com/hieudoanm/lodash/core/function"
	"github.com/hieudoanm/lodash/core/lang"
	m "github.com/hieudoanm/lodash/core/math"
	"github.com/hieudoanm/lodash/core/number"
	"github.com/hieudoanm/lodash/core/object"
	s "github.com/hieudoanm/lodash/core/string"
	"github.com/hieudoanm/lodash/core/util"
)

func toJS(v interface{}) js.Value {
	if v == nil {
		return js.Undefined()
	}
	rv := reflect.ValueOf(v)
	switch rv.Kind() {
	case reflect.Bool:
		return js.ValueOf(rv.Bool())
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return js.ValueOf(rv.Int())
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return js.ValueOf(float64(rv.Uint()))
	case reflect.Float32, reflect.Float64:
		return js.ValueOf(rv.Float())
	case reflect.String:
		return js.ValueOf(rv.String())
	case reflect.Slice, reflect.Array:
		l := rv.Len()
		arr := js.Global().Get("Array").New(l)
		for i := 0; i < l; i++ {
			arr.SetIndex(i, toJS(rv.Index(i).Interface()))
		}
		return arr
	case reflect.Map:
		obj := js.Global().Get("Object").New()
		for _, k := range rv.MapKeys() {
			key := fmt.Sprintf("%v", k.Interface())
			obj.Set(key, toJS(rv.MapIndex(k).Interface()))
		}
		return obj
	case reflect.Func:
		fn := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
			typ := rv.Type()
			numIn := typ.NumIn()
			isVariadic := typ.IsVariadic()
			in := make([]reflect.Value, 0, len(args))
			for i := 0; i < len(args); i++ {
				var paramType reflect.Type
				if isVariadic && i >= numIn-1 {
					paramType = typ.In(numIn - 1).Elem()
				} else if i < numIn {
					paramType = typ.In(i)
				} else {
					break
				}
				in = append(in, reflect.ValueOf(fromJS(args[i], paramType)))
			}
			if isVariadic && len(args) < numIn {
				for i := len(args); i < numIn; i++ {
					in = append(in, reflect.Zero(typ.In(i)))
				}
			}
			var result []reflect.Value
			if isVariadic && len(in) >= numIn {
				nonVariadic := in[:numIn-1]
				variadic := in[numIn-1:]
				variadicSlice := reflect.MakeSlice(typ.In(numIn-1), len(variadic), len(variadic))
				for j, v := range variadic {
					variadicSlice.Index(j).Set(v)
				}
				all := append(nonVariadic, variadicSlice)
				result = rv.Call(all)
			} else {
				result = rv.Call(in)
			}
			if len(result) > 0 {
				return toJS(result[0].Interface())
			}
			return nil
		})
		funcs = append(funcs, fn)
		return fn.Value
	default:
		return js.ValueOf(v)
	}
}

func fromJS(v js.Value, targetType reflect.Type) interface{} {
	if v.IsUndefined() || v.IsNull() {
		return nil
	}
	if targetType != nil {
		switch targetType.Kind() {
		case reflect.Bool:
			return v.Bool()
		case reflect.Int:
			return v.Int()
		case reflect.Int64:
			return v.Int()
		case reflect.Float64:
			return v.Float()
		case reflect.String:
			return v.String()
		case reflect.Func:
			return jsFuncToGoFunc(v, targetType)
		case reflect.Slice:
			return jsSliceToGoSlice(v, targetType)
		case reflect.Map:
			return jsObjectToGoMap(v, targetType)
		}
	}
	switch v.Type() {
	case js.TypeBoolean:
		return v.Bool()
	case js.TypeNumber:
		return v.Float()
	case js.TypeString:
		return v.String()
	case js.TypeObject:
		if v.InstanceOf(js.Global().Get("Array")) {
			l := v.Length()
			out := make([]interface{}, l)
			for i := 0; i < l; i++ {
				out[i] = fromJS(v.Index(i), nil)
			}
			return out
		}
		return jsObjectToStringMap(v)
	default:
		return v.String()
	}
}

func jsFuncToGoFunc(v js.Value, targetType reflect.Type) interface{} {
	return reflect.MakeFunc(targetType, func(args []reflect.Value) []reflect.Value {
		jsArgs := make([]interface{}, len(args))
		for i, arg := range args {
			jsArgs[i] = arg.Interface()
		}
		result := v.Invoke(jsArgs...)
		out := make([]reflect.Value, targetType.NumOut())
		if targetType.NumOut() > 0 {
			out[0] = reflect.ValueOf(fromJS(result, targetType.Out(0)))
		}
		return out
	}).Interface()
}

func jsSliceToGoSlice(v js.Value, targetType reflect.Type) interface{} {
	l := v.Length()
	elemType := targetType.Elem()
	slice := reflect.MakeSlice(targetType, l, l)
	for i := 0; i < l; i++ {
		slice.Index(i).Set(reflect.ValueOf(fromJS(v.Index(i), elemType)))
	}
	return slice.Interface()
}

func jsObjectToStringMap(v js.Value) map[string]interface{} {
	out := make(map[string]interface{})
	keys := js.Global().Get("Object").Call("keys", v)
	l := keys.Length()
	for i := 0; i < l; i++ {
		key := keys.Index(i).String()
		out[key] = fromJS(v.Get(key), nil)
	}
	return out
}

func jsObjectToGoMap(v js.Value, targetType reflect.Type) interface{} {
	if targetType.Elem().Kind() == reflect.Interface {
		return jsObjectToStringMap(v)
	}
	m := reflect.MakeMap(targetType)
	keys := js.Global().Get("Object").Call("keys", v)
	l := keys.Length()
	for i := 0; i < l; i++ {
		key := keys.Index(i).String()
		m.SetMapIndex(
			reflect.ValueOf(key),
			reflect.ValueOf(fromJS(v.Get(key), targetType.Elem())),
		)
	}
	return m.Interface()
}

func toFloat64Slice(v js.Value) []float64 {
	l := v.Length()
	out := make([]float64, l)
	for i := 0; i < l; i++ {
		out[i] = v.Index(i).Float()
	}
	return out
}

func toInterfaceSlice(v js.Value) []interface{} {
	l := v.Length()
	out := make([]interface{}, l)
	for i := 0; i < l; i++ {
		out[i] = fromJS(v.Index(i), nil)
	}
	return out
}

func toStringSlice(v js.Value) []string {
	l := v.Length()
	out := make([]string, l)
	for i := 0; i < l; i++ {
		out[i] = v.Index(i).String()
	}
	return out
}

func toMapStringInterface(v js.Value) map[string]interface{} {
	return jsObjectToStringMap(v)
}

var funcs []js.Func

func export(name string, fn func(this js.Value, args []js.Value) interface{}) {
	f := js.FuncOf(fn)
	funcs = append(funcs, f)
	js.Global().Set("_"+name, f.Value)
}

func main() {
	c := make(chan struct{}, 0)

	export("chunk", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Chunk(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("compact", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Compact(toInterfaceSlice(args[0])))
	})
	export("concat", func(this js.Value, args []js.Value) interface{} {
		vals := make([][]interface{}, len(args)-1)
		for i := 1; i < len(args); i++ {
			vals[i-1] = toInterfaceSlice(args[i])
		}
		return toJS(array.Concat(toInterfaceSlice(args[0]), vals...))
	})
	export("difference", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Difference(toInterfaceSlice(args[0]), toInterfaceSlice(args[1])))
	})
	export("drop", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Drop(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("dropRight", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.DropRight(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("fill", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Fill(toInterfaceSlice(args[0]), fromJS(args[1], nil), args[2].Int(), args[3].Int()))
	})
	export("flatten", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Flatten(toInterfaceSlice(args[0])))
	})
	export("flattenDeep", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.FlattenDeep(toInterfaceSlice(args[0])))
	})
	export("flattenDepth", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.FlattenDepth(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("head", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Head(toInterfaceSlice(args[0])))
	})
	export("indexOf", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.IndexOf(toFloat64Slice(args[0]), args[1].Float(), args[2].Int()))
	})
	export("initial", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Initial(toInterfaceSlice(args[0])))
	})
	export("intersection", func(this js.Value, args []js.Value) interface{} {
		arrays := make([][]interface{}, len(args))
		for i := 0; i < len(args); i++ {
			arrays[i] = toInterfaceSlice(args[i])
		}
		return toJS(array.Intersection(arrays...))
	})
	export("join", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Join(toInterfaceSlice(args[0]), args[1].String()))
	})
	export("last", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Last(toInterfaceSlice(args[0])))
	})
	export("nth", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Nth(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("pull", func(this js.Value, args []js.Value) interface{} {
		vals := make([]interface{}, len(args)-1)
		for i := 1; i < len(args); i++ {
			vals[i-1] = fromJS(args[i], nil)
		}
		return toJS(array.Pull(toInterfaceSlice(args[0]), vals...))
	})
	export("reverse", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Reverse(toInterfaceSlice(args[0])))
	})
	export("slice", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Slice(toInterfaceSlice(args[0]), args[1].Int(), args[2].Int()))
	})
	export("sortedIndex", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.SortedIndex(toFloat64Slice(args[0]), args[1].Float()))
	})
	export("sortedUniq", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.SortedUniq(toFloat64Slice(args[0])))
	})
	export("tail", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Tail(toInterfaceSlice(args[0])))
	})
	export("take", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Take(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("takeRight", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.TakeRight(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("union", func(this js.Value, args []js.Value) interface{} {
		arrays := make([][]interface{}, len(args))
		for i := 0; i < len(args); i++ {
			arrays[i] = toInterfaceSlice(args[i])
		}
		return toJS(array.Union(arrays...))
	})
	export("uniq", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.Uniq(toInterfaceSlice(args[0])))
	})
	export("without", func(this js.Value, args []js.Value) interface{} {
		vals := make([]interface{}, len(args)-1)
		for i := 1; i < len(args); i++ {
			vals[i-1] = fromJS(args[i], nil)
		}
		return toJS(array.Without(toInterfaceSlice(args[0]), vals...))
	})
	export("zip", func(this js.Value, args []js.Value) interface{} {
		arrays := make([][]interface{}, len(args))
		for i := 0; i < len(args); i++ {
			arrays[i] = toInterfaceSlice(args[i])
		}
		return toJS(array.Zip(arrays...))
	})
	export("zipObject", func(this js.Value, args []js.Value) interface{} {
		return toJS(array.ZipObject(toInterfaceSlice(args[0]), toInterfaceSlice(args[1])))
	})

	export("camelCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.CamelCase(args[0].String()))
	})
	export("capitalize", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Capitalize(args[0].String()))
	})
	export("deburr", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Deburr(args[0].String()))
	})
	export("escape", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Escape(args[0].String()))
	})
	export("escapeRegExp", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.EscapeRegExp(args[0].String()))
	})
	export("kebabCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.KebabCase(args[0].String()))
	})
	export("lowerCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.LowerCase(args[0].String()))
	})
	export("lowerFirst", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.LowerFirst(args[0].String()))
	})
	export("pad", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Pad(args[0].String(), args[1].Int(), args[2].String()))
	})
	export("padEnd", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.PadEnd(args[0].String(), args[1].Int(), args[2].String()))
	})
	export("padStart", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.PadStart(args[0].String(), args[1].Int(), args[2].String()))
	})
	export("repeat", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Repeat(args[0].String(), args[1].Int()))
	})
	export("replace", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Replace(args[0].String(), args[1].String(), args[2].String()))
	})
	export("snakeCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.SnakeCase(args[0].String()))
	})
	export("split", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Split(args[0].String(), args[1].String(), args[2].Int()))
	})
	export("startCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.StartCase(args[0].String()))
	})
	export("toLower", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.ToLower(args[0].String()))
	})
	export("toUpper", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.ToUpper(args[0].String()))
	})
	export("trim", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Trim(args[0].String(), args[1].String()))
	})
	export("trimEnd", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.TrimEnd(args[0].String(), args[1].String()))
	})
	export("trimStart", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.TrimStart(args[0].String(), args[1].String()))
	})
	export("upperCase", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.UpperCase(args[0].String()))
	})
	export("upperFirst", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.UpperFirst(args[0].String()))
	})
	export("words", func(this js.Value, args []js.Value) interface{} {
		return toJS(s.Words(args[0].String()))
	})

	export("countBy", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.CountBy(toInterfaceSlice(args[0]), func(v interface{}) interface{} {
			return fromJS(args[1].Invoke(toJS(v)), nil)
		}))
	})
	export("every", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Every(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("filter", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Filter(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("find", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Find(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("forEach", func(this js.Value, args []js.Value) interface{} {
		collection.ForEach(toInterfaceSlice(args[0]), func(v interface{}) {
			args[1].Invoke(toJS(v))
		})
		return nil
	})
	export("groupBy", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.GroupBy(toInterfaceSlice(args[0]), func(v interface{}) interface{} {
			return fromJS(args[1].Invoke(toJS(v)), nil)
		}))
	})
	export("includes", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Includes(toInterfaceSlice(args[0]), fromJS(args[1], nil), args[2].Int()))
	})
	export("keyBy", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.KeyBy(toInterfaceSlice(args[0]), func(v interface{}) interface{} {
			return fromJS(args[1].Invoke(toJS(v)), nil)
		}))
	})
	export("map", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Map(toInterfaceSlice(args[0]), func(v interface{}) interface{} {
			return fromJS(args[1].Invoke(toJS(v)), nil)
		}))
	})
	export("partition", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Partition(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("reduce", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Reduce(toInterfaceSlice(args[0]), func(acc, v interface{}) interface{} {
			return fromJS(args[1].Invoke(toJS(acc), toJS(v)), nil)
		}, fromJS(args[2], nil)))
	})
	export("reject", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Reject(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("sample", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Sample(toInterfaceSlice(args[0])))
	})
	export("sampleSize", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.SampleSize(toInterfaceSlice(args[0]), args[1].Int()))
	})
	export("shuffle", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Shuffle(toInterfaceSlice(args[0])))
	})
	export("size", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Size(toInterfaceSlice(args[0])))
	})
	export("some", func(this js.Value, args []js.Value) interface{} {
		return toJS(collection.Some(toInterfaceSlice(args[0]), func(v interface{}) bool {
			return args[1].Invoke(toJS(v)).Truthy()
		}))
	})
	export("sortBy", func(this js.Value, args []js.Value) interface{} {
		iteratees := make([]func(interface{}) interface{}, args[1].Length())
		for i := 0; i < args[1].Length(); i++ {
			fn := args[1].Index(i)
			iteratees[i] = func(v interface{}) interface{} {
				return fromJS(fn.Invoke(toJS(v)), nil)
			}
		}
		return toJS(collection.SortBy(toInterfaceSlice(args[0]), iteratees))
	})

	export("now", func(this js.Value, args []js.Value) interface{} {
		return toJS(date.Now())
	})

	export("add", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Add(args[0].Float(), args[1].Float()))
	})
	export("ceil", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Ceil(args[0].Float()))
	})
	export("divide", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Divide(args[0].Float(), args[1].Float()))
	})
	export("floor", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Floor(args[0].Float()))
	})
	export("max", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Max(toFloat64Slice(args[0])))
	})
	export("mean", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Mean(toFloat64Slice(args[0])))
	})
	export("min", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Min(toFloat64Slice(args[0])))
	})
	export("multiply", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Multiply(args[0].Float(), args[1].Float()))
	})
	export("round", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Round(args[0].Float()))
	})
	export("subtract", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Subtract(args[0].Float(), args[1].Float()))
	})
	export("sum", func(this js.Value, args []js.Value) interface{} {
		return toJS(m.Sum(toFloat64Slice(args[0])))
	})

	export("clamp", func(this js.Value, args []js.Value) interface{} {
		return toJS(number.Clamp(args[0].Float(), args[1].Float(), args[2].Float()))
	})
	export("inRange", func(this js.Value, args []js.Value) interface{} {
		params := make([]float64, len(args))
		for i := 0; i < len(args); i++ {
			params[i] = args[i].Float()
		}
		return toJS(number.InRange(params...))
	})
	export("random", func(this js.Value, args []js.Value) interface{} {
		return toJS(number.Random(args[0].Int(), args[1].Int()))
	})

	export("get", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Get(toMapStringInterface(args[0]), args[1].String()))
	})
	export("set", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Set(toMapStringInterface(args[0]), args[1].String(), fromJS(args[2], nil)))
	})
	export("has", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Has(toMapStringInterface(args[0]), args[1].String()))
	})
	export("keys", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Keys(toMapStringInterface(args[0])))
	})
	export("values", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Values(toMapStringInterface(args[0])))
	})
	export("omit", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Omit(toMapStringInterface(args[0]), toStringSlice(args[1])...))
	})
	export("pick", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Pick(toMapStringInterface(args[0]), toStringSlice(args[1])...))
	})
	export("merge", func(this js.Value, args []js.Value) interface{} {
		sources := make([]map[string]interface{}, len(args)-1)
		for i := 1; i < len(args); i++ {
			sources[i-1] = toMapStringInterface(args[i])
		}
		return toJS(object.Merge(toMapStringInterface(args[0]), sources...))
	})
	export("defaults", func(this js.Value, args []js.Value) interface{} {
		sources := make([]map[string]interface{}, len(args)-1)
		for i := 1; i < len(args); i++ {
			sources[i-1] = toMapStringInterface(args[i])
		}
		return toJS(object.Defaults(toMapStringInterface(args[0]), sources...))
	})
	export("invert", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.Invert(toMapStringInterface(args[0])))
	})
	export("pickBy", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.PickBy(toMapStringInterface(args[0]), func(k string, v interface{}) bool {
			return args[1].Invoke(js.ValueOf(k), toJS(v)).Truthy()
		}))
	})
	export("omitBy", func(this js.Value, args []js.Value) interface{} {
		return toJS(object.OmitBy(toMapStringInterface(args[0]), func(k string, v interface{}) bool {
			return args[1].Invoke(js.ValueOf(k), toJS(v)).Truthy()
		}))
	})

	export("clone", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Clone(fromJS(args[0], nil)))
	})
	export("cloneDeep", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.CloneDeep(fromJS(args[0], nil)))
	})
	export("eq", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Eq(fromJS(args[0], nil), fromJS(args[1], nil)))
	})
	export("gt", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Gt(args[0].Float(), args[1].Float()))
	})
	export("gte", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Gte(args[0].Float(), args[1].Float()))
	})
	export("lt", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Lt(args[0].Float(), args[1].Float()))
	})
	export("lte", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.Lte(args[0].Float(), args[1].Float()))
	})
	export("isArray", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsArray(fromJS(args[0], nil)))
	})
	export("isBoolean", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsBoolean(fromJS(args[0], nil)))
	})
	export("isEmpty", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsEmpty(fromJS(args[0], nil)))
	})
	export("isEqual", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsEqual(fromJS(args[0], nil), fromJS(args[1], nil)))
	})
	export("isNil", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsNil(fromJS(args[0], nil)))
	})
	export("isNumber", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsNumber(fromJS(args[0], nil)))
	})
	export("isString", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsString(fromJS(args[0], nil)))
	})
	export("isFunction", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsFunction(fromJS(args[0], nil)))
	})
	export("isObject", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsObject(fromJS(args[0], nil)))
	})
	export("isUndefined", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.IsUndefined(fromJS(args[0], nil)))
	})
	export("toArray", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.ToArray(fromJS(args[0], nil)))
	})
	export("toNumber", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.ToNumber(fromJS(args[0], nil)))
	})
	export("toString", func(this js.Value, args []js.Value) interface{} {
		return toJS(lang.ToString(fromJS(args[0], nil)))
	})

	export("attempt", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.Attempt(
			func(v ...interface{}) interface{} {
				return fromJS(args[0].Invoke(toJS(v)), nil)
			},
			fromJS(args[1], nil),
		))
	})
	export("identity", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.Identity(fromJS(args[0], nil)))
	})
	export("range", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.Range(args[0].Int(), args[1].Int(), args[2].Int()))
	})
	export("uniqueId", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.UniqueId(args[0].String()))
	})
	export("times", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.Times(args[0].Int(), func(i int) interface{} {
			return fromJS(args[1].Invoke(js.ValueOf(i)), nil)
		}))
	})
	export("stubTrue", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.StubTrue())
	})
	export("stubFalse", func(this js.Value, args []js.Value) interface{} {
		return toJS(util.StubFalse())
	})
	export("noop", func(this js.Value, args []js.Value) interface{} {
		util.Noop()
		return nil
	})

	export("after", func(this js.Value, args []js.Value) interface{} {
		return toJS(function.After(args[0].Int(), func(v ...interface{}) interface{} {
			a := make([]interface{}, len(v))
			for i, x := range v {
				a[i] = x
			}
			jsArgs := make([]interface{}, len(v))
			for i, x := range v {
				jsArgs[i] = x
			}
			return fromJS(args[1].Invoke(jsArgs...), nil)
		}))
	})

	js.Global().Set("__lodashGoReady", js.ValueOf(true))
	println("lodash-go WASM module loaded")
	<-c
}
