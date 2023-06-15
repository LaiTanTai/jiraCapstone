import React, { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const Firstpage = lazy(() => import("./components/FirstPage/FirstPage"));
const Mainpage = lazy(() => import("./components/MainPage/MainPage"));
const Signin = lazy(() => import("./layouts/AuthLayout/Signin/Signin"));
const Signup = lazy(() => import("./layouts/AuthLayout/Signup/Signup"));
const CreateTask = lazy(() =>
  import("./components/MainPage/CreateTask/CreateTask")
);

function App() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/Home"></Route>
          <Route path="/login" element={<Signin />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/Main" element={<Mainpage />}>
            {" "}
          </Route>
          <Route path="/Main/CreateTask" element={<CreateTask />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
