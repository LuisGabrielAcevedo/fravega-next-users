import React, { PropsWithChildren } from "react";
import * as LibTypes from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import { toCamelCase } from "@/lib/utils";
import style from "./Stack.module.css";

type StackProps = LibTypes.ComponentPropsType & {
  direction?: LibTypes.DirectionType;
  gap?: LibTypes.GapType;
  align?: LibTypes.AlignItemsType;
  justify?: LibTypes.JustifyContentType;
  wrap?: LibTypes.WrapType;
  stretch?: boolean;
  fit?: LibTypes.FitType;
  noAutoMinSize?: LibTypes.AutoMinSizeType;
};

export const Stack: React.FC<PropsWithChildren<StackProps>> = ({
  children,
  className,
  testId,
  ...props
}) => {
  const composedClassName = useClassNames(
    {
      [style.stack]: true,
      [style.stretch]: props.stretch,
      [style[toCamelCase(`direction-${props.direction}`)]]: !!props.direction,
      [style[toCamelCase(`align-${props.align}`)]]: !!props.align,
      [style[toCamelCase(`justify-${props.justify}`)]]: !!props.justify,
      [style[toCamelCase(`wrap-${props.wrap}`)]]: !!props.wrap,
      [style[`gap${props.gap}`]]: typeof props.gap === "number",
      [style[toCamelCase(`fit-${props.fit}`)]]: !!props.fit,
      [style.minWidth0]:
        props.noAutoMinSize === "width" || props.noAutoMinSize === "both",
      [style.minHeight0]:
        props.noAutoMinSize === "height" || props.noAutoMinSize === "both",
    },
    className
  );

  return (
    <div data-testid={testId} className={composedClassName}>
      {children}
    </div>
  );
};

export const VStack: React.FC<
  Omit<PropsWithChildren<StackProps>, "direction">
> = (props) => <Stack {...props} direction='column' />;

export const HStack: React.FC<
  Omit<PropsWithChildren<StackProps>, "direction">
> = (props) => <Stack {...props} direction='row' />;

export const Center: React.FC<
  Omit<
    PropsWithChildren<StackProps>,
    "direction" | "align" | "justify" | "wrap"
  >
> = (props) => (
  <Stack {...props} direction='row' align='center' justify='center' />
);
