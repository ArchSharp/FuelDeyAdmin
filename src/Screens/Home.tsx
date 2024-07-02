import fuelSplash from "../assets/Images/fuel-splash3.png";
import * as routes from "../Data/Routes";
import fueldeylogo from "../assets/Images/fuel-dey-logo.jpeg";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./Auths/SignIn";
import { SignUp } from "./Auths/SignUp";
import { ForgotPassword } from "./Auths/ForgotPassword";
import { useMediaQuery } from "react-responsive";
import { ResetPassword } from "./Auths/ResetPassword";

export const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  //

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
            style={{ "--scroll-width": isMobile ? "5px" : "2px" } as any}
            className="relative w-[95vw] lg:w-[35vw] h-fit max-h-[80vh] md:max-h-[55vh] lg:max-h-[60vh] overflow-y-auto lg:shadow-form-bx-sh"
          >
            <Routes>
              <Route path={"/"} index={true} element={<SignIn />} />
              <Route path={routes.signup} element={<SignUp />} />
              <Route path={routes.f_password} element={<ForgotPassword />} />
              <Route path={routes.resetPassword} element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
