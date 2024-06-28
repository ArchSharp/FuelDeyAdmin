import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/store";
import fuelSplash from "../assets/Images/fuel-splash3.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ISignin } from "../Features/User/type";
import { useState } from "react";
import * as routes from "../Data/Routes";
import { MdAttachEmail } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { SignUp } from "../Features/User/userSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: any) => state.user);
  const [showPass, setShowPass] = useState(false);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    Email: Yup.string().required("Email is required"),
    Password: Yup.string()
      .min(6, "Must not be less than 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  });

  // Initial form values
  const initialValues = {
    Email: "",
    Password: "",
  };

  // Submit handler
  const handleSubmit = (values: ISignin) => {
    dispatch(SignUp(values));
  };

  // Formik form handling
  const formik = useFormik<ISignin>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="">
      <div className="h-screen flex">
        <div className="h-full w-1/2 home-left-div flex flex-col items-center justify-center">
          <img
            src={fuelSplash}
            alt="fuelSplash"
            className="w-[50px] animate-bounce"
          />
        </div>

        <div className="h-full w-[50vw] flex flex-col items-center justify-center">
          <div className="font-fueldeyserifreg text-4xl">Fuel Dey Here</div>
          <div className="w-[70%] h-fit py-10 shadow-form-bx-sh">
            <form onSubmit={formik.handleSubmit}>
              <div className="xs:w-[90%] md:w-fit mx-auto my-6">
                <div className="w-[160px] h-[18px] flex-shrink-0 text-orange-600 text-xl not-italic font-[500] leading-normal">
                  Email address
                </div>
                <div className="w-4/5 h-[20px] flex-shrink-0 text-slate-600 text-sm not-italic font-[400] leading-normal mb-2 mt-1">
                  Enter your email address
                </div>
                <div className="relative">
                  <MdAttachEmail className="absolute top-3 left-5 text-xl text-slate-700" />
                  <input
                    className="xs:w-[86.4vw] md:w-[358px] xs:h-[40px] md:h-[36px] flex-shrink-0 rounded-[80px] border-2 border-inputBorder py-5 pl-[50px]"
                    type="text"
                    id="Email"
                    name="Email"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.Email}
                    // placeholder="Enter Email"
                  />
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  <div className="text-red-700">{formik.errors.Email}</div>
                )}
              </div>

              <div className="w-fit mx-auto my-6">
                <div className="w-[120px] h-[18px] flex-shrink-0 text-orange-600 text-lg not-italic font-[500] leading-normal">
                  Password
                </div>
                <div className="w-4/5 h-[20px] flex-shrink-0 text-slate-500 text-sm not-italic font-[400] leading-normal mb-2 mt-1">
                  Enter your account password
                </div>
                <div className="relative">
                  {showPass === false ? (
                    <FaLock
                      className="absolute top-3 left-5 text-xl text-slate-700 cursor-pointer"
                      onClick={() => setShowPass(true)}
                    />
                  ) : (
                    <FaLockOpen
                      className="absolute top-3 left-5 text-xl text-slate-700 cursor-pointer"
                      onClick={() => setShowPass(false)}
                    />
                  )}
                  <input
                    className="xs:w-[86.4vw] md:w-[358px] xs:h-[40px] md:h-[36px] flex-shrink-0 rounded-[80px] border-2 border-inputBorder py-5 pl-[50px]"
                    type={showPass ? "text" : "password"}
                    id="Password"
                    name="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Password}
                    // placeholder="Enter password"
                  />
                </div>
                {formik.touched.Password && formik.errors.Password && (
                  <div className="text-red-700">{formik.errors.Password}</div>
                )}
              </div>

              <div className="text-slate-500 font-fueldeyserifreg xs:my-[10px] md:my-1 mx-auto xs:w-[90%] md:w-[358px] text-biyaGray text-sm not-italic font-[400] leading-normal">
                Forgot password?
                <a
                  href="#a"
                  onClick={() => navigate(routes.f_password)}
                  className="text-blue-900 font-fueldeyserifreg text-sm not-italic font-[400] leading-normal ml-1 cursor-pointer no-underline"
                >
                  Reset here
                </a>
              </div>
              <div className="text-slate-500 font-fueldeyserifreg xs:my-[10px] md:my-1 mx-auto xs:w-[90%] md:w-[358px] text-biyaGray text-sm not-italic font-[400] leading-normal">
                Don't have an account?
                <a
                  href="#b"
                  onClick={() => navigate(routes.signup)}
                  className="text-blue-900 font-fueldeyserifreg text-sm not-italic font-[400] leading-normal ml-1 cursor-pointer no-underline"
                >
                  Register now
                </a>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="xs:w-[86.4vw] md:w-[129px] xs:h-[40px] md:h-[35px] flex-shrink-0 border-0 rounded-[94px] text-sm cursor-pointer bg-blue-400 text-white xs:ml-0 md:ml-2 mt-4 xs:mb-[70px] md:mb-0 text-center not-italic font-[400] leading-normal"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};