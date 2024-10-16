import { useFormik } from "formik";
import * as Yup from "yup";
import * as routes from "../../Data/Routes";
import { MdAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { forgotPasswordFunc, setEmail } from "../../Features/User/userSlice";
import { IForgotPassword } from "../../Features/User/type";
import { useEffect } from "react";
import { clearErrors } from "../../Features/Error/errorSlice";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: any) => state.user);
  const { errors } = useAppSelector((state: any) => state.error);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
  };

  // Submit handler
  const handleSubmit = (values: IForgotPassword) => {
    dispatch(setEmail(values.email));
    dispatch(forgotPasswordFunc(values.email));
  };

  // Formik form handling
  const formik = useFormik<IForgotPassword>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    // console.log(errors[0]);
    if (errors[0]?.message === "Navigate to reset password") {
      navigate(routes.resetPassword);
      dispatch(clearErrors());
    }
  }, [errors]);

  return (
    <form onSubmit={formik.handleSubmit} className="py-10">
      <div className="w-[90%] md:w-fit mx-auto my-6">
        <div className="w-[160px] h-[18px] flex-shrink-0 text-orange-600 text-xl not-italic font-[500] leading-normal">
          Email address
        </div>
        <div className="w-4/5 h-[20px] flex-shrink-0 text-slate-600 text-sm not-italic font-[400] leading-normal mb-2 mt-1">
          Enter your email address
        </div>
        <div className="relative">
          <MdAttachEmail className="absolute top-[14px] left-5 text-xl text-slate-700" />
          <input
            className="w-full md:w-[358px] h-[50px] md:h-[36px] flex-shrink-0 rounded-[80px] border-2 border-inputBorder py-5 pl-[50px]"
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            // placeholder="Enter email"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-700">{formik.errors.email}</div>
        )}
      </div>

      <div className="text-slate-500 font-fueldeyserifreg xs:my-[10px] md:my-1 mx-auto w-[90%] md:w-[358px] text-biyaGray text-sm not-italic font-[400] leading-normal">
        Remembered your password?
        <span
          onClick={() => navigate(routes.signin)}
          className="text-orange-900 font-fueldeyserifreg text-sm not-italic font-[400] leading-normal ml-1 cursor-pointer no-underline"
        >
          Login
        </span>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-[129px] h-[45px] md:h-[35px] flex-shrink-0 border-0 rounded-[94px] text-sm cursor-pointer bg-orange-400 text-white xs:ml-0 md:ml-2 mt-4 xs:mb-[70px] md:mb-0 text-center not-italic font-[400] leading-normal"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
