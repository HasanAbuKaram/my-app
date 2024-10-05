//go:build js && wasm
// +build js,wasm

package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

var (
	global   js.Value
	document js.Value
)

func main() {
	global = js.Global()
	document = global.Get("document") // Cache document for efficiency

	global.Set("handleClick", js.FuncOf(handleClick))
	global.Set("handleData", js.FuncOf(handleData))
	global.Set("notifyme", js.FuncOf(notifyme))

	select {} // Block main thread
	// OR use a chanel to block the thread as:
	// <-make(chan bool)
}

func handleClick(this js.Value, args []js.Value) interface{} {
	alert("Hello, world!") // Use custom alert function
	return nil
}

func handleData(this js.Value, args []js.Value) interface{} {
	if len(args) < 2 {
		return nil // Handle invalid number of arguments gracefully
	}

	num := args[0].Int()
	text := args[1].String()

	data := map[string]interface{}{
		"number": num,
		"text":   text,
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		// Handle potential marshalling errors (optional)
		log(fmt.Sprintf("Error: %v", err))
		return nil
	}

	addElement(jsonData)
	return string(jsonData)
}

func notifyme(this js.Value, args []js.Value) interface{} {
	script := `
	new function() {
		let data = "just a reminder";
		let para = document.createElement("p");
		let node = document.createTextNode(data);
		para.appendChild(node);
		document.body.appendChild(para);
	}();
    `
	global.Call("eval", script)
	log("a Just reminder should be printed at the page")

	return nil
}

func alert(message string) {
	js.Global().Call("alert", message)
}

func log(message string) {
	js.Global().Get("console").Call("log", message)
}

func createElement(tagName string) js.Value {
	return js.Global().Get("document").Call("createElement", tagName)
}

func addElement(jsonData []byte) {
	var parsedData map[string]interface{}
	err := json.Unmarshal(jsonData, &parsedData)
	if err != nil {
		// Handle potential unmarshalling errors (optional)
		return
	}

	text := parsedData["text"].(string)
	num := parsedData["number"].(float64)

	node := document.Call("createTextNode", fmt.Sprintf("%v: What is the %.2f?", text, num)) // Format number with 2 decimal places

	para := createElement("p")
	para.Call("appendChild", node)

	body := document.Get("body")
	body.Call("appendChild", para)
}

// $env:GOOS = "js"
// $env:GOARCH = "wasm"
// $CGO_LDFLAGS="-Wl,-LTO"
// go build -ldflags="-s -w" -o main.wasm -tags js,wasm main.go
