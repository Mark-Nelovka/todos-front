import { createPortal } from "react-dom";
import Backdrop from "components/Backdrop/Backdrop";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Modal from "components/Modal/Modal";
import Button from "ui/Button/Button";
import React, { useState } from "react";
import Form from "components/Form/Form";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset } = e.target as HTMLDivElement;
    if (dataset.backdrop) {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h1>Todo list</h1>
        </div>
        <Button type="button" func={toggleModal} styles="buttonToggleForm">
          +
        </Button>
      </main>
      <Footer />
      {isModalOpen &&
        createPortal(
          <Backdrop isOpen={isModalOpen} toggleFunc={toggleModal}>
            <Modal toggleFunc={toggleModal}>
              <Form />
            </Modal>
          </Backdrop>,
          document.body
        )}
    </>
  );
}

export default App;
