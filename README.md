# c-to-webassembly

- **Work**: We followed the really cool blog from [surma](https://surma.dev/things/c-to-webassembly/)
  - Step1: (tagged step1)
    - First we will understand how we are generating wasm from C
    - Start with a simple function add.c
  - Step2: (not tagged yet)
    - Turned our simple function into something more complex
    - `game.c` is the core of the application.
    - It provides three functions (See `game.h`):
      - `game_init()`
      - `game_render()`: render the box
      - `game_keydown()`: to be able to move the box
    - To work `game.c` requires functions from `game_ext.h`. These functions can be provided by:
      - JS: when running in the browser (`main_wasm.js`)
      - Raylib: when running as a standalone app (`main_rl.c`)
    - WIP...

- **Requirements**:
  - llvm: we are using clang for compilation.
  - [raylib](https://github.com/raysan5/raylib/releases) for the standalone application.
    - To install it we just *untar* the release in current directory.

- **Build**: `build.sh` is documented but has been replaced by `Makefile`.
