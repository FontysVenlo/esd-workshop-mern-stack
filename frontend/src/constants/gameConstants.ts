export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 200;
export const GROUND_Y = 150;
export const TREX_WIDTH = 44; //44
export const TREX_HEIGHT = 47;
export const TREX_DUCKING_HEIGHT = 26;
export const TREX_DUCKING_WIDTH = 59;
export const TREX_X = 50;

// TODO: Experiment with GRAVITY - controls how fast T-Rex falls
// Try: 0.3 (floaty), 0.6 (normal), 1.2 (heavy fall)
// Higher = falls faster, Lower = falls slower
export const GRAVITY = 0.3; // TODO: Try changing this value and see how it affects jumping!

// TODO: Experiment with JUMP_VELOCITY - controls how high T-Rex jumps
// Try: -6 (low jump), -12 (normal), -18 (high jump)
// More negative = jumps higher (remember, negative Y goes up!)
export const JUMP_VELOCITY = -6; // TODO: Try changing this value and see how jump height changes!

// TODO: Experiment with INITIAL_SPEED - controls starting game speed
// Try: 3 (slow start), 6 (normal), 10 (fast start)
// Higher = game starts faster
export const INITIAL_SPEED = 3; // TODO: Try changing this value and see how game speed changes!

// TODO: Experiment with SPEED_INCREMENT - controls how much speed increases per frame
// Try: 0.0005 (slow acceleration), 0.001 (normal), 0.002 (fast acceleration)
// Higher = game gets harder faster
export const SPEED_INCREMENT = 0.0005; // TODO: Try changing this value and see how difficulty ramps up!

// TODO: Experiment with OBSTACLE_SPAWN_RATE - controls how often obstacles appear
// Try: 0.004 (few obstacles), 0.008 (normal), 0.015 (many obstacles)
// Higher = more obstacles spawn (0.0 to 1.0 range)
export const OBSTACLE_SPAWN_RATE = 0.004; // TODO: Try changing this value and see obstacle frequency!

// TODO: Experiment with MIN_OBSTACLE_DISTANCE - controls minimum space between obstacles
// Try: 80 (close together), 120 (normal), 200 (far apart)
// Higher = more space between obstacles (easier to dodge)
export const MIN_OBSTACLE_DISTANCE = 80; // TODO: Try changing this value and see spacing between obstacles!

export const HIGH_SCORE_KEY = 'trex-high-score';

