import React, { PropsWithChildren } from "react";
import * as LibTypes from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import style from "./Text.module.css";
import { toCamelCase } from "@/lib/utils";

type TextProps = LibTypes.ComponentPropsType & {
  size?: LibTypes.FontSizeType;
  lineHeight?: LibTypes.LineHeightType;
  weight?: LibTypes.FontWeightType;
  as?: LibTypes.ElementTagType;
  align?: LibTypes.TextAlignType;
  color?: LibTypes.ColorNameType;
  transform?: LibTypes.TextTransformType;
  wordBreak?: LibTypes.WordBreakType;
  ellipsis?: boolean;
  textDecoration?: LibTypes.TextDecorationType;
  fit?: LibTypes.FitType;
};

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
  as = "span",
  children,
  className,
  testId,
  ellipsis,
  transform,
  ...props
}) => {
  const Component = as;

  const composedClassName = useClassNames(
    {
      [style.text]: true,
      [style[`text${props.size}`]]: !!props.size,
      [style[`leading${props.lineHeight}`]]: !!props.lineHeight,
      [style[toCamelCase(`font-${props.weight}`)]]: !!props.weight,
      [style[toCamelCase(`align-${props.align}`)]]: !!props.align,
      [toCamelCase(`text-${props.color}`)]: !!props.color,
      [style[toCamelCase(props.textDecoration)]]: !!props.textDecoration,
      [style[toCamelCase(props.wordBreak)]]: !!props.wordBreak,
      [style[toCamelCase(`fit-${props.fit}`)]]: !!props.fit,
      [style.ellipsis]: !!ellipsis,
      [style.uppercase]: transform === "uppercase",
      [style.lowercase]: transform === "lowercase",
      [style.capitalize]: transform === "capitalize",
    },
    className
  );

  return (
    <Component className={composedClassName} data-testid={testId}>
      {children}
    </Component>
  );
};
