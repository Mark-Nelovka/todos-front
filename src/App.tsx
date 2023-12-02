import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Button from "ui/Button/Button";
import React, { Suspense, useEffect, useState } from "react";
import { useAppDispatch } from "redux/hook";
import { getAllTodos } from "redux/todos/todosOperations";
import Modal from "components/Modal/Modal";
import TodoList from "components/TodoList/TodoList";
import Pagination from "components/pagination/Pagination";
import { Route, Routes } from "react-router-dom";
import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/HomePage";
import CompletedPage from "pages/CompletedPage";
import PassedPage from "pages/PassedPage";
import ErrorPage from "pages/ErrorPage";
import Filter from "components/Navigation/Navigation";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getAllTodos({page: 1}))
  // }, [])

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
        <Filter />
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/passed" element={<PassedPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
      </Suspense>
        {/* <div className="container">
          <TodoList />
          <Pagination />
        </div> */}
      </main>
      {isModalOpen && <Modal toggleFunc={toggleModal} />}
      <Button
        id="open-modal"
        type="button"
        func={toggleModal}
        styles="buttonToggleForm"
      >
        +
      </Button>
      <Footer />
    </>
  );
}

export default App;
{/* <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/news" element={<HomePage />} />
            <Route path="/news/:news" element={<ArticlePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense> */}
