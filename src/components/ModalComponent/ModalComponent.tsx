import React from "react";
import Button from "ui/Button/Button";
import closeIcon from "assets/close-icon.svg";

interface IModalProps {
  children: React.ReactNode;
  toggleFunc: (e: React.MouseEvent) => void;
}

export default function ModalComponent({ children, toggleFunc }: IModalProps) {
  return (
    <div className="modal">
      <Button
        id="modal-close-button"
        func={toggleFunc}
        styles="form__close-buttom"
        type="button"
      >
        <img src={closeIcon} alt="Icon for close modal" />
      </Button>
      {children}
    </div>
  );
}
