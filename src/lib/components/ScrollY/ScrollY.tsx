import React, { PropsWithChildren } from "react";
import style from "./ScrollY.module.css";
import { ComponentPropsType } from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import { toCssPixelValue } from "@/lib/utils";

type ScrollYProps = ComponentPropsType & {
  maxHeight?: number | string;
  overlay?: boolean;
};

export const ScrollY: React.FC<PropsWithChildren<ScrollYProps>> = ({
  children,
  className,
  testId,
  maxHeight,
  overlay = true,
}) => {
  const composedClassName = useClassNames(
    {
      [style.scrollY]: true,
      [style.overlayScroll]: overlay,
      [style.autoScroll]: !overlay,
    },
    className
  );

  return (
    <div
      data-testid={testId}
      className={composedClassName}
      style={
        maxHeight
          ? {
              maxHeight: toCssPixelValue(maxHeight),
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};
