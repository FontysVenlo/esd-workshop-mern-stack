import { useEffect, useRef } from 'react';
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
  const pressedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return; // ignore key auto-repeat
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
            if (!pressedRef.current.has('ArrowDown')) {
              onDuck(true);
            }
            pressedRef.current.add('ArrowDown');
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowDown':
          event.preventDefault();
          if (gameState === 'PLAYING') {
            pressedRef.current.delete('ArrowDown');
            if (!pressedRef.current.has('ArrowDown')) {
              onDuck(false);
            }
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