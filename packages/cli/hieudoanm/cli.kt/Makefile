.PHONY: build run clean test jar native

JAVA_HOME = /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
GRAALVM_HOME = /Library/Java/JavaVirtualMachines/graalvm-25.jdk/Contents/Home
GRADLE = ./gradlew
MAIN_CLASS = io.github.hieudoanm.cli.MainKt

build:
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) build

run: build
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) run

clean:
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) clean

test:
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) test

jar:
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) jar
	@echo "JAR at build/libs/hieudoanm-0.0.1.jar"

native:
	mkdir -p bin
	JAVA_HOME=$(JAVA_HOME) $(GRADLE) installDist
	JAVA_HOME=$(GRAALVM_HOME) $(GRAALVM_HOME)/bin/native-image \
		-cp "build/install/hieudoanm/lib/*" \
		--initialize-at-build-time=com.github.ajalt.mordant.internal.nativeimage.NativeImagePosixMppImpls \
		$(MAIN_CLASS) \
		bin/hieudoanm
	@echo "Native binary at bin/hieudoanm"
