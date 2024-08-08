# c-to-webassembly

- Follow the really cool blog from [surma](https://surma.dev/things/c-to-webassembly/)
- Requirements:
  - llvm
```sh
usage() {
	echo "Usage: $0 { all | opti | start | clean }"
	echo "  all: generate all intermediate format add.ll, add.o and add.wasm"
	echo "  opti: produce on optimized wasm module that can be run in browser"
	echo "  start: build wasm module and start python http server"
	echo "  clean: remove generated files"
	echo
	echo "HINT: use wasm2wat to see the difference between the all and opti"
	echo "      wasm file"
	exit 1
}
```
- `build.sh` is documented
