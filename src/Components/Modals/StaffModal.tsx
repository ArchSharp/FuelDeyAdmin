// Modal.tsx
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IStaff, IUpdateStaff } from "../../Features/User/type";
import { roles } from "../../Data/roles";
import { useAppDispatch } from "../../Store/store";
import { updateStaff } from "../../Features/User/userSlice";

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  data: IStaff;
}

const StaffModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  data,
}) => {
  const modalClasses = `w-[95vw] md:w-[720px] h-[610px] rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-[5] ${
    isOpen ? "block" : "hidden"
  }`;

  const overlayClasses = `fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
    isOpen ? "block" : "hidden"
  }`;

  const dispatch = useAppDispatch();
  const [staff, setStaff] = useState<IStaff | undefined>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneno, setPhoneno] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [adminid, setAdminid] = useState<string>("");

  useEffect(() => {
    setStaff(data);
  }, [content, data]);
  // console.log("dataId: ", dataId);

  useEffect(() => {
    setFirstName(data?.firstname ?? "");
    setLastName(staff?.lastname ?? "");
    setEmail(staff?.email ?? "");
    setPhoneno(staff?.phonenumber ?? "");
    setAddress(staff?.address ?? "");
    setRole(staff?.role ?? "");
    setAdminid(staff?.id ?? "");
  }, [staff]);

  const payload: IUpdateStaff = {
    phonenumber: phoneno,
    address: address,
    role: role,
    adminid: adminid,
  };

  const validateForm = () => {
    return firstName && lastName && email && phoneno && address && role;
  };

  return (
    <>
      <div className={modalClasses}>
        <div className="flex">
          <div className="w-fit font-poppins text-base text-gray-800 font-semibold">
            Staff details
          </div>
          <IoClose
            className="ml-auto text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex mt-2">
          <div className="text-base text-left font-semibold text-green-700">
            {/* {vendor?.vendorName} */}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col h-[480px] overflow-y-auto">
          <div className="h-fit">
            <form action="post" className="">
              <div className="flex items-center justify-center flex-col md:flex-row font-poppins">
                <div className="w-full md:w-[48%] mr-0 md:mr-[2%]">
                  <div className="font-bold mb-1">First Name</div>
                  <input
                    type="text"
                    defaultValue={firstName}
                    className="w-full px-2 py-2 rounded-md border-[1px] border-gray-500"
                    readOnly
                  />
                </div>
                <div className="w-full md:w-[48%] ml-0 md:ml-[2%] mt-5 md:mt-0">
                  <div className="font-bold mb-1">Last Name</div>
                  <input
                    type="text"
                    defaultValue={lastName}
                    className="w-full px-2 py-2 rounded-md border-[1px] border-gray-500"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex items-center justify-center flex-col md:flex-row font-poppins mt-5">
                <div className="w-full md:w-[48%] mr-0 md:mr-[2%]">
                  <div className="font-bold mb-1">Email</div>
                  <input
                    type="text"
                    defaultValue={email}
                    className="w-full px-2 py-2 rounded-md border-[1px] border-gray-500"
                    readOnly
                  />
                </div>
                <div className="w-full md:w-[48%] ml-0 md:ml-[2%] mt-5 md:mt-0">
                  <div className="font-bold mb-1">Phone Number</div>
                  <input
                    type="text"
                    value={phoneno}
                    className="w-full px-2 py-2 rounded-md border-[1px] border-gray-500"
                    onChange={(e) => setPhoneno(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="flex items-start justify-center flex-col md:flex-row font-poppins mt-5">
                <div className="w-full md:w-[48%] mr-0 md:mr-[2%]">
                  <div className="font-bold mb-1">Role</div>
                  <select
                    name="role"
                    id="role"
                    className="w-full px-2 py-2 rounded-md border-[1px] border-gray-500"
                    value={role}
                    onChange={(e) => setRole(e.currentTarget.value)}
                    required
                  >
                    <option value="">
                      {role == "" ? "Change Role" : role}
                    </option>
                    {roles.map((role, index) => {
                      return (
                        <option key={index} value={role.role}>
                          {role.role}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full md:w-[48%] ml-0 md:ml-[2%] mt-5 md:mt-0">
                  <div className="font-bold mb-1">Address</div>
                  <textarea
                    cols={4}
                    value={address}
                    className="w-full px-2 py-2 h-[180px] rounded-md border-[1px] border-gray-500"
                    onChange={(e) => setAddress(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between font-poppins mt-5 w-[80%] md:w-[50%] mx-auto">
                <button
                  className="rounded-md px-5 py-2 bg-slate-300"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md px-5 py-2 bg-slate-800 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                      dispatch(updateStaff(payload));
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setAddress("");
                      setPhoneno("");
                      onClose();
                    } else {
                      alert("Please fill all fields before submitting.");
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={overlayClasses}></div>
    </>
  );
};

export default StaffModal;
