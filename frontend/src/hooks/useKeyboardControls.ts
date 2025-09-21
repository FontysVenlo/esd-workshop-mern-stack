import { useEffect } from 'react';
import { GameState } from '../types/gameTypes';

interface UseKeyboardControlsProps {
  gameState: GameState['state'];
  onJump: () => void;
  onDuck: (ducking: boolean) => void;
  onStart: () => void;
  onRestart: () => void;
}

export const useKeyboardControls = ({
  gameState,
  onJump,
  onDuck,
  onStart,
  onRestart
}: UseKeyboardControlsProps): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
        case 'ArrowUp':
          event.preventDefault();
          if (gameState === 'WAITING') {
            onStart();
          } else if (gameState === 'PLAYING') {
            onJump();
          } else if (gameState === 'GAME_OVER') {
            onRestart();
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (gameState === 'PLAYING') {
            onDuck(true);
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowDown':
          event.preventDefault();
          if (gameState === 'PLAYING') {
            onDuck(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, onJump, onDuck, onStart, onRestart]);
};