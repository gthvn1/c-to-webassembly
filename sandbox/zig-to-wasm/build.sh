#!/bin/sh

set -x

zig build-exe add3.zig -target wasm32-freestanding -fno-entry --export=add3 -O ReleaseFast

python3 -m http.server
