import React, { useRef, useEffect } from 'react';
import { GameState, TRexSprite } from '../../types/gameTypes';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants/gameConstants';
import { useGameLoop } from '../../hooks/useGameLoop';

interface GameCanvasProps {
  gameState: GameState;
  trexSprite: TRexSprite;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setTrexSprite: React.Dispatch<React.SetStateAction<TRexSprite>>;
  showHitboxes?: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  trexSprite,
  setGameState,
  setTrexSprite,
  showHitboxes
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { startGameLoop, stopGameLoop } = useGameLoop({
    canvasRef,
    gameState,
    trexSprite,
    setGameState,
    setTrexSprite,
    showHitboxes: !!showHitboxes
  });

  useEffect(() => {
    if (gameState.state === 'PLAYING') {
      startGameLoop();
    } else {
      stopGameLoop();
    }

    return () => {
      stopGameLoop();
    };
  }, [gameState.state, startGameLoop, stopGameLoop]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="block bg-white"
      style={{ imageRendering: 'pixelated',backgroundColor: '#f7f7f7' }}
    />
  );
};

export default GameCanvas;