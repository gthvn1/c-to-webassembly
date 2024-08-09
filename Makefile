.PHONY: all run clean

all: game_rl game.wasm

run: all
	python3 -m http.server

# game.wasm is loaded from main.js.
game.wasm: game.c
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


# main_rl is using Raylib to provide functions to game.c
game_rl: main_rl.c game.o
	clang -o game_rl main_rl.c game.o -L./raylib-5.0_linux_amd64/lib -lraylib -lm

game.o: game.c
	clang -c game.c

clean:
	rm -f *.o game_rl game.wasm
