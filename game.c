// Filename: game.c
int add(int a, int b) { return a * a + b; }

// draw_rectangle is imported from main.js
void draw_rectangle(unsigned int x, unsigned int y, unsigned int w,
                    unsigned int h);

void game_loop(void) { draw_rectangle(10, 10, 150, 100); }
