import React from "react";

interface IButton {
  children: React.ReactNode;
  styles: string;
  func?: (e: React.MouseEvent) => void;
  type: "button" | "submit" | "reset" | undefined;
  id: string;
}

export default function Button({ children, styles, func, type, id }: IButton) {
  return (
    <button data-backdrop id={id} onClick={func} type={type} className={styles}>
      {children}
    </button>
  );
}
