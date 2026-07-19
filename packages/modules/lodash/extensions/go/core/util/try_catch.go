package util

type Success[T any] struct {
	Data  T
	Error error
}

type Failure[T any] struct {
	Data  T
	Error error
}

type Result[T any] struct {
	Data  T
	Error error
}

func TryCatch[T any](fn func() (T, error)) Result[T] {
	data, err := fn()
	return Result[T]{Data: data, Error: err}
}
