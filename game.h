// game.h
// Functions defined in game.c
#ifndef GAME_H
#define GAME_H

// Currently we are only managing up, down, left and right.
enum keycode { Up = 0, Down = 1, Left = 2, Right = 3 };

void game_init(int width, int height);
void game_render(void);
void game_keydown(int keycode);

#endif /* GAME_H */
