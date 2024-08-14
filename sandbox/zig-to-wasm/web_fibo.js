const env = {
  loggme: () => console.log("TODO"),
};

WebAssembly.instantiateStreaming(fetch("fibo.wasm"), {
  env: env,
}).then((obj) => {
    console.log(obj.instance.exports.fibo(10));
  },
);
