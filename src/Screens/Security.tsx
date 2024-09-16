import { useEffect, useState } from "react";
import { useAppSelector } from "../Store/store";
import { IProfile } from "../Features/User/type";

export const Security = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<IProfile>(currentUser);
  const [email, setEmail] = useState("");
  const [istwoF, setIstwoF] = useState(false);

  useEffect(() => {
    setUser(currentUser);
  }, []);

  useEffect(() => {
    setEmail(user.email);
  }, [currentUser]);

  return (
    <div className="mx-auto w-[60%] border-2 border-gray-300 mt-10 pl-7 rounded-lg">
      <div className="font-bold font-poppins text-lg mt-10">Security</div>
      <div className="text-sm font-poppins mt-2">
        Manage your account’s security settings
      </div>

      <div className="mx-auto mt-10 mb-5 mr-10 relative flex items-center">
        <div className="font-semibold mr-10">Email: </div>
        <input
          className="border-[2px] border-slate-300 w-full h-[60px] px-2 py-2 rounded-md"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          readOnly
        />
        <button className="absolute right-2 top-3 text-blue-400 font-bold text-lg text-nowrap">
          Change Password
        </button>
      </div>

      <div className="text-sm font-poppins mt-16">
        Enable two factor authentication
      </div>
      <div className="flex items-center justify-between mr-5 mb-10 mt-5">
        <div className="font-bold font-poppins text-lg w-fit">2FA</div>
        <div
          className="bg-blue-800 w-[50px] rounded-[15px] h-[30px] relative cursor-pointer"
          onClick={() => setIstwoF(!istwoF)}
        >
          <div
            className={`size-[20px] bg-white rounded-[50%] absolute ${
              istwoF ? "right-[3px]" : "left-[3px]"
            } top-[5px]`}
          ></div>
        </div>
      </div>
    </div>
  );
};
