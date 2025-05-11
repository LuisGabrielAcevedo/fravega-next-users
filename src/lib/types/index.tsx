export const validFontSizes = [12, 14, 16, 18, 20, 24, 28, 32] as const;

export const validLineHeights = [16, 20, 24, 28, 32, 36, 40] as const;

export const validGaps = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40] as const;

export const baseColors = [
  "slate",
  "gray",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

export const colorShades = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type FontSizeType = (typeof validFontSizes)[number];
export type LineHeightType = (typeof validLineHeights)[number];

export type FontWeightType =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type GapType = (typeof validGaps)[number];

export type ColorNameType =
  `${(typeof baseColors)[number]}${(typeof colorShades)[number]}`;

export type PaddingType =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

export type BorderWidthType = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type BorderRadiusType =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "round";

export type ShadowType =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "inner";

export type FitType = "content" | "space";

export type TextAlignType = "left" | "right" | "center";

export type TextTransformType = "capitalize" | "lowercase" | "uppercase";

export type WordBreakType = "break-all" | "break-word";

export type TextDecorationType = "underline-solid" | "underline-dotted";

export type ElementTagType =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "small";

export type DirectionType = "row" | "column" | "row-reverse" | "column-reverse";

export type JustifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between";

export type AlignItemsType = "flex-start" | "flex-end" | "center" | "stretch";

export type WrapType = "wrap" | "wrap-reverse" | "nowrap";

export type AutoMinSizeType = "width" | "height" | "both";

export type DividerOrientationType = "horizontal" | "vertical";

export type ComponentPropsType = {
  className?: string;
  testId?: string;
};
