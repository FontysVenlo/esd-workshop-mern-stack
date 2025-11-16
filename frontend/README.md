# MERN Dino Game Workshop - Frontend (React)

## Workshop Overview

Welcome to the **Frontend** section of the MERN Dino Game Workshop! In this 30-45 minute session, you'll build the React frontend for a Chrome T-Rex style game. You'll work with React hooks, canvas rendering, keyboard controls.

### What You'll Build

- A fully functional T-Rex runner game with:
  - Keyboard controls (jump, duck, start/restart)
  - Game state management (waiting, playing, game over)
  - Collision detection between T-Rex and obstacles
  - Score tracking and high score persistence


### Expected Time: 30-45 minutes

---

## Folder Structure Explanation

Here's the key structure of the frontend project:

```
frontend/
├── src/
│   ├── components/
│   │   └── TRexGame/
│   │       ├── TRexGame.tsx          # Main game component
│   │       ├── GameCanvas.tsx         # Canvas rendering component
│   │       └── DashBoard.jsx         # Leaderboard component
│   ├── hooks/
│   │   ├── useGameLoop.ts            # Game loop and physics
│   │   └── useKeyboardControls.ts    # Keyboard event handling
│   ├── utils/
│   │   ├── gameUtils.ts              # Collision detection, obstacles
│   │   ├── drawingUtils.ts          # Canvas drawing functions
│   │   └── spriteManager.ts         # Sprite sheet management
│   ├── constants/
│   │   └── gameConstants.ts          # Game configuration values
│   ├── types/
│   │   ├── gameTypes.ts              # TypeScript type definitions
│   │   └── spriteTypes.ts            # Sprite-related types
│   ├── context/
│   │   └── socket.js                 # WebSocket connection setup
│   ├── config/
│   │   └── spriteConfigs.ts          # Sprite sheet configurations
│   └── App.jsx                       # Root component with routing
├── public/
│   └── sprites/
│       └── 100-offline-sprite.png    # Game sprite sheet
└── package.json                      # Dependencies and scripts
```

---

## Step-by-Step Workshop Segments

### Task 1: Implement Keyboard Controls Hook ⏱️ ~8 minutes

**File to open:** `src/hooks/useKeyboardControls.ts`

**Goal:** Create a custom React hook that handles keyboard input for game controls.

**What to implement:**

- [ ] Set up event listeners for `keydown` and `keyup` events
- [ ] Handle `Space` and `ArrowUp` keys for jumping/starting/restarting
- [ ] Handle `ArrowDown` key for ducking (with proper keyup handling)
- [ ] Prevent default browser behavior for game keys
- [ ] Clean up event listeners on component unmount

**TODO Checklist:**

1. In `useKeyboardControls.ts`, find the `handleKeyDown` function
2. Add a case for `'Space'` and `'ArrowUp'` that:
   - Calls `onStart()` when `gameState === 'WAITING'`
   - Calls `onJump()` when `gameState === 'PLAYING'`
   - Calls `onRestart()` when `gameState === 'GAME_OVER'`
3. Add a case for `'ArrowDown'` that calls `onDuck(true)` when playing
4. Implement `handleKeyUp` to call `onDuck(false)` when `ArrowDown` is released
5. Add `event.preventDefault()` to prevent page scrolling

**Key Code Reference:**
```typescript
// Look for the switch statement in handleKeyDown
switch (event.code) {
  case 'Space':
  case 'ArrowUp':
    // TODO: Implement start/jump/restart logic
    break;
  case 'ArrowDown':
    // TODO: Implement duck logic
    break;
}
```

---

### Task 2: Implement Game State Management ⏱️ 

**File to open:** `src/components/TRexGame/TRexGame.tsx`

**Goal:** Set up the game state and control functions for starting, jumping, and ducking.

**What to implement:**

- [ ] Initialize game state with `useState` hook
- [ ] Create `startGame` function to reset game to initial playing state
- [ ] Create `jump` function that sets T-Rex velocity (only if not already jumping/ducking)
- [ ] Create `duck` function that toggles ducking state
- [ ] Pass these functions to the `useKeyboardControls` hook

**TODO Checklist:**

1. In `TRexGame.tsx`, find the `gameState` initialization
2. Implement `startGame` callback to reset:
   - `state: 'PLAYING'`
   - `score: 0`
   - `speed: INITIAL_SPEED`
   - `trexY: GROUND_Y - TREX_HEIGHT`
   - Clear obstacles array
3. Implement `jump` callback that:
   - Checks if already jumping or ducking (return early if so)
   - Sets `isJumping: true` and `trexVelocityY: JUMP_VELOCITY`
