install:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o gh-license ./main.go
	rm -rf ~/.local/share/gh/extensions/gh-license
	gh extension install .
