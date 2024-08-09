.PHONY: all clean

all: simple_logger.wasm main_c

simple_logger.wasm: logger.c
	clang --target=wasm32 -O3 -nostdlib \
		-Wl,--no-entry  -Wl,--export-all -Wl,--allow-undefined \
		-o simple_logger.wasm logger.c

main_c: main.c logger.o
	clang -o main_c main.c logger.o

logger.o: logger.c
	clang -c logger.c

clean:
	rm -f *.o main_c simple_logger.wasm
