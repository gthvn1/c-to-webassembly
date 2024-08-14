.PHONY: all clean run

all: main_fibo fibo.wasm

main_fibo: main_fibo.zig fibo.o
	zig build-exe main_fibo.zig fibo.o

fibo.o: fibo.zig
	zig build-obj -fno-entry -O ReleaseSmall fibo.zig

fibo.wasm: fibo.zig
	zig build-exe \
		-target wasm32-freestanding \
		-fno-entry --export=fibo \
		-O ReleaseFast \
		fibo.zig

run: main_fibo
	./main_fibo

clean:
	rm -f *.o main_fibo fibo.wasm
