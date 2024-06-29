import { useFormik } from "formik";
import * as Yup from "yup";
import * as routes from "../../Data/Routes";
import { MdAttachEmail } from "react-icons/md";
import { signUp } from "../../Features/User/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { ISignin } from "../../Features/User/type";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: any) => state.user);

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
    dispatch(signUp(values));
  };

  // Formik form handling
  const formik = useFormik<ISignin>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
