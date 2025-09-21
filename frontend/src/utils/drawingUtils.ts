import { spriteManager } from './spriteManager';
import { Obstacle, TRexSprite, GameState } from '../types/gameTypes';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_Y, TREX_WIDTH, TREX_HEIGHT } from '../constants/gameConstants';

export const drawTRex = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  sprite: TRexSprite, 
  isDucking: boolean
): void => {
  let spriteName: keyof import('../types/spriteTypes').SpriteSheetConfig['frames'];
  
  if (sprite.state === 'idle') {
    spriteName = 'trexIdle';
  } else if (isDucking) {
    spriteName = Math.floor(sprite.animationFrame / 10) % 2 === 0 ? 'trexDuck1' : 'trexDuck2';
  } else if (sprite.state === 'jumping') {
    spriteName = 'trexJump';
  } else if (sprite.state === 'running') {
    spriteName = Math.floor(sprite.animationFrame / 10) % 2 === 0 ? 'trexRun1' : 'trexRun2';
  } else {
    spriteName = 'trexIdle';
  }

  // Try to draw sprite, fallback to rectangle if it fails
  if (!spriteManager.drawSprite(ctx, spriteName, x, y, TREX_WIDTH, TREX_HEIGHT)) {
    // Fallback to rectangles
    ctx.fillStyle = '#000000';
    if (isDucking) {
      ctx.fillRect(x, y + 17, TREX_WIDTH, 30);
    } else {
      ctx.fillRect(x, y, TREX_WIDTH, TREX_HEIGHT);
    }
  }
};

export const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle): void => {
  let spriteName: keyof import('../types/spriteTypes').SpriteSheetConfig['frames'];
  
  if (obstacle.type === 'cactus') {
    if (obstacle.variant === 1) {
      spriteName = 'cactusSmall';
    } else if (obstacle.variant === 2) {
      spriteName = 'cactusMedium';
    } else {
      spriteName = 'cactusLarge';
    }
  } else {
    // Animate pterodactyl wings
    spriteName = Math.floor(Date.now() / 200) % 2 === 0 ? 'pterodactyl1' : 'pterodactyl2';
  }

  // Try to draw sprite, fallback to rectangle if it fails
  if (!spriteManager.drawSprite(ctx, spriteName, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
    // Fallback to rectangles
    ctx.fillStyle = '#000000';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
};

export const drawGround = (ctx: CanvasRenderingContext2D, groundX: number): void => {
  // Try to draw repeating ground sprite
  if (spriteManager.isLoaded()) {
    const groundFrame = spriteManager.getFrameData('ground');
    if (groundFrame) {
      // Draw repeating ground texture
      for (let x = groundX % groundFrame.width; x < CANVAS_WIDTH; x += groundFrame.width) {
        spriteManager.drawSprite(ctx, 'ground', x, GROUND_Y - 2, groundFrame.width, 12);
      }
      return;
    }
  }
  
  // Fallback to simple line
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);
};

// Rest of drawUI function stays the same...
export const drawUI = (
  ctx: CanvasRenderingContext2D, 
  score: number, 
  highScore: number, 
  state: GameState['state']
): void => {
  ctx.fillStyle = '#000000';
  ctx.font = '16px monospace';
  
  // Score
  ctx.textAlign = 'right';
  ctx.fillText(`HI ${highScore.toString().padStart(5, '0')} ${score.toString().padStart(5, '0')}`, CANVAS_WIDTH - 20, 30);
  
  // Game state messages
  ctx.textAlign = 'center';
  if (state === 'WAITING') {
    ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  } else if (state === 'GAME_OVER') {
    // Try to use sprite for game over text
    if (!spriteManager.drawSprite(ctx, 'gameOver', CANVAS_WIDTH / 2 - 95, CANVAS_HEIGHT / 2 - 30)) {
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
    }
    ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
  }
};

// Add this new function to drawingUtils.ts
export const drawHitboxes = (
  ctx: CanvasRenderingContext2D,
  trexHitbox: { x: number; y: number; width: number; height: number },
  obstacles: Obstacle[]
): void => {
  // Draw T-Rex hitbox
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 2;
  ctx.strokeRect(trexHitbox.x, trexHitbox.y, trexHitbox.width, trexHitbox.height);
  
  // Draw obstacle hitboxes
  obstacles.forEach(obstacle => {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
};