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
import { AdminDashboard } from "./Screens/AdminDashboard";
import { VendorDashboard } from "./Screens/VendorDashboard";

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
        <Route path={routes.admindash} index element={<AdminDashboard />} />
        <Route path={routes.vendordash} index element={<VendorDashboard />} />
        <Route path={routes.error} index element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
