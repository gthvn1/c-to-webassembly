// For drawing we can use canvas:
//   - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

function ext_draw_rectangle(x, y, w, h) {
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, w, h);
}

// We import a function for drawing a rectangle so we can call it from our wasm module:
// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiateStreaming_static
const importObject = {
    env: {
      ext_draw_rectangle,
    }
};

WebAssembly.instantiateStreaming(fetch("./game.wasm"), importObject).then(
  (w) => {
    console.log(w.instance.exports.add(6, 6));
    w.instance.exports.game_init();
  }
);
