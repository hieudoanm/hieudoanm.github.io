install:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o gh-coc ./main.go
	rm -rf ~/.local/share/gh/extensions/gh-coc
	gh extension install .
