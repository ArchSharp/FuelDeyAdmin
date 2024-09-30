import { useEffect, useMemo, useState } from "react";
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

import {
  // setBuyers,
  setIsAuth,
  setShowAlert,
  // setStaffs,
  // setStateFuelDashboardData,
  // setVendors,
} from "./Features/User/userSlice";
import { IdleSessionTimeout } from "idle-session-timeout";
import { Notification } from "./Components/Notification";
import Modal from "./Components/Modals/Modal";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, alertProps, isAuth } = useAppSelector(
    (state) => state.user
  );
  const [isTimeout, setIsTimeout] = useState(false);
  const [idleTimeLeft, setIdleTimeLeft] = useState(0);
  const [showTimeLeft, setShowTimeLeft] = useState(false);
  const [shouldResetSession, setShouldResetSession] = useState(false);
  // const [session, setSession] = useState<IdleSessionTimeout>(useMemo(() => new IdleSessionTimeout(1 * 60 * 1000), []));

  useEffect(() => {
    setupAxiosInterceptors(dispatch);

    // Cleanup function
    return () => {
      // Remove interceptors or perform any cleanup if needed
    };
  }, [dispatch]);

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

  // Idle session logout
  const session = useMemo(() => new IdleSessionTimeout(1 * 60 * 1000), []); // Time in seconds (5 minutes)
  useEffect(() => {
    session.onTimeOut = () => {
      dispatch(
        setShowAlert({
          content: "You have been logged out due to inactivity.",
          showAlert: true,
          isError: true,
        })
      );
      setIsTimeout(true);
    };

    //optional
    session.onTimeLeftChange = (timeLeft: number) => {
      // console.log(`${timeLeft} ms left`);
      const exitTimeLeft = parseInt((timeLeft / 1000).toFixed(0));
      if (exitTimeLeft < 11) {
        setIdleTimeLeft(exitTimeLeft);
        setShowTimeLeft(true);
      }
    };

    session.start();

    return () => {
      session.dispose();
    };
  }, [dispatch, session]);

  useEffect(() => {
    if (isTimeout) {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, isTimeout]);

  useEffect(() => {
    session.dispose();
  }, [isAuth]);

  useEffect(() => {
    if (showTimeLeft) {
      if (idleTimeLeft > 1) {
        dispatch(
          setShowAlert({
            content: `You will be logged out in next seconds: ${idleTimeLeft} Click continue to remain logged in.`,
            showAlert: true,
            isError: true,
          })
        );
      } else if (idleTimeLeft === 1) {
        dispatch(
          setShowAlert({ showAlert: false, content: "", isError: false })
        );
      }
    }
  }, [dispatch, showTimeLeft, idleTimeLeft]);

  useEffect(() => {
    if (shouldResetSession) {
      session.reset();
    }
  }, [shouldResetSession]);

  // console.log("shouldResetSession: ", shouldResetSession);

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      {showTimeLeft && (
        <Modal
          content={alertProps?.content}
          isOpen={alertProps?.showAlert}
          onClose={() => {
            setShouldResetSession(true);
            dispatch(
              setShowAlert({ ...alertProps, showAlert: false, content: "" })
            );
          }}
        />
      )}
      {!showTimeLeft && <Notification />}
      <Routes>
        <Route path={routes.homepage} index element={<Home />} />
        <Route path={routes.admin} index element={<AdminDashboard />} />
        <Route path={routes.error} index element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
