.PHONY: build run clean test

JAVA_HOME := /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
GRADLE = JAVA_HOME=$(JAVA_HOME) ./gradlew

build:
	$(GRADLE) build

run: build
	$(GRADLE) run

clean:
	$(GRADLE) clean

test:
	$(GRADLE) test

docker:
	docker build -t backbone-kotlin .
	docker run -p 8080:8080 backbone-kotlin
