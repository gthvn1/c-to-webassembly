// For drawing we can use canvas:
//   - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

let wasm = null;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);

function ext_draw_rectangle(x, y, w, h, color) {
  // color is #RRGGBBAA so we need to shift it
  const r = (color >> 24) & 0xFF;
  const g = (color >> 16) & 0xFF;
  const b = (color >> 8) & 0xFF;
  const a = color  & 0xFF;

  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  ctx.fillRect(x, y, w, h);
}

function strlen(mem, ptr) {
  let len = 0;
  // We don't expect string to have len greater than 1024 chars
  while (mem[ptr] != 0 && len < 1024) {
    len++;
    ptr++;
  }

  return len;
}

function ext_log(msg_ptr) {
  if (wasm == null) {
    console.log("wasm is not set");
    return;
  }

  // Get all memory from WASM module and convert it as an array of U8
  const buffer = wasm.instance.exports.memory.buffer;
  const mem = new Uint8Array(buffer);

  // Get the len of the message (we are expecting the string to be null terminated)
  const len = strlen(mem, msg_ptr);
  if (len == 1024) {
    console.log("end of string not found or string has a size over 1024");
    return;
  }

  // We can now get the slice and convert it to the string
  const slice = new Uint8Array(buffer, msg_ptr, len);
  const msg = String.fromCharCode(...slice);

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

  let keycode = 5; // 5 is not managed

  switch (e.keyCode) {
    case 37: // Left
      keycode = 2;
      break;
    case 38: // Up
      keycode = 0;
      break;
    case 39: // Right
      keycode = 3;
      break;
    case 40: // Down
      keycode = 1;
      break;
  }

  wasm.instance.exports.game_keydown(keycode);
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
    w.instance.exports.game_init(canvas.width, canvas.height);
    window.requestAnimationFrame(step);
  });
