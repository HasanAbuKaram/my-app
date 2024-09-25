package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

func main() {
	js.Global().Set("handleClick", js.FuncOf(handleClick))
	js.Global().Set("handleData", js.FuncOf(handleData))
	js.Global().Set("notifyme", js.FuncOf(notifyme))
	<-make(chan bool)
}

func handleClick(this js.Value, args []js.Value) interface{} {
	js.Global().Call("alert", "hello world")
	return nil
}

func handleData(this js.Value, args []js.Value) interface{} {
	num := args[0].Int()
	text := args[1].String()
	data := map[string]interface{}{
		"number": num,
		"text":   text,
	}
	jsonData, _ := json.Marshal(data)
	addElement(jsonData)
	return string(jsonData)
}

func notifyme(this js.Value, args []js.Value) interface{} {
	js.Global().Call("eval", `new function() {
            let data = "just a reminder";
            let para = document.createElement("p");
            let node = document.createTextNode(data);
            para.appendChild(node);
            document.body.appendChild(para);
        }()`)

	return nil
}

func addElement(jsonData []byte) {
	doc := js.Global().Get("document")
	para := doc.Call("createElement", "p")
	var parsedData map[string]interface{}
	err := json.Unmarshal(jsonData, &parsedData)
	if err != nil {
		return
	}
	text := parsedData["text"].(string)
	num := parsedData["number"].(float64)
	node := doc.Call("createTextNode", fmt.Sprintf("%v What is the %v", text, num)) // dataString)
	para.Call("appendChild", node)
	body := doc.Get("body")
	body.Call("appendChild", para)
}
