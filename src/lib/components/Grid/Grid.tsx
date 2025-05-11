import React, { PropsWithChildren } from "react";
import style from "./Grid.module.css";
import { useClassNames } from "@/lib/hooks";
import * as LibTypes from "@/lib/types";

type GridProps = LibTypes.ComponentPropsType & {
  gap?: LibTypes.GapType;
};

export const Grid: React.FC<PropsWithChildren<GridProps>> = ({
  children,
  className,
  testId,
  ...props
}) => {
  const composedClassName = useClassNames(
    {
      [style.grid]: true,
      [style[`gap${props.gap}`]]: typeof props.gap === "number",
    },
    className
  );
  return (
    <div data-testid={testId} className={composedClassName}>
      {children}
    </div>
  );
};
