import React from "react";
import { createPortal } from "react-dom";
import Form from "components/Form/Form";
import ModalComponent from "components/ModalComponent/ModalComponent";
import Backdrop from "components/Backdrop/Backdrop";
import { TTodoPayload } from "redux/todos/types";

interface IModal {
  toggleFunc: (e: React.MouseEvent) => void;
  todoForUpdate?: TTodoPayload;
}

export default function Modal({
  toggleFunc,
  todoForUpdate,
}: IModal): JSX.Element {
  return createPortal(
    <Backdrop toggleFunc={toggleFunc}>
      <ModalComponent toggleFunc={toggleFunc}>
        <Form todoForUpdate={todoForUpdate} />
      </ModalComponent>
    </Backdrop>,
    document.body
  );
}
