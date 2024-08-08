# c-to-webassembly

- Work: Following the really cool blog from [surma](https://surma.dev/things/c-to-webassembly/)
  - Step1: (tagged step1)
    - First we will understand how we are generating wasm from C
    - Start with a simple function add.c
  - Step2: (not tagged yet)
    - Turned our simple function into something more complex
    - WIP...

- Requirements:
  - llvm

- Usage:
```sh
usage() {
	echo "Usage: $0 { all | opti | run | clean }"
	echo "  all: generate all intermediate format add.ll, add.o and add.wasm"
	echo "  opti: produce on optimized wasm module that can be run in browser"
	echo "  run: build wasm module and start python http server"
	echo "  clean: remove generated files"
	echo
	echo "HINT: use wasm2wat to see the difference between the all and opti"
	echo "      wasm file"
	exit 1
}
```
- `build.sh` is documented
