import { SpriteSheetConfig } from '../types/spriteTypes';

// Default Chrome T-Rex sprite sheet configuration
export const chromeSprites: SpriteSheetConfig = {
  imagePath: '/sprites/100-offline-sprite.png',
  frames: {
      // T-Rex Sprites
    trexIdle: { x: 848, y: 2, width: 44, height: 51 },
    trexRun1: { x: 935, y: -2, width: 46, height: 51 },
    trexRun2: { x: 980, y: -2, width: 46, height: 51 },
    trexJump: { x: 848, y: 2, width: 44, height: 51 },
    trexDuck1: { x: 1113, y: 12, width: 59, height: 32 },
    trexDuck2: { x: 1173, y: 12, width: 59, height: 32 },
    trexDead: { x: 294, y: 2, width: 44, height: 47 },

    // Obstacles
    cactusSmall: { x: 230, y: 0, width: 12, height: 35 },
    cactusMedium: { x: 228, y: 2, width: 34, height: 35 },
    cactusLarge: { x: 228, y: 2, width: 51, height: 35 },
    pterodactyl1: { x: 135, y: 2, width: 46, height: 40 },
    pterodactyl2: { x: 180, y: 2, width: 46, height: 40 },

    // Environment
    ground: { x: 2, y: 54, width: 1200, height: 12 },
    cloud: { x: 86, y: 2, width: 46, height: 14 },
    gameOver: { x: 484, y: 15, width: 191, height: 11 },
    restart: { x: 2, y: 2, width: 36, height: 32 }
  }
};

/*
trexIdle: SpriteFrame;
    trexRun1: SpriteFrame;
    trexRun2: SpriteFrame;
    trexJump: SpriteFrame;
    trexDuck1: SpriteFrame;
    trexDuck2: SpriteFrame;
    trexDead: SpriteFrame;
    
    // Obstacle sprites
    cactusSmall: SpriteFrame;
    cactusMedium: SpriteFrame;
    cactusLarge: SpriteFrame;
    pterodactyl1: SpriteFrame;
    pterodactyl2: SpriteFrame;
*/


// Alternative sprite sheet configuration (example)
export const pixelSprites: SpriteSheetConfig = {
  imagePath: '/sprites/pixel-dino-sprite.png',
  frames: {
    trexIdle: { x: 0, y: 0, width: 48, height: 50 },
    trexRun1: { x: 48, y: 0, width: 48, height: 50 },
    trexRun2: { x: 96, y: 0, width: 48, height: 50 },
    // ... define all frames for different sprite sheet
    trexJump: { x: 144, y: 0, width: 48, height: 50 },
    trexDuck1: { x: 192, y: 0, width: 60, height: 32 },
    trexDuck2: { x: 252, y: 0, width: 60, height: 32 },
    trexDead: { x: 312, y: 0, width: 48, height: 50 },
    cactusSmall: { x: 0, y: 50, width: 20, height: 38 },
    cactusMedium: { x: 20, y: 50, width: 40, height: 38 },
    cactusLarge: { x: 60, y: 50, width: 60, height: 38 },
    pterodactyl1: { x: 120, y: 50, width: 50, height: 42 },
    pterodactyl2: { x: 170, y: 50, width: 50, height: 42 },
    ground: { x: 0, y: 88, width: 1200, height: 14 },
    cloud: { x: 220, y: 50, width: 50, height: 16 },
    gameOver: { x: 270, y: 50, width: 200, height: 12 },
    restart: { x: 470, y: 50, width: 40, height: 36 }
  }
};


// Sprite configuration
const SPRITES = {
    trex: {
        idle: 'assets/trex-idle.png',
        run1: 'assets/trex-run1.png', 
        run2: 'assets/trex-run2.png',
        duck1: 'assets/trex-duck1.png',
        duck2: 'assets/trex-duck2.png',
        dead: 'assets/trex-dead.png'
    },
    obstacles: {
        cactusSmall: 'assets/cactus-small.png',
        cactusMedium: 'assets/cactus-medium.png', 
        cactusLarge: 'assets/cactus-large.png',
        pterodactyl1: 'assets/pterodactyl1.png',
        pterodactyl2: 'assets/pterodactyl2.png'
    },
    environment: {
        ground: 'assets/ground.png',
        cloud: 'assets/cloud.png'
    }
};