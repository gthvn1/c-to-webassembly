let wasm = null;

function strlen(mem, ptr) {
  let len = 0;
  // We don't expect string to have len greater than 1024 chars
  while (mem[ptr] != 0 && len < 1024) {
    len++;
    ptr++;
  }

  return len;
}

function logger(str_ptr) {
  // Arg is a ptr to the string in memory
  console.log(str_ptr);

  if (wasm == null) {
    console.log("wasm is not set");
    return;
  } 

  // Get all memory from WASM module and convert it as an array of U8
  const buffer = wasm.instance.exports.memory.buffer;
  const mem = new Uint8Array(buffer);
  
  // Get the len (we are expecting the string to be null terminated)
  const len = strlen(mem, str_ptr);
  if (len == 1024) {
    console.log("end of string not found or string has a size over 1024");
    return;
  }

  // We can now get the slice and convert it to the string
  const slice = new Uint8Array(buffer, str_ptr, len);
  const str = String.fromCharCode(...slice);

  console.log(str);
}

const importObject = {
  env: { logger },
};

WebAssembly.instantiateStreaming(fetch("simple_logger.wasm"), importObject).then(
  (obj) => {
    wasm = obj;
    obj.instance.exports.test_logger();
  },
);
