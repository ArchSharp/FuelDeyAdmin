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
import { setStateFuelDashboardData } from "./Features/User/userSlice";

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

  useEffect(() => {
    dispatch(
      setStateFuelDashboardData({
        availability: [
          { state: "Lagos", availability: 200 },
          { state: "Abuja", availability: 120 },
          { state: "Kaduna", availability: 10 },
          { state: "Kano", availability: 150 },
          { state: "Kebbi", availability: 45 },
          { state: "Kwara", availability: 15 },
          { state: "Abia", availability: 25 },
          { state: "Katsina", availability: 30 },
          { state: "Kogi", availability: 90 },
          { state: "Borno", availability: 55 },
          { state: "Nassarawa", availability: 65 },
          { state: "Kebbi", availability: 40 },
          { state: "Zamfara", availability: 35 },
          { state: "Delta", availability: 75 },
          { state: "Ebonyi", availability: 70 },
          { state: "Gombe", availability: 20 },
        ],
      })
    );
  }, []);

  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

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
