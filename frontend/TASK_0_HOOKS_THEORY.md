# Task 0: React Hook Introduction 

**Goal:** Understand what React hooks are and how they work before implementing your own.

> **Note:** All examples in this guide use **TypeScript**, which matches the project's codebase. If you're new to TypeScript, the type annotations (like `<number>`, `: void`, etc.) help document what types of values are expected.

## What is a React Hook?

A **hook** is a special function that lets you "hook into" React features. Think of it as a way to add functionality to your components.

## Built-in Hooks You've Probably Seen

### 1. `useState` - Managing State
```typescript
const [count, setCount] = useState<number>(0);
// useState returns: [currentValue, functionToUpdateValue]
// TypeScript: <number> tells TypeScript the type of the state
```
- Stores data that can change
- When the value changes, React re-renders the component
- TypeScript: Use `<Type>` to specify the state type

### 2. `useEffect` - Side Effects
```typescript
useEffect(() => {
  // This code runs after the component renders
  console.log('Component mounted!');
  
  return () => {
    // This cleanup code runs when component unmounts
    console.log('Component unmounting...');
  };
}, []); // Empty array = run once on mount
```
- Runs code at specific times (after render, on mount, on unmount)
- Perfect for: API calls, event listeners, timers
- Cleanup function prevents memory leaks

## Custom Hooks - Your Own Reusable Logic

A **custom hook** is just a regular function that:
- Starts with `use` (React convention: `useSomething`)
- Can call other hooks inside it
- Lets you share logic between components

### Example: Custom Hook Pattern
```typescript
// Custom hook: useCounter.ts
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0): UseCounterReturn {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);
  const reset = (): void => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Using the custom hook in a component:
const MyComponent: React.FC = () => {
  const { count, increment, decrement } = useCounter(10);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};
```

## Why Use Custom Hooks?

✅ **Reusability** - Write logic once, use it everywhere  
✅ **Organization** - Keep components clean and focused  
✅ **Testing** - Test logic separately from UI  
✅ **Separation of Concerns** - Logic vs. presentation

## How This Relates to Task 1

In **Task 1**, you'll create `useKeyboardControls` - a custom hook that:
- Uses `useEffect` to set up keyboard event listeners
- Handles all keyboard logic in one place
- Can be reused in any component that needs keyboard controls
- Cleans up event listeners automatically when done

### The Pattern You'll See:
```typescript
interface UseKeyboardControlsProps {
  gameState: 'WAITING' | 'PLAYING' | 'GAME_OVER';
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
    // 1. Set up event listeners
    const handleKeyDown = (event: KeyboardEvent): void => { /* ... */ };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // 2. Cleanup function (removes listeners)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, onJump, onDuck, onStart, onRestart]);
};
```

## Key Takeaways

1. **Hooks are functions** that start with `use`
2. **`useEffect`** is perfect for side effects (event listeners, API calls)
3. **Custom hooks** let you extract and reuse logic
4. **Always clean up** in `useEffect` return (remove listeners, clear timers)
5. **Dependency array** `[]` controls when the effect runs

---

**Ready for Task 1?** Head back to the [README.md](./README.md) to start implementing your keyboard controls hook!

