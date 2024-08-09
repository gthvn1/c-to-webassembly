// game_ext.h
// Functions needed by game.c but by an importObject from JS
// or by another object file.
#ifndef GAME_EXT_H
#define GAME_EXT_H

void ext_log(char *msg);
void ext_draw_rectangle(int x, int y, int w, int h, int color);

#endif /* GAME_EXT_H */
