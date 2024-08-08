#!/bin/sh

set -x

# Fisrt step: Turn or C code into LLVM IR
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

echo "You now have a valid WebAssembly module called add.o that can be inspected using:"
echo "wasm-objdump -x add.o"

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
