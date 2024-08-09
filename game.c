// Filename: game.c
#include "game.h"
#include "game_ext.h"

struct Game {
  int width;
  int height;
  int x;
  int y;
};

static struct Game game = {0};

void game_init(int width, int height) {
  ext_log("Game initialized");
  game.x = 10;
  game.y = 20;
  game.width = width;
  game.height = height;
}

// For testing just draw a box of 10x10 at x,y
void game_render(void) { ext_draw_rectangle(game.x, game.y, 10, 10); }

void game_keydown(int keycode) {
  ext_log("Game keydowned");
  switch (keycode) {
  case 37: // left
    game.x -= 1;
    break;
  case 38: // up
    game.y -= 1;
    break;
  case 39: // right
    game.x += 1;
    break;
  case 40: // down
    game.y += 1;
    break;
  }
}
