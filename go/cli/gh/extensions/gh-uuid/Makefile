install:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o gh-uuid ./main.go
	rm -rf ~/.local/share/gh/extensions/gh-uuid
	gh extension install .
