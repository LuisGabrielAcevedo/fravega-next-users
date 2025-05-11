import React from "react";
import style from "./Spacer.module.css";
import * as LibTypes from "@/lib/types";
import { useClassNames } from "@/lib/hooks";

type SpacerProps = LibTypes.ComponentPropsType;

export const Spacer: React.FC<SpacerProps> = ({ className, testId }) => {
  const composedClassName = useClassNames(
    {
      [style.spacer]: true,
    },
    className
  );
  return <div data-testid={testId} className={composedClassName} />;
};
