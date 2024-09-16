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
import { VendorDashboard } from "./Screens/VendorDashboard";
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

  // useEffect(() => {
  //   dispatch(
  //     setVendors({
  //       data: [
  //         {
  //           vendorName: "Mobil Apapa",
  //           manager: "Emmanuel Crystal",
  //           phoneno: "+2349087561324",
  //           email: "archraphr@gmail.com",
  //           address: "1 crescent Jalingo road",
  //           lga: "Victoria island",
  //           state: "Lagos",
  //           isActive: true,
  //           isFuelAvailable: true,
  //           fuelTypes: ["Petrol", "Diesel"],
  //           ownerType: "Private",
  //           stockLevel: {
  //             petrol: 2000,
  //             diesel: 1200,
  //             kerosene: 1450,
  //             cookingGas: 2300,
  //           },
  //         },
  //         {
  //           vendorName: "NNPC Ikeja",
  //           manager: "Jeremiah Trem",
  //           phoneno: "+2349087561324",
  //           email: "archraphr@gmail.com",
  //           address: "1 crescent Jalingo road",
  //           lga: "Victoria island",
  //           state: "Lagos",
  //           isActive: true,
  //           isFuelAvailable: true,
  //           fuelTypes: ["Petrol", "Diesel"],
  //           ownerType: "Government",
  //           stockLevel: {
  //             petrol: 2000,
  //             diesel: 1200,
  //             kerosene: 1450,
  //             cookingGas: 2300,
  //           },
  //         },
  //       ],
  //       pagination: { limit: 30, page: 1, totalCount: 70, totalUser: 500 },
  //     })
  //   );

  //   dispatch(
  //     setStaffs({
  //       data: [
  //         {
  //           firstName: "Kenny",
  //           lastName: "Afolabi",
  //           address: "43 Abule-egba Toll gate ibadan express street",
  //           fullName: "Kenny Afolabi",
  //           email: "archraphr@gmail.com",
  //           phoneno: "+2349023986741",
  //           role: "SuperAdmin",
  //           createdAt: new Date().toDateString(),
  //           isActive: true,
  //         },
  //       ],
  //       pagination: { limit: 30, page: 1, totalCount: 70, totalUser: 500 },
  //     })
  //   );

  //   dispatch(
  //     setBuyers({
  //       data: [
  //         {
  //           fullName: "Alade George Barret",
  //           email: "archraphr@gmail.com",
  //           phoneno: "+2349098126743",
  //           isActive: true,
  //           lastTenVisitedStation: [
  //             {
  //               stationName: "Mobil Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 4,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "NNPC Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 2,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Ikeja",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 5,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "NNPC Hilton",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 8,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Abuja",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 12,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "NNPC Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 1,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 8,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 1,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 3,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //             {
  //               stationName: "Mobil Apapa",
  //               coordinates: "4.700 3.37847",
  //               countIn3Days: 7,
  //               address: "1 crescent Jalingo road Lagos",
  //             },
  //           ],
  //         },
  //       ],
  //       pagination: { limit: 30, page: 1, totalCount: 70, totalUser: 500 },
  //     })
  //   );
  //   dispatch(
  //     setStateFuelDashboardData({
  //       availability: [
  //         { state: "Lagos", availability: 200 },
  //         { state: "Abuja", availability: 120 },
  //         { state: "Kaduna", availability: 10 },
  //         { state: "Kano", availability: 150 },
  //         { state: "Kebbi", availability: 45 },
  //         { state: "Kwara", availability: 15 },
  //         { state: "Abia", availability: 25 },
  //         { state: "Katsina", availability: 30 },
  //         { state: "Kogi", availability: 90 },
  //         { state: "Borno", availability: 55 },
  //         { state: "Nassarawa", availability: 65 },
  //         { state: "Kebbi", availability: 40 },
  //         { state: "Zamfara", availability: 35 },
  //         { state: "Delta", availability: 75 },
  //         { state: "Ebonyi", availability: 70 },
  //         { state: "Gombe", availability: 20 },
  //       ],
  //       totalVsAvailability: [
  //         { state: "Lagos", availability: 200, totalStation: 250 },
  //         { state: "Abuja", availability: 120, totalStation: 170 },
  //         { state: "Kaduna", availability: 10, totalStation: 30 },
  //         { state: "Kano", availability: 150, totalStation: 200 },
  //         { state: "Kebbi", availability: 45, totalStation: 95 },
  //         { state: "Kwara", availability: 15, totalStation: 65 },
  //         { state: "Abia", availability: 25, totalStation: 75 },
  //         { state: "Katsina", availability: 30, totalStation: 80 },
  //         { state: "Kogi", availability: 90, totalStation: 140 },
  //         { state: "Borno", availability: 55, totalStation: 105 },
  //         { state: "Nassarawa", availability: 65, totalStation: 115 },
  //         { state: "Kebbi", availability: 40, totalStation: 90 },
  //         { state: "Zamfara", availability: 35, totalStation: 85 },
  //         { state: "Delta", availability: 75, totalStation: 125 },
  //         { state: "Ebonyi", availability: 70, totalStation: 120 },
  //         { state: "Gombe", availability: 20, totalStation: 70 },
  //       ],
  //       stockLevel: [
  //         {
  //           state: "Lagos",
  //           stockLevel: {
  //             petrol: 2000,
  //             diesel: 1200,
  //             kerosene: 1450,
  //             cookingGas: 2300,
  //           },
  //         },
  //         {
  //           state: "Abuja",
  //           stockLevel: {
  //             petrol: 1000,
  //             diesel: 200,
  //             kerosene: 450,
  //             cookingGas: 300,
  //           },
  //         },
  //         {
  //           state: "Kano",
  //           stockLevel: {
  //             petrol: 2500,
  //             diesel: 1500,
  //             kerosene: 1550,
  //             cookingGas: 2500,
  //           },
  //         },
  //         {
  //           state: "Nassarawa",
  //           stockLevel: {
  //             petrol: 900,
  //             diesel: 600,
  //             kerosene: 850,
  //             cookingGas: 700,
  //           },
  //         },
  //         {
  //           state: "Abia",
  //           stockLevel: {
  //             petrol: 800,
  //             diesel: 500,
  //             kerosene: 550,
  //             cookingGas: 4300,
  //           },
  //         },
  //         {
  //           state: "Kogi",
  //           stockLevel: {
  //             petrol: 2000,
  //             diesel: 1200,
  //             kerosene: 1450,
  //             cookingGas: 2300,
  //           },
  //         },
  //         {
  //           state: "Kaduna",
  //           stockLevel: {
  //             petrol: 3000,
  //             diesel: 3200,
  //             kerosene: 3450,
  //             cookingGas: 3300,
  //           },
  //         },
  //         {
  //           state: "Kebbi",
  //           stockLevel: {
  //             petrol: 4000,
  //             diesel: 1200,
  //             kerosene: 450,
  //             cookingGas: 3300,
  //           },
  //         },
  //         {
  //           state: "Kwara",
  //           stockLevel: {
  //             petrol: 1550,
  //             diesel: 1800,
  //             kerosene: 1850,
  //             cookingGas: 2800,
  //           },
  //         },
  //         {
  //           state: "Borno",
  //           stockLevel: {
  //             petrol: 2400,
  //             diesel: 1700,
  //             kerosene: 2450,
  //             cookingGas: 4300,
  //           },
  //         },
  //         {
  //           state: "Delta",
  //           stockLevel: {
  //             petrol: 2000,
  //             diesel: 1200,
  //             kerosene: 1450,
  //             cookingGas: 2300,
  //           },
  //         },
  //       ],
  //     })
  //   );
  // }, []);

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
        <Route path={routes.admindash} index element={<AdminDashboard />} />
        <Route path={routes.vendordash} index element={<VendorDashboard />} />
        <Route path={routes.error} index element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
