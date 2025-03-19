format:
	go fmt ./...

vet:
	go vet ./...

lint:
	find . -type d | xargs -L 1 golint

build:
	go fmt ./...
	go vet ./...
	find . -type d | xargs -L 1 golint
	go build -o ./bin/gh-coc ./src/main.go

install:
	go fmt ./...
	go vet ./...
	find . -type d | xargs -L 1 golint
	go build -o ./bin/gh-coc ./src/main.go
	rm -rf ~/.local/share/gh/extensions/gh-coc
	gh extension install ./bin
