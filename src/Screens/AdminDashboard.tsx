// import { ChangePassword } from "./Auths/ChangePassword";
import { useState } from "react";
import { sidebars } from "../Data/sidebarsText";
import fueldeylogo from "../assets/Images/fuel-dey-logo-no-bg.png";
import { FaAngleDoubleLeft, FaBars, FaChevronRight } from "react-icons/fa";
import { IoNotificationsCircle, IoSettings } from "react-icons/io5";
import { PiUserSwitchFill, PiUsersThreeFill } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";

export const AdminDashboard = () => {
  const [mainNavIndex, setMainNavIndex] = useState<number | null>(null);
  const [subNavIndex, setSubNavIndex] = useState<number | null>(null);
  const [isNavIn, setIsNavIn] = useState(true);

  const handleClick = (index: number) => {
    setMainNavIndex(index);
  };

  const handleSubNavClick = (index: number) => {
    setSubNavIndex(index);
  };

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
      <div className="bg-orange-400 w-screen lg:w-[80vw] h-[10vh] lg:h-[100px] flex items-center">
        <FaBars
          className="lg:hidden font-extrabold text-3xl ml-5"
          onClick={() => setIsNavIn(!isNavIn)}
        />
      </div>
      {/* <ChangePassword /> */}
    </div>
  );
};
