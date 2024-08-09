// Filename: game.c
#include "game.h"
#include "game_ext.h"

struct Game {
  u32 width;
  u32 height;
  u32 x;
  u32 y;
};

static struct Game game = {0};

void game_init(u32 width, u32 height) {
  ext_log("Game initialized");
  game.x = 10;
  game.y = 20;
  game.width = width;
  game.height = height;
}

void game_render(void) {
  ext_log("Game rendered");
  ext_draw_rectangle(game.x, game.y, game.width, game.height);
}

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
