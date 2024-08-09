// game.h
// Functions defined in game.c
#ifndef GAME_H
#define GAME_H

typedef unsigned int u32;

void game_init(u32 width, u32 height);
void game_render(void);
void game_keydown(int keycode);

#endif /* GAME_H */
