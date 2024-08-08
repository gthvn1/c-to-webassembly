// Will be imported into wasm module
void log_from_js(const char *msg);

void test_log() {
  log_from_js("Hello,");
  log_from_js("Sailor!");
}
