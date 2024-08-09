.PHONY: all clean run

WASM_MODULE = add3.wasm

all: $(WASM_MODULE)

%.wasm: %.ll
	clang \
		--target=wasm32 \
		-nostdlib \
		-Wl,--no-entry \
		-Wl,--export-all \
		-o $@ $<

%.ll: %.c
	clang --target=wasm32 -S -emit-llvm $<

clean:
	rm -f *.o *.s *.ll $(WASM_MODULE)

run: all
	python3 -m http.server
