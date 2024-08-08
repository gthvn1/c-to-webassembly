# c-to-webassembly

- Follow the really cool blog from [surma](https://surma.dev/things/c-to-webassembly/)
- Requirements:
  - llvm
```sh
usage() {
	echo "Usage: $0 { step1 | step2 | start | clean }"
	echo "  step1: generate all intermediate format add.ll, add.o and add.wasm"
	echo "  step2: produce only the valid wasm module"
	echo "  start: build wasm module and start python http server"
	echo "  clean: remove generated files"
	exit 1
}
```
- `build.sh` is documented
