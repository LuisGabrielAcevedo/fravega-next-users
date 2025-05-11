import React, { PropsWithChildren } from "react";
import style from "./IconButton.module.css";
import { useClassNames } from "@/lib/hooks";
import * as LibTypes from "@/lib/types";

type IconButtonProps = LibTypes.ComponentPropsType & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const IconButton: React.FC<PropsWithChildren<IconButtonProps>> = ({
  children,
  className,
  testId,
  onClick,
}) => {
  const composedClassName = useClassNames(
    {
      [style.iconButton]: true,
    },
    className
  );

  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={composedClassName}
    >
      {children}
    </button>
  );
};
