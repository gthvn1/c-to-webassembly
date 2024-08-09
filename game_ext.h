// game_ext.h
// Functions needed by game.c but by an importObject from JS
// or by another object file.
#ifndef GAME_EXT_H
#define GAME_EXT_H

void ext_log(char *msg);
void ext_draw_rectangle(unsigned int x, unsigned int y, unsigned int w,
                        unsigned int h);

#endif /* GAME_EXT_H */
