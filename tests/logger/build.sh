#!/bin/sh

clang \
	--target=wasm32 \
	-O3 \
	-flto \
	-nostdlib \
	-Wl,--no-entry \
	-Wl,--export-all \
	-Wl,--allow-undefined \
	-Wl,--lto-O3 \
	-o simple_log.wasm simple_log.c

python3 -m http.server
