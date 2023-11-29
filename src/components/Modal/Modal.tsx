import React from "react";
import Button from "ui/Button/Button";

interface IModalProps {
  children: React.ReactNode;
  toggleFunc: (e: React.MouseEvent) => void;
}

export default function Modal({ children, toggleFunc }: IModalProps) {
  return (
    <div className="modal">
      <Button func={toggleFunc} styles="form__close-buttom" type="button">
        X
      </Button>
      {children}
    </div>
  );
}
