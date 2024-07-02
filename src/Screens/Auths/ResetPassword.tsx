import { useFormik } from "formik";
import * as Yup from "yup";
import * as routes from "../../Data/Routes";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { signUp } from "../../Features/User/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { useState } from "react";
import { IResetPassword } from "../../Features/User/type";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: any) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Must not be less than 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(/^(?=.*[!@#%&])/, "Required at least one character: ! @ # % &"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Initial form values
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  // Submit handler
  const handleSubmit = (values: IResetPassword) => {
    dispatch(signUp(values));
  };

  // Formik form handling
  const formik = useFormik<IResetPassword>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="py-10">
      <div className="w-[90%] md:w-fit mx-auto">
        <div className="w-[160px] h-[18px] flex-shrink-0 text-orange-600 text-xl not-italic font-[500] leading-normal">
          New Password
        </div>
        <div className="w-4/5 h-[20px] flex-shrink-0 text-slate-600 text-sm not-italic font-[400] leading-normal mb-2 mt-1">
          Enter your New Password
        </div>
        <div className="relative">
          <div
            className="absolute top-[14px] left-5 w-fit"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass === false ? (
              <FaLock className="text-xl text-slate-700 cursor-pointer" />
            ) : (
              <FaLockOpen className="text-xl text-slate-700 cursor-pointer" />
            )}
          </div>
          <input
            className="w-full md:w-[358px] h-[50px] md:h-[36px] flex-shrink-0 rounded-[80px] border-2 border-inputBorder py-5 pl-[50px]"
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            // placeholder="Enter password"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-700">{formik.errors.password}</div>
        )}
      </div>

      <div className="w-[90%] md:w-fit mx-auto my-6">
        <div className=" h-[18px] flex-shrink-0 text-orange-600 text-lg not-italic font-[500] leading-normal">
          Confirm New Password
        </div>
        <div className="w-4/5 h-[20px] flex-shrink-0 text-slate-500 text-sm not-italic font-[400] leading-normal mb-2 mt-1">
          Confirm your New Password
        </div>
        <div className="relative">
          <div
            className="absolute top-[14px] left-5 w-fit"
            onClick={() => setShowConfPass(!showConfPass)}
          >
            {showConfPass === false ? (
              <FaLock className="text-xl text-slate-700 cursor-pointer" />
            ) : (
              <FaLockOpen className="text-xl text-slate-700 cursor-pointer" />
            )}
          </div>
          <input
            className="w-full md:w-[358px] h-[50px] md:h-[36px] flex-shrink-0 rounded-[80px] border-2 border-inputBorder py-5 pl-[50px]"
            type={showConfPass ? "text" : "password"}
            id="confirm_password"
            name="confirm_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            // placeholder="Enter password"
          />
        </div>
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <div className="text-red-700">{formik.errors.confirm_password}</div>
        )}
      </div>

      <div className="text-slate-500 font-fueldeyserifreg xs:my-[10px] md:my-1 mx-auto w-[90%] md:w-[358px] text-biyaGray text-sm not-italic font-[400] leading-normal">
        Remembered password?
        <span
          onClick={() => navigate(routes.homepage)}
          className="text-orange-900 font-fueldeyserifreg text-sm not-italic font-[400] leading-normal ml-1 cursor-pointer no-underline"
        >
          Login
        </span>
      </div>
      <div className="text-slate-500 font-fueldeyserifreg xs:my-[10px] md:my-1 mx-auto w-[90%] md:w-[358px] text-biyaGray text-sm not-italic font-[400] leading-normal">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-[129px] h-[45px] md:h-[35px] flex-shrink-0 border-0 rounded-[94px] text-sm cursor-pointer bg-orange-400 text-white xs:ml-0 md:ml-2 mt-4 xs:mb-[70px] md:mb-0 text-center not-italic font-[400] leading-normal"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};
