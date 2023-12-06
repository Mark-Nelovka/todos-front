import React from "react";
import Button from "ui/Button/Button";
import closeIcon from "assets/close-icon.svg";

interface IModalProps {
  children: React.ReactNode;
  toggleFunc: (e: React.MouseEvent) => void;
}

export default function ModalComponent({
  children,
  toggleFunc,
}: IModalProps): JSX.Element {
  return (
    <div className="modal">
      <Button
        id="modal-close-button"
        func={toggleFunc}
        styles="modal__close-button"
        type="button"
        dataValue="true"
      >
        <img data-backdrop="true" src={closeIcon} alt="Icon for close modal" />
      </Button>
      {children}
    </div>
  );
}
