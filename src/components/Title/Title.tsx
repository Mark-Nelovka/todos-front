import React from "react";

interface ITitle {
  children: React.ReactNode;
  style: string;
}

export default function Title({ children, style }: ITitle):JSX.Element {
  return <h1 className={style}>{children}</h1>;
}
