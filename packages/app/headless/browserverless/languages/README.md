# Languages

| No  | Language     | Engine                       | Notes                                                |
| --- | ------------ | ---------------------------- | ---------------------------------------------------- |
| 1   | [Go][go]     | [go-webengine][go-webengine] | Pure-Go, CGO=0, single static binary                 |
| 2   | [Rust][rust] | [Servo][servo]               | Full browser engine, headed + headless modes         |
| 3   | [Kotlin][kotlin] | [Servo][servo]            | Renders over HTTP against a running Rust `serve`     |

The Rust port owns the engine. The Kotlin port has no JVM embedding of Servo, so
it proxies a running `browserverless serve` rather than bundling a second engine.

[go]: https://go.dev
[go-webengine]: https://github.com/go-webengine/go-webengine
[rust]: https://www.rust-lang.org
[kotlin]: https://kotlinlang.org
[servo]: https://servo.org
