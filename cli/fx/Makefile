format:
	go fmt

vet:
	go vet main.go

lint:
	find . -type d | xargs -L 1 golint

build:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o ./bin/fx ./main.go

install:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o ./bin/fx ./main.go
	sudo cp ./bin/fx /usr/local/bin/
