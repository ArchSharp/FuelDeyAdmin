// import { ChangePassword } from "./Auths/ChangePassword";
import { useState } from "react";
import { sidebars } from "../Data/sidebarsText";
import fueldeylogo from "../assets/Images/fuel-dey-logo-no-bg.png";
import { FaChevronRight } from "react-icons/fa";

export const AdminDashboard = () => {
  const [mainNavIndex, setMainNavIndex] = useState<number | null>(null);
  const [subNavIndex, setSubNavIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setMainNavIndex(index);
  };

  const handleSubNavClick = (index: number) => {
    setSubNavIndex(index);
  };

  return (
    <div className="flex">
      <div className="w-[20vw] h-screen bg-black bg-opacity-[0.8] flex flex-col">
        <img
          src={fueldeylogo}
          alt="fueldeylogo"
          className="w-[40%] md:w-[25%] lg:w-[35%] mt-10 mb-20 mx-auto"
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
      {/* <ChangePassword /> */}
    </div>
  );
};
