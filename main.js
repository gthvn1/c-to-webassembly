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

// We are doing animation using requestAnimationFrame:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
// We are animating the canvas...

let times = 0;
let wasm = null;

function step(timeStamp) {
  console.log(timeStamp);

  if (times < 200) {
    wasm.instance.exports.game_update();
    wasm.instance.exports.game_render();
    times = times + 1;
    window.requestAnimationFrame(step);
  }
}

WebAssembly.instantiateStreaming(fetch("./game.wasm"), importObject).then(
  (w) => {
    wasm = w;

    console.log(w.instance.exports.add(6, 6));
    w.instance.exports.game_init();
    window.requestAnimationFrame(step);
  });
