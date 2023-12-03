import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/HomePage";

const CompletedPage = lazy(() => import ('pages/CompletedPage' /* webpackChunkName: "Todo completed page" */));
const PassedPage = lazy(() => import ('pages/PassedPage' /* webpackChunkName: "Todo passed page" */));
const ErrorPage = lazy(() => import ('pages/ErrorPage' /* webpackChunkName: "Error page" */));

function App():JSX.Element {
  return (
    <>
      <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/todos-front" element={<HomePage />} />
              <Route path="/todos-front/completed" element={<CompletedPage />} />
              <Route path="/todos-front/passed" element={<PassedPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
      </main>
    </>
  );
}

export default App;
