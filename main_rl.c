#include "game.h"
#include "raylib-5.0_linux_amd64/include/raylib.h"
#include <stdio.h>

// Functions required by game.c
void ext_log(char *msg) { printf("log: %s\n", msg); }

void ext_draw_rectangle(int x, int y, int w, int h) {
  DrawRectangle(x, y, w, h, GREEN);
}

int main(void) {
  const int screenWidth = 800;
  const int screenHeight = 600;

  InitWindow(screenWidth, screenHeight, "Demo");
  SetTargetFPS(60);

  game_init(screenWidth, screenHeight);

  while (!WindowShouldClose()) {
    BeginDrawing();
    game_render();
    EndDrawing();
  }

  CloseWindow();
  return 0;
}
