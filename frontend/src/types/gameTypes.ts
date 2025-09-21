export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus' | 'pterodactyl';
  variant: number;
}

export interface GameState {
  state: 'WAITING' | 'PLAYING' | 'GAME_OVER';
  score: number;
  highScore: number;
  speed: number;
  trexY: number;
  trexVelocityY: number;
  isJumping: boolean;
  isDucking: boolean;
  obstacles: Obstacle[];
  groundX: number;
  animationFrame: number;
  lastObstacleSpawn: number;
}

export interface TRexSprite {
  state: 'idle' | 'running' | 'jumping' | 'ducking';
  animationFrame: number;
}

export interface TRexHitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}