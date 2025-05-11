import React from "react";
import * as LibTypes from "@/lib/types";
import style from "./Skeleton.module.css";
import { useClassNames } from "@/lib/hooks";
import { toCamelCase, toCssPixelValue } from "@/lib/utils";

type SkeletonProps = LibTypes.ComponentPropsType & {
  radius?: LibTypes.BorderRadiusType;
  height?: number | string;
  width?: number | string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  testId,
  className,
  height = 16,
  width = "100%",
  radius,
}) => {
  const composedClassName = useClassNames(
    {
      [style.skeleton]: true,
      [style[toCamelCase(`radius-${radius}`)]]: !!radius,
    },
    className
  );

  return (
    <div
      data-testid={testId}
      className={composedClassName}
      style={{
        height: toCssPixelValue(height),
        width: toCssPixelValue(width),
      }}
    />
  );
};
