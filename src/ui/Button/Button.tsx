import React from "react";

interface IButton {
  children: React.ReactNode;
  styles: string;
  func?: (e: React.MouseEvent) => void;
  type: "button" | "submit" | "reset" | undefined;
}

export default function Button({ children, styles, func, type }: IButton) {
  return (
    <button data-backdrop onClick={func} type={type} className={styles}>
      {children}
    </button>
  );
}
