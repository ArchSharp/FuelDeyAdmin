import { useEffect } from "react";
// import "./App.css";
import { useAppDispatch, useAppSelector } from "./Store/store";
import { setupAxiosInterceptors } from "./Features/utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as routes from "./Data/Routes";
import { Loader } from "./Components/Loader";
// import { Welcome } from "./Screens/Welcome";
import { ErrorPage } from "./Screens/ErrorPage";
import { Home } from "./Screens/Home";
import { Dashboard } from "./Screens/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    setupAxiosInterceptors(dispatch);

    // Cleanup function
    return () => {
      // Remove interceptors or perform any cleanup if needed
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <Routes>
        <Route path={routes.homepage} index element={<Home />} />
        <Route path={routes.dashboard} index element={<Dashboard />} />
        <Route path={routes.error} index element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
