import { useEffect, useRef, useState } from "react";
import { sidebars } from "../Data/sidebarsText";
import fueldeylogo from "../assets/Images/fuel-dey-logo-no-bg.png";
import userImg from "../assets/Images/Frame 64.png";
import { FaAngleDoubleLeft, FaChevronRight } from "react-icons/fa";
import {
  IoChevronDownSharp,
  IoNotificationsCircle,
  IoSettings,
} from "react-icons/io5";
import { PiUserSwitchFill, PiUsersThreeFill } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { DashboardAdmin } from "../Components/DashboardAdmin";
import { Vendors } from "./Vendors";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as routes from "../Data/Routes";
import { Buyers } from "./Buyers";
import { StaffMngt } from "./StaffMngt";
import { useAppDispatch, useAppSelector } from "../Store/store";
import {
  getFuelSummaryData,
  getVendorSummary,
  setLogout,
} from "../Features/User/userSlice";
import { Settings } from "./Settings";
import { Notifications } from "./Notifications";

export const AdminDashboard = () => {
  const { isAuth, vendorSummary, fuelSummary } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [mainNavIndex, setMainNavIndex] = useState<number | null>(0);
  const [subNavIndex, setSubNavIndex] = useState<number>(0);
  const [isNavIn, setIsNavIn] = useState(true);
  const [showUserNav, setShowUserNav] = useState(false);
  const userImgRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const pathName = useLocation().pathname;

  useEffect(() => {
    // console.log("isAuth: ", isAuth);
    if (isAuth === false) {
      navigate("/");
    }
  }, [isAuth]);

  const handleClick = (index: number) => {
    setMainNavIndex(index);
  };

  const handleSubNavClick = (index: number) => {
    setSubNavIndex(index);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current && userImgRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (
        coordinates.x < rect.left ||
        coordinates.y > rect.bottom ||
        coordinates.x > rect.right
      ) {
        setShowUserNav(false);
      }
    }
  }, [coordinates]);

  useEffect(() => {
    if (pathName === "/admin") {
      navigate(routes.adminDash);
      setMainNavIndex(0);
    } else if (pathName === "/admin/" + routes.vendors) {
      setMainNavIndex(1);
      navigate(routes.vendors);
    } else if (pathName === "/admin/" + routes.buyers) {
      setMainNavIndex(2);
      navigate(routes.buyers);
    } else if (pathName === "/admin/" + routes.notifications) {
      setMainNavIndex(3);
      navigate(routes.notifications);
    } else if (pathName === "/admin/" + routes.staffMngt) {
      setMainNavIndex(4);
      navigate(routes.staffMngt);
    } else if (pathName === "/admin/" + routes.settings) {
      setMainNavIndex(5);
      setSubNavIndex(0);

      navigate(routes.settings);
    }
  }, [pathName]);

  // console.log("isNavIn: ", isNavIn);

  useEffect(() => {
    if (!vendorSummary) {
      dispatch(getVendorSummary());
    }

    if (!fuelSummary) {
      dispatch(getFuelSummaryData());
    }
  }, [dispatch, vendorSummary, fuelSummary]);

  useEffect(() => {
    const fetchEvery2Minutes = setInterval(() => {
      // console.log("Fetching....");
      dispatch(getVendorSummary());
      dispatch(getFuelSummaryData());
    }, 120000);

    return () => clearInterval(fetchEvery2Minutes);
  }, []);

  return (
    <div className="flex relative">
      <div
        className={`${
          isNavIn ? "nav-in" : "nav-out"
        } z-[5] lg:ml-0 w-[90vw] lg:w-[20vw] h-screen bg-black bg-opacity-[0.8] flex flex-col absolute top-0 left-0 lg:static`}
      >
        <img
          src={fueldeylogo}
          alt="fueldeylogo"
          className="w-[40%] md:w-[25%] lg:w-[35%] mt-10 mb-20 mx-auto"
        />

        <FaAngleDoubleLeft
          className="lg:hidden font-semibold text-2xl ml-5 absolute top-10 right-4 text-white"
          onClick={() => setIsNavIn(!isNavIn)}
        />
        {sidebars.map((sidebar, index) => (
          <div key={index}>
            <div
              className={`text-white p-4 cursor-pointer flex items-center text-base ${
                mainNavIndex === index ? "bg-fuelYellow" : "bg-transparent"
              }`}
              onClick={() => {
                handleSubNavClick(0);
                handleClick(index);
                let route = routes.adminDash;
                if (index === 0) route = routes.adminDash;
                else if (index === 1) route = routes.vendors;
                else if (index === 2) route = routes.buyers;
                else if (index === 3) route = routes.notifications;
                else if (index === 4) route = routes.staffMngt;
                else if (index === 5) route = routes.settings;

                navigate(route);
              }}
            >
              {index === 0 && <MdSpaceDashboard className="mr-2 text-2xl" />}
              {index === 1 && <BsFillFuelPumpFill className="mr-2 text-2xl" />}
              {index === 2 && <PiUserSwitchFill className="mr-2 text-2xl" />}
              {index === 3 && (
                <IoNotificationsCircle className="mr-2 text-2xl" />
              )}
              {index === 4 && <PiUsersThreeFill className="mr-2 text-2xl" />}
              {index === 5 && <IoSettings className="mr-2 text-2xl" />}
              <div
                className="text-sm"
                onClick={() => {
                  if (sidebar.subTexts.length === 0) setIsNavIn(true);
                }}
              >
                {sidebar.sideText}
              </div>
              {sidebar.subTexts.length > 0 && (
                <FaChevronRight
                  className={`ml-auto ${
                    mainNavIndex === index ? "open-nav" : "close-nav"
                  }`}
                />
              )}
            </div>

            {sidebar.subTexts.length > 0 && mainNavIndex === index && (
              <div>
                <ul className="">
                  {sidebar.subTexts.map((subnav, subindex) => (
                    <li
                      key={subindex}
                      onClick={() => {
                        handleSubNavClick(subindex);
                        setIsNavIn(true);
                      }}
                      className={`text-white pl-10 pt-3 pb-3 cursor-pointer flex items-center text-base ${
                        subNavIndex === subindex
                          ? "bg-orange-400"
                          : "bg-transparent"
                      }`}
                    >
                      {subnav}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-screen lg:w-[80vw]">
        <div className="bg-orange-400 bg-opacity-[0.5] h-[10vh] flex items-center">
          <AiOutlineBars
            className="lg:hidden text-3xl ml-5"
            onClick={() => setIsNavIn(!isNavIn)}
          />

          <div
            ref={userImgRef}
            className="ml-auto flex items-center mr-3 lg:mr-5 relative cursor-pointer"
            onMouseEnter={() => setShowUserNav(true)}
            // onMouseLeave={() => setShowUserNav(false)}
          >
            <img
              src={userImg}
              alt="fueldey"
              className="size-8 md:size-10 lg:size-12 rounded-[50%]"
            />
            <IoChevronDownSharp
              className={`${
                showUserNav ? "open-user-arrow" : "close-user-arrow"
              } text-xl md:text-2xl ml-1 md:ml-3`}
            />

            <div
              ref={dropdownRef}
              className={`${
                showUserNav
                  ? `${
                      isLarge
                        ? "user-nav-show"
                        : isTablet
                        ? "user-nav-show-tablet"
                        : isMobile
                        ? "user-nav-show-mobile"
                        : ""
                    }`
                  : "user-nav-hide"
              } bg-slate-300 shadow-xl w-[300px] h-fit border-2 z-[7]`}
            >
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.settings);
                }}
              >
                Profile
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.adminDash);
                }}
              >
                Dashboard
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.vendors);
                }}
              >
                Vendor
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.buyers);
                }}
              >
                Buyers
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.notifications);
                }}
              >
                Notification
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.staffMngt);
                }}
              >
                Manage Staff
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  navigate("/admin/" + routes.settings);
                }}
              >
                Settings
              </div>
              <div
                className="font-poppins text-sm pl-5 py-3 hover:bg-white"
                onClick={() => {
                  setShowUserNav(false);
                  dispatch(setLogout());
                }}
              >
                Log out
              </div>
            </div>
          </div>
        </div>

        <div className="h-[90vh] overflow-y-auto">
          <Routes>
            <Route path={routes.adminDash} element={<DashboardAdmin />} />
            <Route path={routes.vendors} element={<Vendors />} />
            <Route path={routes.buyers} element={<Buyers />} />
            <Route path={routes.notifications} element={<Notifications />} />
            <Route path={routes.staffMngt} element={<StaffMngt />} />
            <Route
              path={routes.settings}
              element={<Settings subIndex={subNavIndex} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
