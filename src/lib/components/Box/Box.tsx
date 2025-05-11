import React, { PropsWithChildren } from "react";
import * as LibTypes from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import { toCamelCase } from "@/lib/utils";
import style from "./Box.module.css";

type BoxProps = LibTypes.ComponentPropsType & {
  padding?: LibTypes.PaddingType;
  paddingX?: LibTypes.PaddingType;
  paddingY?: LibTypes.PaddingType;
  borderWidth?: LibTypes.BorderWidthType;
  borderColor?: LibTypes.ColorNameType;
  backgroundColor?: LibTypes.ColorNameType;
  radius?: LibTypes.BorderRadiusType;
  shadow?: LibTypes.ShadowType;
  stretch?: boolean;
  fit?: LibTypes.FitType;
  noAutoMinSize?: LibTypes.AutoMinSizeType;
  isRelative?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Box: React.FC<PropsWithChildren<BoxProps>> = ({
  className,
  testId,
  children,
  onClick,
  ...props
}) => {
  const composedClassName = useClassNames(
    {
      [style.box]: true,
      [style.relative]: props.isRelative,
      [style[toCamelCase(`padding-${props.padding}`)]]: !!props.padding,
      [style[toCamelCase(`paddingX-${props.paddingX}`)]]: !!props.paddingX,
      [style[toCamelCase(`paddingY-${props.paddingY}`)]]: !!props.paddingY,
      [style.border]: !!props.borderColor || !!props.borderWidth,
      [style[toCamelCase(`border-${props.borderWidth}`)]]: !!props.borderWidth,
      [toCamelCase(`border-${props.borderColor}`)]: !!props.borderColor,
      [style.borderSm]: !!props.borderColor && !props.borderWidth,
      [toCamelCase(`bg-${props.backgroundColor}`)]: !!props.backgroundColor,
      [style[toCamelCase(`radius-${props.radius}`)]]: !!props.radius,
      [style[toCamelCase(`shadow-${props.shadow}`)]]: !!props.shadow,
      [style.stretch]: props.stretch,
      [style[toCamelCase(`fit-${props.fit}`)]]: !!props.fit,
      [style.minWidth0]:
        props.noAutoMinSize === "width" || props.noAutoMinSize === "both",
      [style.minHeight0]:
        props.noAutoMinSize === "height" || props.noAutoMinSize === "both",
      [style.clickable]: !!onClick,
    },
    className
  );

  return (
    <div data-testid={testId} className={composedClassName} onClick={onClick}>
      {children}
    </div>
  );
};
