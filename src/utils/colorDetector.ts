export type CubeColor = 'U' | 'D' | 'L' | 'R' | 'F' | 'B'; // Up=White, Down=Yellow, Left=Orange, Right=Red, Front=Green, Back=Blue

export interface DetectedColor {
  color: CubeColor;
  hex: string;
  confidence: number;
}

const COLOR_MAP: Record<CubeColor, { r: number; g: number; b: number; hex: string }> = {
  U: { r: 255, g: 255, b: 255, hex: '#ffffff' }, // White
  D: { r: 255, g: 255, b: 0, hex: '#eab308' },   // Yellow
  L: { r: 249, g: 115, b: 22, hex: '#f97316' },   // Orange
  R: { r: 239, g: 68, b: 68, hex: '#ef4444' },    // Red
  F: { r: 34, g: 197, b: 94, hex: '#22c55e' },    // Green
  B: { r: 59, g: 130, b: 246, hex: '#3b82f6' },   // Blue
};

export function detectStickerColor(r: number, g: number, b: number): DetectedColor {
  let minDistance = Infinity;
  let matchedColor: CubeColor = 'U';

  (Object.keys(COLOR_MAP) as CubeColor[]).forEach((key) => {
    const target = COLOR_MAP[key];
    const dist = Math.sqrt(
      Math.pow(r - target.r, 2) +
      Math.pow(g - target.g, 2) +
      Math.pow(b - target.b, 2)
    );
    if (dist < minDistance) {
      minDistance = dist;
      matchedColor = key;
    }
  });

  // Calculate confidence score normalized between 0.50 and 1.00
  const maxPossibleDist = Math.sqrt(3 * Math.pow(255, 2));
  const confidence = Math.max(0.5, parseFloat((1 - minDistance / maxPossibleDist).toFixed(2)));

  return {
    color: matchedColor,
    hex: COLOR_MAP[matchedColor].hex,
    confidence,
  };
}