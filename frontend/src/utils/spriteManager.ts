import { SpriteSheetConfig, SpriteFrame } from '../types/spriteTypes';

class SpriteManager {
  private spriteSheet: HTMLImageElement | null = null;
  private config: SpriteSheetConfig | null = null;
  private loaded: boolean = false;

  async loadSpriteSheet(config: SpriteSheetConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      
      image.onload = () => {
        this.spriteSheet = image;
        this.config = config;
        this.loaded = true;
        resolve();
      };
      
      image.onerror = () => {
        reject(new Error(`Failed to load sprite sheet: ${config.imagePath}`));
      };
      
      image.src = config.imagePath;
    });
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    spriteName: keyof SpriteSheetConfig['frames'],
    x: number,
    y: number,
    width?: number,
    height?: number
  ): boolean {
    if (!this.spriteSheet || !this.config || !this.loaded) {
      return false;
    }

    const frame = this.config.frames[spriteName];
    if (!frame) {
      console.warn(`Sprite frame "${spriteName}" not found`);
      return false;
    }

    // Use provided dimensions or default to frame dimensions
    const destWidth = width || frame.width;
    const destHeight = height || frame.height;

    ctx.drawImage(
      this.spriteSheet,
      frame.x, frame.y, frame.width, frame.height, // Source
      x, y, destWidth, destHeight // Destination
    );

    return true;
  }

  getFrameData(spriteName: keyof SpriteSheetConfig['frames']): SpriteFrame | null {
    if (!this.config) return null;
    return this.config.frames[spriteName] || null;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getCurrentConfig(): SpriteSheetConfig | null {
    return this.config;
  }
}

//indiviudal sprite

// class SpriteManager {
//   private sprites: Record<string, HTMLImageElement> = {};

//   async loadSprite(name: string, src: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
      
//       img.onload = () => {
//         this.sprites[name] = img;
//         resolve();
//       };
      
//       img.onerror = () => {
//         reject(new Error(`Failed to load sprite: ${src}`));
//       };
      
//       img.src = src;
//     });
//   }

//   drawSprite(
//     ctx: CanvasRenderingContext2D,
//     name: string,
//     x: number,
//     y: number,
//     width?: number,
//     height?: number
//   ): boolean {
//     const sprite = this.sprites[name];
//     if (!sprite) {
//       console.warn(`Sprite "${name}" not found`);
//       return false;
//     }

//     ctx.drawImage(
//       sprite,
//       x, y,
//       width ?? sprite.width,
//       height ?? sprite.height
//     );

//     return true;
//   }

//   isLoaded(name?: string): boolean {
//     if (name) return !!this.sprites[name];
//     return Object.keys(this.sprites).length > 0;
//   }

//   getSprite(name: string): HTMLImageElement | null {
//     return this.sprites[name] ?? null;
//   }
// }

export const spriteManager = new SpriteManager();

