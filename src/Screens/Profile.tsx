import { useState } from "react";

export const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSaveChanges = () => {
    // Your existing logic here
    // dispatch(updateUserSettingsAccount(payload));
  };

  return (
    <div className="">
      <div className="border-2 w-[95%] md:w-fit mx-auto mt-10 px-5 md:px-10">
        <h1 className="font-bold font-poppins text-lg mt-3 ml-5">Profile</h1>
        <div className="text-slate-600 text-sm mt-1 ml-5">
          Manage your profile details
        </div>

        <div className="mt-10">
          <form action="post" className="md:pl-5 py-8">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-600 font-PoppinsRegular mr-10">
                Full name
              </div>{" "}
              <input
                type="text"
                className="md:w-[510px] h-[48px] rounded-lg ml-7 py-3 px-2 border-[1px] border-gray-400 flex-1"
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                readOnly
              />
            </div>

            <div className="flex items-center my-5">
              <div className=" text-sm font-medium text-gray-600 font-PoppinsRegular mr-10">
                Email address
              </div>
              <input
                type="text"
                className="md:w-[510px] h-[48px] rounded-lg ml-1 py-3 px-2 border-[1px] border-gray-400 flex-1"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                readOnly
              />
            </div>

            <div className="flex items-center my-5">
              <div className=" text-sm font-medium text-gray-600 font-PoppinsRegular mr-8">
                Phone number
              </div>{" "}
              <input
                type="text"
                className="md:w-[510px] h-[48px] rounded-lg ml-1 py-3 px-2 border-[1px] border-gray-400 flex-1"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
              />
            </div>

            <div className="flex items-center my-5">
              <div className=" text-sm font-medium text-gray-600 font-PoppinsRegular mr-8">
                Address
              </div>
              <input
                type="text"
                className="md:w-[510px] h-[48px] rounded-lg py-3 px-2 border-[1px] border-gray-400 md:ml-12 flex-1"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </div>

            <div className="flex md:w-[80%] mx-auto items-center justify-between mt-16">
              <button
                className="py-[11px] px-5 md:px-[65px] font-PoppinsRegular text-xs font-semibold rounded-md bg-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="bg-black rounded-md py-[11px] text-white px-10 md:px-[57px] font-PoppinsRegular text-xs font-semibold ml-10"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveChanges();
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
