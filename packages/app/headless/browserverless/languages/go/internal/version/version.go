package version

// Version is the binary version. Override at build time with:
//
//	go build -ldflags "-X github.com/hieudoanm/browserverless/internal/version.Version=x.y.z"
var Version = "0.1.0"
