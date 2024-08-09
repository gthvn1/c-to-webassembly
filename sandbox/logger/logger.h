// This function will be provided by either the JS that will load the
// wasm module or the C executable that also provides its own version
// of the logger.
void logger(const char *name);

// logger provides a function to be able to test it.
void test_logger(void);
