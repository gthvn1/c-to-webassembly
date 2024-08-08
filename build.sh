#!/bin/sh

usage() {
	echo "Usage: $0 { all | opti | run | clean }"
	echo "  all: generate all intermediate format game.ll, game.o and game.wasm"
	echo "  opti: produce on optimized wasm module that can be run in browser"
	echo "  run: build wasm module and run python http server"
	echo "  clean: remove generated files"
	echo
	echo "HINT: use wasm2wat to see the difference between the all and opti"
	echo "      wasm file"
	exit 1
}

all() {
	# First step: Turn or C code into LLVM IR
	# Tool: front-end compiler (clang)
	# Input file: game.c
	# Output file: game.ll
	# Options are:
	#   - Target WebAssembly
	#   - Emit LLVM IR (instead of host machine code)
	#   - Only compile, no linking for now
	#   - Emit human-readable assembly rather than binary
	clang \
		--target=wasm32 \
		-emit-llvm \
		-c \
		-S \
		game.c

	# Step two: turing our game.ll file into an object file
	# Tool: LLVM backend compiler (llc)
	# Input file: game.ll
	# Output file: game.o
	# Options are:
	#   - Target webassembly
	#   - Output an object file
	# It will produce an game.o file that is a valid WebAssembly module that contains
	# all the compiled code of our C file.
	llc \
		-march=wasm32 \
		-filetype=obj \
		game.ll

	# NOTE: The object file is a valid WASM module but it lacks some information like:
	#   - The entry point,
	#   - Some Imported/Exported function because you may need others object files
	#   - Some Global variables and correct memory layout
	# You need to run another link step to produce a WASM module with needed glue that can be run
	# on web assembly runtime and so in the browser.

	# Step three: linking
	# Tool: LLVM linker for webassembly (wasm-ld)
	# Input file: game.o
	# Output file: game.wasm
	# Options are:
	#   - We don't have an entry function like main
	#   - Export everything
	#   - Allow undefined symbol so it can be provided using import
	#   - output will be game.wasm
	wasm-ld \
		--no-entry \
		--export-all \
		--allow-undefined \
		-o game.wasm \
		game.o

	echo "This step has generated:"
	echo "  - game.ll: LLVM intermediate representation"
	echo "  - game.o: a wasm module (object file see the note in the build.sh)"
	echo "  - game.wasm: a wasm module that can be run in the browser"
}

opti() {
	# Put all all into one command.
	# Options are:
	#   - Target wasm32
	#   - Full optimizations
	#   - Add metadata for link-time optimizations
	#   - As we don't use the standard library don't link it.
	#   - We are using Wl to pass option to the linker.
	#     - no entry point
	#     - export all
	#     - allow undefined symbol
	#     - use link-time optimizations
	# NOTE: with only one simple object file optimizations at link-time are
	# not really interesting but in future it could.
	clang \
		--target=wasm32 \
		-O3 \
		-flto \
		-nostdlib \
		-Wl,--no-entry \
		-Wl,--export-all \
		-Wl,--allow-undefined \
		-Wl,--lto-O3 \
		-o game.wasm game.c

	echo "This step has generated:"
	echo "  - game.wasm: a wasm module that can be run in the browser"
}

# We can pass a step argument:
if [ $# -eq 0 ]; then
	usage
fi

case "$1" in
all) all ;;
opti) opti ;;
run)
	opti
	python3 -m http.server
	;;
clean)
	rm -f game.ll game.o game.wasm
	;;
*)
	echo "Invalid option: $1"
	usage
	;;
esac
