// For drawing we can use canvas:
//   - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

let wasm = null;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

function ext_draw_rectangle(x, y, w, h) {
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, w, h);
}

function ext_log(msg) {
  // TODO: In webassembly we cannot pass string like that...
  // It looks like we need to pass ptr and size...
  console.log(msg)
}

// We import a function for drawing a rectangle so we can call it from our wasm module:
// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiateStreaming_static
const importObject = {
    env: {
      ext_log,
      ext_draw_rectangle,
    }
};

// We are managing key pressed with:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
window.addEventListener("keydown", logKey);

function logKey(e) {
  console.log(e);
  wasm.instance.exports.game_keydown(e.keyCode);
}

// We are doing animation using requestAnimationFrame:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
// We are animating the canvas...

function step(timeStamp) {
  //console.log(timeStamp);

  wasm.instance.exports.game_render();
  window.requestAnimationFrame(step);
}

WebAssembly.instantiateStreaming(fetch("./game.wasm"), importObject).then(
  (w) => {
    wasm = w;

    console.log(w.instance.exports.add(6, 6));
    w.instance.exports.game_init(800, 600);
    window.requestAnimationFrame(step);
  });
