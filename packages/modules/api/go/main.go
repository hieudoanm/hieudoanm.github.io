package main

import (
	"encoding/json"
	"strconv"
	"syscall/js"

	"github.com/hieudoanm/api/core/airvisual.com"
	"github.com/hieudoanm/api/core/chess.com"
	"github.com/hieudoanm/api/core/coinranking.com"
	"github.com/hieudoanm/api/core/crossref.org"
	"github.com/hieudoanm/api/core/deepseek.com"
	"github.com/hieudoanm/api/core/fixer.io"
	footballdata "github.com/hieudoanm/api/core/football-data.org"
	"github.com/hieudoanm/api/core/frankfurter.app"
	"github.com/hieudoanm/api/core/gemini.google.com"
	"github.com/hieudoanm/api/core/lichess.org"
	"github.com/hieudoanm/api/core/newsapi.org"
	"github.com/hieudoanm/api/core/openai.com"
	"github.com/hieudoanm/api/core/openweathermap.org"
	"github.com/hieudoanm/api/core/telegram.org"
)

var funcs []js.Func

func export(name string, fn func(this js.Value, args []js.Value) interface{}) {
	f := js.FuncOf(fn)
	funcs = append(funcs, f)
	js.Global().Set("_"+name, f.Value)
}

func main() {
	c := make(chan struct{}, 0)

	export("airvisualGetCountries", func(this js.Value, args []js.Value) interface{} {
		resp, err := airvisual.GetCountries(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("chessGetPlayers", func(this js.Value, args []js.Value) interface{} {
		resp, err := chess.NewChessClient().GetPlayers(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("chessGetPlayer", func(this js.Value, args []js.Value) interface{} {
		resp, err := chess.NewChessClient().GetPlayer(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("chessGetStats", func(this js.Value, args []js.Value) interface{} {
		resp, err := chess.NewChessClient().GetStats(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("coinrankingGetCoins", func(this js.Value, args []js.Value) interface{} {
		resp, err := coinranking.NewCoinRankingClient().GetCoins(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("crossrefGetWork", func(this js.Value, args []js.Value) interface{} {
		resp, err := crossref.NewCrossRefClient().GetWork(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("deepseekChat", func(this js.Value, args []js.Value) interface{} {
		client := deepseek.NewDeepSeekClient(args[2].String())
		resp, err := client.GetChatCompletions(args[0].String(), args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("geminiGenerateContent", func(this js.Value, args []js.Value) interface{} {
		client := gemini.NewGeminiClient(args[2].String())
		var contents []gemini.Content
		if err := json.Unmarshal([]byte(args[1].String()), &contents); err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		resp, err := client.GenerateContent(gemini.Model(args[0].String()), contents)
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("fixerLatest", func(this js.Value, args []js.Value) interface{} {
		resp, err := fixer.NewFixerClient(args[0].String()).GetLatest()
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("fixerSymbols", func(this js.Value, args []js.Value) interface{} {
		resp, err := fixer.NewFixerClient(args[0].String()).GetSymbols()
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("footballGetCompetitions", func(this js.Value, args []js.Value) interface{} {
		resp, err := footballdata.NewFootballDataClient(args[0].String()).GetCompetitions()
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("frankfurterLatest", func(this js.Value, args []js.Value) interface{} {
		var req frankfurter.FrankfurterLatestRequest
		if err := json.Unmarshal([]byte(args[0].String()), &req); err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		resp, err := frankfurter.GetLatest(req)
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("frankfurterGetCurrencies", func(this js.Value, args []js.Value) interface{} {
		resp, err := frankfurter.GetCurrencies()
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("lichessGetCloudEvaluation", func(this js.Value, args []js.Value) interface{} {
		multiPv, err := strconv.Atoi(args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		resp, err := lichess.NewLichessClient().GetCloudEvaluation(args[0].String(), multiPv, args[2].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("newsapiGetTopHeadlines", func(this js.Value, args []js.Value) interface{} {
		page, err := strconv.Atoi(args[3].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		pageSize, err := strconv.Atoi(args[4].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		var sources []string
		if err := json.Unmarshal([]byte(args[6].String()), &sources); err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		req := newsapi.TopHeadlinesRequest{
			Category: args[1].String(),
			Country:  args[2].String(),
			Page:     page,
			PageSize: pageSize,
			Query:    args[5].String(),
			Sources:  sources,
		}
		resp, err := newsapi.GetTopHeadlines(args[0].String(), req)
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("openaiChat", func(this js.Value, args []js.Value) interface{} {
		client := openai.NewOpenAIClient(args[2].String())
		resp, err := client.GetChatCompletion(args[0].String(), args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("openweathermapGetWeather", func(this js.Value, args []js.Value) interface{} {
		resp, err := openweathermap.GetWeather(args[0].String(), args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("telegramSendMessage", func(this js.Value, args []js.Value) interface{} {
		chatID, err := strconv.Atoi(args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		err = telegram.SendMessage(args[0].String(), chatID, args[2].String(), telegram.ParseMode(args[3].String()))
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.ValueOf(true)
	})

	export("telegramSetWebhook", func(this js.Value, args []js.Value) interface{} {
		resp, err := telegram.SetWebhook(args[0].String(), args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("telegramDeleteWebhook", func(this js.Value, args []js.Value) interface{} {
		resp, err := telegram.DeleteWebhook(args[0].String(), args[1].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	export("telegramGetWebhookInfo", func(this js.Value, args []js.Value) interface{} {
		resp, err := telegram.GetWebhookInfo(args[0].String())
		if err != nil {
			return js.Global().Get("Error").New(err.Error())
		}
		return js.Global().Get("JSON").Call("parse", js.ValueOf(jsonString(resp)))
	})

	js.Global().Set("__apiGoReady", js.ValueOf(true))
	println("api-go WASM module loaded")
	<-c
}

func jsonString(v interface{}) string {
	b, err := json.Marshal(v)
	if err != nil {
		return `{"error":"` + err.Error() + `"}`
	}
	return string(b)
}
