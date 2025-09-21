export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteSheetConfig {
  imagePath: string;
  frames: {
    // T-Rex sprites
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
    
    // Ground and UI
    ground: SpriteFrame;
    cloud: SpriteFrame;
    gameOver: SpriteFrame;
    restart: SpriteFrame;
  };
}