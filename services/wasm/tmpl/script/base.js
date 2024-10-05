const go = new Go();
fetch('module1.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, go.importObject)
).then(result => {
  wasm = result.instance;
  go.run(wasm); // This will start the Go runtime
}).catch(error => {
  console.error('Error loading or instantiating WebAssembly:', error);
});


console.log("Hello from base")