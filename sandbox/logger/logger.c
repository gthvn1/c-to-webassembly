#include "logger.h"

// This file is used to generate the WASM module that will be instantiated
// from JS.
// It will be also used to generate an executable.
// So it will demonstrate that we can provide a function looger() from different
// env (WASM, native C) and call it.
void test_logger() { logger("Hello, Sailor!"); }
