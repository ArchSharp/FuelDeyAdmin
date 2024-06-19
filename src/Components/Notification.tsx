import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { setShowAlert } from "../Features/User/userSlice";

export const Notification = () => {
  const { alertProps } = useAppSelector((state: any) => state.user);
  const [css, setCss] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const remove = setTimeout(() => {
      dispatch(setShowAlert(null));
    }, 3000);

    return () => clearTimeout(remove);
  }, [alertProps]);

  useEffect(() => {
    if (alertProps?.content) {
      setCss("animate-hr");
    } else {
      setCss("");
    }
  }, [alertProps]);

  return (
    <>
      {alertProps?.content ? (
        <div
          className={`fixed top-10 right-2 z-[4] w-[85vw] md:w-[500px] shadow-lg bg-slate-400 min-h-[80px] rounded-md border-2`}
        >
          <hr
            className={`border-[4px] ${
              alertProps?.isError ? "border-red-400" : "border-green-400"
            } w-0 ${css}`}
          />
          <div className="pt-2 px-4 text-white">{alertProps?.content}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
