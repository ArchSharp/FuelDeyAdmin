import fuelSplash from "../assets/Images/fuel-splash3.png";
import * as routes from "../Data/Routes";
import fueldeylogo from "../assets/Images/fuel-dey-logo.jpeg";
import { Route, Routes, useLocation } from "react-router-dom";
import { SignIn } from "./Auths/SignIn";
import { SignUp } from "./Auths/SignUp";
import { ForgotPassword } from "./Auths/ForgotPassword";
import { FiChevronsDown } from "react-icons/fi";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [bottom, setBottom] = useState(0);
  const [right, setRight] = useState(0);

  const location = useLocation();
  const updatePosition = () => {
    const container = containerRef.current;
    const fixedElement = fixedRef.current;
    if (container && fixedElement) {
      const { bottom, right, height, width } =
        container.getBoundingClientRect();
      const offsetBottom = 50; // offset from the bottom
      const offsetRight = 50; // offset from the right

      setBottom(window.innerHeight - bottom + offsetBottom - height);
      setRight(window.innerWidth - right + offsetRight - width);
    }
  };

  useLayoutEffect(() => {
    updatePosition();
  }, [location.pathname]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        const isScrolledToBottom =
          container.scrollHeight - container.scrollTop ===
          container.clientHeight;
        setIsAtBottom(isScrolledToBottom);
        updatePosition();
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", updatePosition); // Update position on resize
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", updatePosition);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="h-screen flex">
        <div className="hidden lg:flex h-full w-1/2 home-left-div flex-col items-center justify-center">
          <img
            src={fuelSplash}
            alt="fuelSplash"
            className="w-[50px] animate-bounce"
          />
        </div>

        <div className="h-full w-[100vw] lg:w-[50vw] flex flex-col items-center justify-center">
          <img
            src={fueldeylogo}
            alt="fueldeylogo"
            className="w-[40%] md:w-[15%] lg:w-[20%] mb-5"
          />
          <div
            style={{ "--scroll-width": isMobile ? "5px" : "0px" } as any}
            className="relative w-[95vw] lg:w-[35vw] h-fit max-h-[80vh] md:max-h-[55vh] lg:max-h-[60vh] overflow-y-auto lg:shadow-form-bx-sh"
            ref={containerRef}
          >
            {isAtBottom === false && (
              <div
                ref={fixedRef}
                className={`z-[3] fixed bottom-[${bottom}] right-[${right}] animate-bounce w-fit h-fit`}
              >
                <FiChevronsDown className="text-white text-4xl bg-orange-400 rounded-[50%] p-2" />
              </div>
            )}
            <Routes>
              <Route path={"/"} index={true} element={<SignIn />} />
              <Route path={routes.signup} element={<SignUp />} />
              <Route path={routes.f_password} element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
