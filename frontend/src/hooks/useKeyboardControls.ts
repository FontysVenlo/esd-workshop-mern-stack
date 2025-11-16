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
    // TODO: Implement handleKeyDown function
    // This function should handle keyboard events when keys are pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      // TODO: Ignore key auto-repeat (if event.repeat is true, return early)
      
      // TODO: Use a switch statement to check event.code
      switch (event.code) {
        // TODO: Handle 'Space' and 'ArrowUp' keys
        case 'Space':
        case 'ArrowUp':
          // TODO: Prevent default browser behavior
          // TODO: Check gameState and call appropriate function:
          //   - If gameState === 'WAITING', call onStart()
          //   - If gameState === 'PLAYING', call onJump()
          //   - If gameState === 'GAME_OVER', call onRestart()
          break;
        
        // TODO: Handle 'ArrowDown' key
        case 'ArrowDown':
          // TODO: Prevent default browser behavior
          // TODO: If gameState === 'PLAYING', call onDuck(true)
          break;
      }
    };

    // TODO: Implement handleKeyUp function
    // This function should handle keyboard events when keys are released
    const handleKeyUp = (event: KeyboardEvent) => {
      // TODO: Use a switch statement to check event.code
      switch (event.code) {
        // TODO: Handle 'ArrowDown' key release
        case 'ArrowDown':
          // TODO: Prevent default browser behavior
          // TODO: If gameState === 'PLAYING', call onDuck(false)
          break;
      }
    };

    // TODO: Add event listeners
    // Use window.addEventListener('keydown', handleKeyDown)
    // Use window.addEventListener('keyup', handleKeyUp)

    // TODO: Return cleanup function
    // Return a function that removes both listeners:
    //   window.removeEventListener('keydown', handleKeyDown)
    //   window.removeEventListener('keyup', handleKeyUp)
    return () => {
      // TODO: Remove event listeners here
    };
  }, [gameState, onJump, onDuck, onStart, onRestart]);
};


