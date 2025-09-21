import { SpriteSheetConfig } from '../types/spriteTypes';

// Default Chrome T-Rex sprite sheet configuration
export const chromeSprites: SpriteSheetConfig = {
  imagePath: '/sprites/trex-sprite.png',
  frames: {
    // T-Rex animations (example coordinates - adjust to your sprite sheet)
    trexIdle: { x: 44, y: 2, width: 44, height: 47 },
    trexRun1: { x: 132, y: 2, width: 44, height: 47 },
    trexRun2: { x: 176, y: 2, width: 44, height: 47 },
    trexJump: { x: 44, y: 2, width: 44, height: 47 }, // same as idle/run frame
    trexDuck1: { x: 220, y: 30, width: 59, height: 30 },
    trexDuck2: { x: 279, y: 30, width: 59, height: 30 },
    trexDead: { x: 220, y: 2, width: 44, height: 47 },
    
    // Obstacles
    cactusSmall: { x: 446, y: 2, width: 17, height: 35 },
    cactusMedium: { x: 463, y: 2, width: 34, height: 35 },
    cactusLarge: { x: 497, y: 2, width: 51, height: 35 },
    pterodactyl1: { x: 134, y: 75, width: 46, height: 40 },
    pterodactyl2: { x: 180, y: 75, width: 46, height: 40 },


    
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