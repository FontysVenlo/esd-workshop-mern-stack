import { Obstacle, TRexHitbox } from '../types/gameTypes';
import { CANVAS_WIDTH, GROUND_Y, MIN_OBSTACLE_DISTANCE } from '../constants/gameConstants';

export const generateObstacle = (lastX: number): Obstacle => {
  const obstacleTypes = ['cactus', 'pterodactyl'] as const;
  const type = Math.random() < 0.3 ? 'pterodactyl' : 'cactus';
  
  let width, height, y, variant;
  
  if (type === 'cactus') {
    variant = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 cacti
    width = variant === 1 ? 14 : variant === 2 ? 28 : 42; // Slightly smaller widths
    height = 32; // Slightly shorter
    y = GROUND_Y - height;
  } else {
    variant = 1;
    width = 40; // Smaller pterodactyl width
    height = 35; // Smaller pterodactyl height
    y = GROUND_Y - height - 25 - Math.random() * 25; // Flying height variation
  }

  return {
    id: Date.now() + Math.random(),
    x: Math.max(CANVAS_WIDTH, lastX + MIN_OBSTACLE_DISTANCE + Math.random() * 200),
    y,
    width,
    height,
    type,
    variant
  };
};

export const checkCollision = (trex: TRexHitbox, obstacle: Obstacle): boolean => {
  return trex.x < obstacle.x + obstacle.width &&
         trex.x + trex.width > obstacle.x &&
         trex.y < obstacle.y + obstacle.height &&
         trex.y + trex.height > obstacle.y;
};

// --- Utility to set a cookie ---
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // days → ms
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

// --- Utility to get a cookie ---
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
};

// --- Dynamic multi-cookie getter ---
export const getCookieData = (...names: string[]): Map<string, string> => {
  const map = new Map<string, string>();
  for (const name of names) {
    const match = document.cookie
      .split(";")
      .map(c => c.trim())
      .find(c => c.startsWith(name + "="));

    map.set(name, match ? decodeURIComponent(match.split("=")[1]) : "");
  }
  return map; // never null
};


export const saveToCookies = (cookieName: string ,data: number): void => {
  setCookie(cookieName, data.toString(), 1); 
};
