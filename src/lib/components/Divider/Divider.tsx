import React from "react";
import * as LibTypes from "@/lib/types";
import { useClassNames } from "@/lib/hooks";
import style from "./Divider.module.css";
import { toCamelCase } from "@/lib/utils";

type DividerProps = LibTypes.ComponentPropsType & {
  orientation?: LibTypes.DividerOrientationType;
  borderWidth?: LibTypes.BorderWidthType;
  color?: LibTypes.ColorNameType;
};

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  borderWidth = "sm",
  color = "neutral200",
  className = "",
  testId,
}) => {
  const composedClassName = useClassNames(
    {
      [style.divider]: true,
      [style[toCamelCase(`divider-${orientation}`)]]: true,
      [style[toCamelCase(`divider-${orientation}-border-${borderWidth}`)]]:
        true,
      [toCamelCase(`bg-${color}`)]: !!color,
    },
    className
  );

  return <div data-testid={testId} className={composedClassName} />;
};
