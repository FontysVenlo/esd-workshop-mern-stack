import { useCallback, useRef } from 'react';
import { GameState, TRexSprite } from '../types/gameTypes';
import { 
  GROUND_Y, 
  TREX_HEIGHT, 
  TREX_DUCKING_HEIGHT, 
  TREX_X, 
  GRAVITY, 
  SPEED_INCREMENT, 
  OBSTACLE_SPAWN_RATE, 
  TREX_WIDTH 
} from '../constants/gameConstants';
import { generateObstacle, checkCollision, saveHighScore } from '../utils/gameUtils';
import { drawTRex, drawObstacle, drawGround, drawUI, drawHitboxes} from '../utils/drawingUtils';



interface UseGameLoopProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  gameState: GameState;
  trexSprite: TRexSprite;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setTrexSprite: React.Dispatch<React.SetStateAction<TRexSprite>>;
}

export const useGameLoop = ({
  canvasRef,
  gameState,
  trexSprite,
  setGameState,
  setTrexSprite
}: UseGameLoopProps) => {
  const animationIdRef = useRef<number | null>(null);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate trexHitbox before using it
    const trexHitbox = {
      x: TREX_X + 8,
      y: gameState.trexY + (gameState.isDucking ? 25 : 8),
      width: TREX_WIDTH - 16,
      height: gameState.isDucking ? TREX_DUCKING_HEIGHT - 10 : TREX_HEIGHT - 16
    };


    setGameState(prevState => {
      if (prevState.state !== 'PLAYING') return prevState;

      const newState = { ...prevState };

      // Update T-Rex physics
      // Update T-Rex physics
      if (newState.isJumping || newState.trexVelocityY !== 0) {
        // Apply gravity - more gravity when ducking while jumping
        const gravityMultiplier = newState.isDucking && newState.isJumping ? 1.8 : 1.0;
        newState.trexVelocityY += GRAVITY * gravityMultiplier;
        newState.trexY += newState.trexVelocityY;

        if (newState.trexY >= GROUND_Y - TREX_HEIGHT) {
          newState.trexY = GROUND_Y - TREX_HEIGHT;
          newState.trexVelocityY = 0;
          newState.isJumping = false;
        }
      }
      // Update speed
      newState.speed += SPEED_INCREMENT;

      // Update ground
      newState.groundX -= newState.speed;

      // Update score
      newState.score += 1;

      // Spawn obstacles
      if (Math.random() < OBSTACLE_SPAWN_RATE && 
          Date.now() - newState.lastObstacleSpawn > 1000) {
        const lastObstacleX = newState.obstacles.length > 0 
          ? Math.max(...newState.obstacles.map(o => o.x))
          : canvas.width;
        
        newState.obstacles.push(generateObstacle(lastObstacleX));
        newState.lastObstacleSpawn = Date.now();
      }

      // Update obstacles
      newState.obstacles = newState.obstacles
        .map(obstacle => ({ ...obstacle, x: obstacle.x - newState.speed }))
        .filter(obstacle => obstacle.x > -obstacle.width);

     

      for (const obstacle of newState.obstacles) {
        if (checkCollision(trexHitbox, obstacle)) {
          newState.state = 'GAME_OVER';
          if (newState.score > newState.highScore) {
            newState.highScore = newState.score;
            saveHighScore(newState.score);
          }
          break;
        }
      }

      // Update animation frame
      newState.animationFrame++;

      return newState;
    });

    // Update T-Rex sprite
    setTrexSprite(prevSprite => ({
      state: gameState.state === 'PLAYING' 
        ? (gameState.isDucking ? 'ducking' : gameState.isJumping ? 'jumping' : 'running')
        : 'idle',
      animationFrame: prevSprite.animationFrame + 1
    }));

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw everything
    drawGround(ctx, gameState.groundX);
    
    gameState.obstacles.forEach(obstacle => {
      drawObstacle(ctx, obstacle);
    });

    const trexY = gameState.isDucking 
      ? gameState.trexY + (TREX_HEIGHT - TREX_DUCKING_HEIGHT)
      : gameState.trexY;
    
    drawTRex(ctx, TREX_X, trexY, trexSprite, gameState.isDucking);
    drawUI(ctx, gameState.score, gameState.highScore, gameState.state);
    // Add this line after drawUI call
    drawHitboxes(ctx, trexHitbox, gameState.obstacles);

    if (gameState.state === 'PLAYING') {
      animationIdRef.current = requestAnimationFrame(gameLoop);
    }
  }, [canvasRef, gameState, trexSprite, setGameState, setTrexSprite]);

  const startGameLoop = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const stopGameLoop = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
  }, []);

  return { startGameLoop, stopGameLoop, animationIdRef };
};

