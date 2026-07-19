JAVA_HOME := /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
GRADLE = JAVA_HOME=$(JAVA_HOME) gradle

.PHONY: clean build test coverage check

clean:
	$(GRADLE) clean

build:
	$(GRADLE) build

test:
	$(GRADLE) test

coverage:
	$(GRADLE) test jacocoTestReport

check:
	$(GRADLE) check
