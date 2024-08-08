// For drawing we can use canvas:
//   - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

function draw_rectangle(x, y, w, h) {
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, w, h);
}

// We import a function for drawing a rectangle so we can call it
// from our wasm module
const wasm = WebAssembly.instantiateStreaming(
  fetch("./game.wasm"),
  {
    env: {
      draw_rectangle
    }
  }
);

wasm.then((w) => {
  console.log(w.instance.exports.add(6, 6));
  w.instance.exports.game_loop();
});
