#!/bin/sh

usage() {
	echo "Usage: $0 { step1 | step2 | start | clean }"
	echo "  step1: generate all intermediate format add.ll, add.o and add.wasm"
	echo "  step2: produce only the valid wasm module"
	echo "  start: build wasm module and start python http server"
	echo "  clean: remove generated files"
	exit 1
}

step1() {
	# First step: Turn or C code into LLVM IR
	# Tool: front-end compiler (clang)
	# Input file: add.c
	# Output file: add.ll
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
		add.c

	# Step two: turing our add.ll file into an object file
	# Tool: LLVM backend compiler (llc)
	# Input file: add.ll
	# Output file: add.o
	# Options are:
	#   - Target webassembly
	#   - Output an object file
	# It will produce an add.o file that is a valid WebAssembly module that contains
	# all the compiled code of our C file.
	llc \
		-march=wasm32 \
		-filetype=obj \
		add.ll

	# NOTE: The object file is a valid WASM module but it lacks some information like:
	#   - The entry point,
	#   - Some Imported/Exported function because you may need others object files
	#   - Some Global variables and correct memory layout
	# You need to run another link step to produce a WASM module with needed glue that can be run
	# on web assembly runtime and so in the browser.

	# Step three: linking
	# Tool: LLVM linker for webassembly (wasm-ld)
	# Input file: add.o
	# Output file: add.wasm
	# Options are:
	#   - We don't have an entry function like main
	#   - Export everything
	#   - output will be add.wasm
	wasm-ld \
		--no-entry \
		--export-all \
		-o add.wasm \
		add.o

	echo "This step has generated:"
	echo "  - add.ll: LLVM intermediate representation"
	echo "  - add.o: a wasm module (object file see the note in the build.sh)"
	echo "  - add.wasm: a wasm module that can be run in the browser"
}

step2() {
	# Put all step1 into one command.
	# We don't use the standard library so we don't want to link with it.
	# We are using Wl to pass option to the linker.
	clang \
		--target=wasm32 \
		-nostdlib \
		-Wl,--no-entry \
		-Wl,--export-all \
		-o add.wasm add.c

	echo "This step has generated:"
	echo "  - add.wasm: a wasm module that can be run in the browser"
}

# We can pass a step argument:
if [ $# -eq 0 ]; then
	usage
fi

case "$1" in
step1) step1 ;;
step2) step2 ;;
start)
	step2
	python3 -m http.server
	;;
clean)
	rm -f add.ll add.o add.wasm
	;;
*)
	echo "Invalid option: $1"
	usage
	;;
esac
