const importObject = {};

WebAssembly.instantiateStreaming(fetch("add3.wasm"), importObject).then(
  (obj) => {
    console.log(obj.instance.exports.add3(10, 11, 21));
  },
);
