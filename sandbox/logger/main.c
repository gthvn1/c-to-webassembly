#include "logger.h"
#include <stdio.h>

void logger(const char *name) { printf("log: %s\n", name); }

int main() { test_logger(); }
