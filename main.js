// For drawing we can use canvas:
//   - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

const wasm = WebAssembly.instantiateStreaming(
  fetch("./game.wasm")
);

wasm.then((w) => {
    console.log(w.instance.exports.add(6, 6));
});
