export const toCssPixelValue = (val?: number | string): string | undefined =>
  typeof val === "number" ? `${val}px` : val;
