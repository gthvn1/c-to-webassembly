// Filename: game.c
#include "game.h"

int add(int a, int b) { return a * a + b; }

struct Game {
  unsigned int width;
  unsigned int height;
  unsigned int x;
  unsigned int y;
};

static struct Game game = {0};

void game_init(void) {
  game.x = 10;
  game.y = 20;
  game.width = 200;
  game.height = 100;
}

void game_render(void) {
  ext_draw_rectangle(game.x, game.y, game.width, game.height);
}

void game_update(int key) {
  // For testing just move right...
  game.x++;
}
