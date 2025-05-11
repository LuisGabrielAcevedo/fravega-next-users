import React, { PropsWithChildren } from "react";
import style from "./Position.module.css";
import { useClassNames } from "@/lib/hooks";
import { ComponentPropsType } from "@/lib/types";
import { toCssPixelValue } from "@/lib/utils";

type PositionProps = ComponentPropsType & {
  position?: "absolute" | "fixed" | "relative";
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;
};

export const Position: React.FC<PropsWithChildren<PositionProps>> = ({
  children,
  position = "relative",
  top,
  right,
  bottom,
  left,
  zIndex,
  className,
  testId,
}) => {
  const composedClassName = useClassNames(
    {
      [style.position]: true,
      [style.absolute]: position === "absolute",
      [style.relative]: position === "relative",
      [style.fixed]: position === "fixed",
    },
    className
  );

  return (
    <div
      data-testid={testId}
      className={composedClassName}
      style={{
        top: toCssPixelValue(top),
        right: toCssPixelValue(right),
        bottom: toCssPixelValue(bottom),
        left: toCssPixelValue(left),
        zIndex,
      }}
    >
      {children}
    </div>
  );
};
