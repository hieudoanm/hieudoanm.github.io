package shared

import (
	requests "github.com/hieudoanm/jack/src/libs/requests"
)

type FetchFunc func(url string, opts requests.Options) ([]byte, error)

var FetchFuncDefault FetchFunc = requests.Get
