import React, { useState, useCallback, useEffect } from 'react';
import GameCanvas from './GameCanvas';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { GameState, TRexSprite } from '../../types/gameTypes';
import {
  INITIAL_SPEED,
  GROUND_Y,
  TREX_HEIGHT,
  JUMP_VELOCITY
} from '../../constants/gameConstants';
import { spriteManager } from '../../utils/spriteManager';
import { chromeSprites } from '../../config/spriteConfigs'; // Import your chosen config

//! a prop type: To allow a string or anything else 
type TRexGameProps = {
  score: string;
  playerName: string;
};

const TRexGame: React.FC<TRexGameProps> = ({score,playerName}) => {
  const [spritesLoaded, setSpritesLoaded] = useState(false);

  const [showHitboxes, setShowHitboxes] = useState(false);


  useEffect(() => {
    const loadSprites = async () => {
      try {
        await spriteManager.loadSpriteSheet(chromeSprites);
        setSpritesLoaded(true);
      } catch (error) {
        console.error('Failed to load sprite sheet:', error);
        setSpritesLoaded(true); // Continue with fallback rectangles
      }
    };

    loadSprites();
  }, []);

  // if (!spritesLoaded) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
  //         <p>Loading sprites...</p>
  //       </div>
  //     </div>
  //   );
  // }

  const [gameState, setGameState] = useState<GameState>({
    state: 'WAITING',
    score: 0,
    highScore: parseInt(score),
    speed: INITIAL_SPEED,
    trexY: GROUND_Y - TREX_HEIGHT,
    trexVelocityY: 0,
    isJumping: false,
    isDucking: false,
    obstacles: [],
    groundX: 0,
    animationFrame: 0,
    lastObstacleSpawn: 0
  });

  const [trexSprite, setTrexSprite] = useState<TRexSprite>({
    state: 'idle',
    animationFrame: 0
  });

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      state: 'PLAYING',
      score: 0,
      speed: INITIAL_SPEED,
      trexY: GROUND_Y - TREX_HEIGHT,
      trexVelocityY: 0,
      isJumping: false,
      isDucking: false,
      obstacles: [],
      groundX: 0,
      animationFrame: 0,
      lastObstacleSpawn: 0
    }));
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const jump = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isJumping || prevState.isDucking) return prevState;
      return {
        ...prevState,
        isJumping: true,
        trexVelocityY: JUMP_VELOCITY
      };
    });
  }, []);

  const duck = useCallback((ducking: boolean) => {
    setGameState(prevState => ({
      ...prevState,
      isDucking: ducking // Remove the "&& !prevState.isJumping" condition
    }));
  }, []);

  useKeyboardControls({
    gameState: gameState.state,
    onJump: jump,
    onDuck: duck,
    onStart: startGame,
    onRestart: restartGame
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chrome T-Rex Game</h1>
        <p className="text-gray-600 text-sm">
          Use SPACE or ↑ to jump, ↓ to duck. Press SPACE to start/restart.
        </p>
      </div>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <GameCanvas
          gameState={gameState}
          trexSprite={trexSprite}
          setGameState={setGameState}
          setTrexSprite={setTrexSprite}
          showHitboxes={showHitboxes}
        />
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Score: {gameState.score} | High Score: {gameState.highScore} | Player: {playerName}</p>
        <p className="mt-1">Game State: {gameState.state}</p>
        <button
          className="mt-2 px-3 py-1 border rounded text-gray-800 hover:bg-gray-100"
          onClick={() => setShowHitboxes(v => !v)}
        >
          {showHitboxes ? 'Hide' : 'Show'} Collision Boxes
        </button>
      </div>
    </div>
  );
};

export default TRexGame;