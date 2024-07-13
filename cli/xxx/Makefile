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
	go build -o ./bin/xxx ./main.go

install:
	go fmt
	go vet main.go
	find . -type d | xargs -L 1 golint
	go build -o ./bin/xxx ./main.go
	sudo cp ./bin/xxx /usr/local/bin/
