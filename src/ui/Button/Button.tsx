import React from "react";

interface IButton {
  children: React.ReactNode;
  styles: string;
  func?: (e: React.MouseEvent) => void;
  type: "button" | "submit" | "reset" | undefined;
  id: string;
  dataValue?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  styles,
  func,
  type,
  id,
  dataValue = "true",
  disabled,
}: IButton) {
  return (
    <button
      disabled={disabled}
      data-backdrop={dataValue}
      id={id}
      onClick={func}
      type={type}
      className={styles}
    >
      {children}
    </button>
  );
}
