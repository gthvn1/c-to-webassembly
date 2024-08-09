# C-to-WebAssembly

## Overview

- We followed the really cool blog from [surma](https://surma.dev/things/c-to-webassembly/)
  - **Step1**: (tagged step1)
    - First we will understand how we are generating wasm from C
    - Start with a simple function add.c
  - **Step2**: (tagged step2)
    - Turned our simple function into something more complex that will allow to:
      - move a small box within an area
    - `game.c` is the core of the application.
    - It provides three functions (See `game.h`):
      - `game_init()`: do the init of structure used,
      - `game_render()`: render the small box,
      - `game_keydown()`: to be able to move the box when pressing keys,
    - `game.c` requires functions defined in `game_ext.h`. These functions can be provided by:
      - JS: when running in the browser (`main_wasm.js`)
      - Raylib: when running as a standalone app (`main_rl.c`)
    - So we have two ways to run the code:
      - a standalone application that uses [Raylib](https://www.raylib.com/) and that can be run using: `./game_rl`
      - a web application that uses HTML Canvas for rendering. The `game.wasm` is generated from `game.c`.
  - **Step3**: (not tagger yet)
    - Can we only use one C file that uses [Raylib](https://www.raylib.com/) but can also generates a wasm module?
      - In this case function provided by [Raylib](https://www.raylib.com/) will be implemented in the `main_wasm.js`.
    - This will allow to have the same code for both renders.

## Requirements
  - llvm: we are using clang for compilation.
  - [raylib](https://github.com/raysan5/raylib/releases) for the standalone application.
    - To install it we just *untar* the release in current directory.

## Build

- `make` will build the standalone application and the WASM module.
- If you have python3 with http module you can do: `make run` that will build and start the http server for you.
- **NOTE**: `build.sh` is documented but has been replaced by `Makefile` after *step1*.
