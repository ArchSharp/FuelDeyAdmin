// import { ChangePassword } from "./Auths/ChangePassword";
import { useEffect, useRef, useState } from "react";
import { sidebars } from "../Data/sidebarsText";
import fueldeylogo from "../assets/Images/fuel-dey-logo-no-bg.png";
import userImg from "../assets/Images/fuel-dey-logo - full.jpeg";
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

export const AdminDashboard = () => {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [mainNavIndex, setMainNavIndex] = useState<number | null>(null);
  const [subNavIndex, setSubNavIndex] = useState<number | null>(null);
  const [isNavIn, setIsNavIn] = useState(true);
  const [showUserNav, setShowUserNav] = useState(false);
  const userImgRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

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

  return (
    <div className="flex relative">
      <div
        className={`${
          isNavIn ? "nav-in" : "nav-out"
        } lg:ml-0 w-[90vw] lg:w-[20vw] h-screen bg-black bg-opacity-[0.8] flex flex-col absolute top-0 left-0 lg:static`}
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
                mainNavIndex === index ? "bg-orange-500" : "bg-transparent"
              }`}
              onClick={() => {
                handleSubNavClick(-1);
                handleClick(index);
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
              {sidebar.sideText}{" "}
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
                      }}
                      className={`text-white pl-10 pt-3 pb-3 cursor-pointer flex items-center text-base ${
                        subNavIndex === subindex
                          ? "bg-orange-300"
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
        <div className="bg-orange-400 bg-opacity-[0.5] h-[10vh] md:h-[12vh] lg:h-[100px] flex items-center">
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
              } shadow-xl w-[300px] h-[400px] border-2`}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center py-5">
            <div className="border-[1px] border-slate-400 rounded-[35px] w-[90vw] md:w-[40vw] lg:w-[20vw] h-[45vh] md:h-[40vh] lg:h-[35vh]">
              <div className="border-b-[1px] border-slate-400 rounded-tr-[35px] rounded-tl-[35px] h-1/2 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <BsFillFuelPumpFill className="mr-3 text-2xl text-orange-600" />
                    <div className="font-pacifico text-2xl">Vendors</div>
                  </div>
                  <div className="font-pacifico text-2xl">100</div>
                </div>
              </div>
              <div className="flex items-center justify-center h-1/2 rounded-bl-[35px] rounded-br-[35px]">
                <div className=" w-1/2 flex flex-col items-center justify-center h-full rounded-bl-[35px]">
                  <div className="text-green-600 font-poppins font-bold">
                    Active
                  </div>
                  <div className="font-pacifico text-2xl">100</div>
                </div>
                <div className="w-1/2 rounded-br-[35px] flex flex-col items-center justify-center">
                  <div className="text-red-600 font-poppins font-bold">
                    Inactive
                  </div>
                  <div className="font-pacifico text-2xl">20</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ChangePassword /> */}
    </div>
  );
};
