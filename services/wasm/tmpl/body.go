//go:build js && wasm
// +build js,wasm

package main

import (
	"syscall/js"
)

var (
	global js.Value
)

func init() {
	global = js.Global()
}

func main() {
	global.Set("handleClick", js.FuncOf(handleClick))

	select {} // Block main thread
}

func handleClick(this js.Value, args []js.Value) interface{} {
	alert("Hello, world!") // Use custom alert function
	return nil
}

func alert(message string) {
	global.Call("alert", message)
}

// $env:GOOS = "js"
// $env:GOARCH = "wasm"
// $CGO_LDFLAGS="-Wl,-LTO"
// go build -ldflags="-s -w" -o body.wasm -tags js,wasm body.go
