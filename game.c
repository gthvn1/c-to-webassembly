// Filename: game.c
#include "game.h"
#include "game_ext.h"

#define BOX_SIZE 10

struct Game {
  int width;
  int height;
  int x;
  int y;
};

static struct Game game = {0};

void game_init(int width, int height) {
  ext_log("Game initialized");
  // Let's initialize the box position into the middle of the screen
  game.x = width / 2;
  game.y = height / 2;
  game.width = width;
  game.height = height;
}

// For testing just draw a box of 10x10 at x,y
void game_render(void) {
  // https://www.nordtheme.com/

  int bckg = 0x2E3440FF; // 0xRRGGBBAA
  int forg = 0xD8DEE9FF;

  // Clean background
  ext_draw_rectangle(0, 0, game.width, game.height, bckg);

  // And draw a box
  ext_draw_rectangle(game.x, game.y, BOX_SIZE, BOX_SIZE, forg);
}

void game_keydown(int keycode) {
  ext_log("Game keydowned");

  switch (keycode) {
  case Left:
    game.x -= 1;
    break;
  case Up:
    game.y -= 1;
    break;
  case Right:
    game.x += 1;
    break;
  case Down:
    game.y += 1;
    break;
  }
}