4. Implement `duck` callback that sets `isDucking` based on the parameter
5. Pass all callbacks to `useKeyboardControls` hook

**Key Code Reference:**
```typescript
const jump = useCallback(() => {
  setGameState(prevState => {
    // TODO: Check if already jumping/ducking
    // TODO: Set jumping state and velocity
  });
}, []);
```

---

### Task 3: Implement Collision Detection ⏱️ 

**File to open:** `src/utils/gameUtils.ts`

**Goal:** Create functions to generate obstacles and detect collisions between T-Rex and obstacles.

**What to implement:**

- [ ] `generateObstacle` function that creates random obstacles (cactus or pterodactyl)
- [ ] `checkCollision` function that uses AABB (Axis-Aligned Bounding Box) collision detection
- [ ] Ensure obstacles spawn at appropriate distances

**TODO Checklist:**

1. In `gameUtils.ts`, find the `generateObstacle` function
2. Implement obstacle generation:
   - Randomly choose between `'cactus'` and `'pterodactyl'` (30% chance for pterodactyl)
   - For cactus: random variant (1, 2, or 3 cacti), width based on variant, height 32
   - For pterodactyl: width 40, height 35, random Y position above ground
   - Set `x` position ensuring minimum distance from last obstacle
3. Implement `checkCollision` function:
   - Check if T-Rex hitbox overlaps with obstacle hitbox
   - Use AABB collision: check all four boundaries
   - Return `true` if collision detected, `false` otherwise

**Key Code Reference:**
```typescript
export const checkCollision = (trex: TRexHitbox, obstacle: Obstacle): boolean => {
  // TODO: Implement AABB collision detection
  // Check: trex.x < obstacle.x + obstacle.width
  // Check: trex.x + trex.width > obstacle.x
  // Check: trex.y < obstacle.y + obstacle.height
  // Check: trex.y + trex.height > obstacle.y
  // Return true if all conditions are met
};
```



## Stretch Goals (Optional)

If you finish early or want extra challenges, try these:

### 🎯 Stretch Goal 1: Add Sound Effects
- Add sound effects for jump, collision, and score milestones
- Use the Web Audio API or a library like `howler.js`
- **Files to modify:** `src/utils/drawingUtils.ts`, `src/hooks/useGameLoop.ts`

### 🎯 Stretch Goal 2: Implement Power-ups
- Add temporary power-ups (speed boost, invincibility, double points)
- Spawn power-ups randomly like obstacles
- **Files to modify:** `src/types/gameTypes.ts`, `src/utils/gameUtils.ts`, `src/hooks/useGameLoop.ts`

### 🎯 Stretch Goal 3: Add Particle Effects
- Create particle effects when T-Rex collides with obstacles
- Add dust particles when running
- **Files to modify:** `src/utils/drawingUtils.ts`, `src/hooks/useGameLoop.ts`

### 🎯 Stretch Goal 4: Mobile Touch Controls
- Add touch event handlers for mobile devices
- Support swipe up for jump, swipe down for duck
- **Files to modify:** `src/hooks/useKeyboardControls.ts` (or create `useTouchControls.ts`)

### 🎯 Stretch Goal 5: Game Difficulty Levels
- Add easy/medium/hard difficulty settings
- Adjust obstacle spawn rate and speed increment based on difficulty
- **Files to modify:** `src/constants/gameConstants.ts`, `src/components/TRexGame/TRexGame.tsx`

### 🎯 Stretch Goal 6: Local Multiplayer Mode
- Allow two players to compete side-by-side
- Use different keys for each player (WASD vs Arrow keys)
- **Files to modify:** `src/components/TRexGame/TRexGame.tsx`, `src/hooks/useKeyboardControls.ts`

---

## Troubleshooting

### Common Issues 

**Issue:** Game doesn't start when pressing Space
- **Solution:** Check that `useKeyboardControls` is properly connected in `TRexGame.tsx`

**Issue:** T-Rex doesn't jump
- **Solution:** Verify `jump` function sets `trexVelocityY` to `JUMP_VELOCITY` (negative value)

**Issue:** Collisions not detected
- **Solution:** Check that `checkCollision` is called in the game loop and hitbox calculations are correct

**Issue:** Backend API calls fail
- **Solution:** Verify `VITE_BACKEND_URL` in `.env` matches your backend server URL

**Issue:** WebSocket not connecting
- **Solution:** Check that backend is running and CORS is properly configured

---

## Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Socket.io Client Documentation](https://socket.io/docs/v4/client-api/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Next Steps

After completing the frontend:
1. Test your game thoroughly
2. Try the stretch goals if time permits
3. Move on to the Backend section of the workshop
4. Integrate frontend and backend together

**Happy coding! 🦖🎮**
