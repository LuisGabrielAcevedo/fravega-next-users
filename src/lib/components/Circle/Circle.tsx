import React, { PropsWithChildren } from "react";
import style from "./Circle.module.css";
import { ComponentPropsType } from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import { toCssPixelValue } from "@/lib/utils";

type CircleProps = ComponentPropsType & {
  size?: number | string;
};

export const Circle: React.FC<PropsWithChildren<CircleProps>> = ({
  children,
  className,
  testId,
  size,
}) => {
  const composedClassName = useClassNames(
    {
      [style.circle]: true,
    },
    className
  );

  return (
    <div
      data-testid={testId}
      className={composedClassName}
      style={
        size
          ? {
              width: toCssPixelValue(size),
              height: toCssPixelValue(size),
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};
