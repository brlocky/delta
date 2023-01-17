import React from "react";

interface TitleComponentProps {
  children: string;
}
export const TitleComponent = (props: TitleComponentProps) => {
  return <span className="mb-1 text-lg font-medium dark:text-black">{props.children}</span>;
};
