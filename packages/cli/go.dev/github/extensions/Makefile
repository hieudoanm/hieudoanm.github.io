format:
	go fmt ./...

vet:
	go vet ./...

check:
	staticcheck ./...

build:
	go fmt ./...
	go vet ./...
	staticcheck ./...
	# Build
	go build -o ./bin/gh-coc ./src/gh-coc/main.go
	go build -o ./bin/gh-ignore ./src/gh-ignore/main.go
	go build -o ./bin/gh-license ./src/gh-license/main.go

install:
	go fmt ./...
	go vet ./...
	staticcheck ./...
	# Build
	go build -o ./bin/gh-coc ./src/gh-coc/main.go
	go build -o ./bin/gh-ignore ./src/gh-ignore/main.go
	go build -o ./bin/gh-license ./src/gh-license/main.go
	# Remove old extensions
	rm -rf ~/.local/share/gh/extensions/gh-coc
	rm -rf ~/.local/share/gh/extensions/gh-ignore
	rm -rf ~/.local/share/gh/extensions/gh-license
	# Install new extensions
	gh extension install ./bin/gh-coc
	gh extension install ./bin/gh-ignore
	gh extension install ./bin/gh-license
