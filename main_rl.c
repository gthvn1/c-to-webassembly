#include "game.h"
#include <stdio.h>

// Functions required by game.c
void ext_log(char *msg) { printf("log: %s\n", msg); }

void ext_draw_rectangle(unsigned int x, unsigned int y, unsigned int w,
                        unsigned int h) {
  // TODO
}

int main() {
  game_init(800, 600);
  game_render();
}
