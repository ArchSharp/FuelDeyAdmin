import { useAppDispatch, useAppSelector } from "../Store/store";
import StaffMngtTable from "../Components/StaffMngtTable";
import { PiUsersThreeFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getAllStaffs } from "../Features/User/userSlice";

export const StaffMngt = () => {
  const dispatch = useAppDispatch();
  const { staffs } = useAppSelector((state) => state.user);
  const [totalStaffs, setTotalStaffs] = useState(0);

  useEffect(() => {
    if (staffs) {
      setTotalStaffs(staffs?.pagination?.total);
    }
  }, [staffs]);

  useEffect(() => {
    dispatch(getAllStaffs(1));
  }, []);

  return (
    <div className="h-[90vh] overflow-y-auto overflow-x-hidden">
      <div className="flex items-center ml-8 mt-10 mb-7 text-blue-900">
        <PiUsersThreeFill className="mr-2 text-4xl" />
        <div className="text-black font-fueldeyserifreg text-2xl">
          {totalStaffs} Staffs
        </div>
      </div>
      {/* transactions table*/}
      <div className="rounded-2xl w-[96vw] lg:w-[76vw] min-h-[93vh] h-fit border-[1px] ml-[2vw] mt-5 mb-5 overflow-x-auto">
        <StaffMngtTable staffsData={staffs} />
      </div>
    </div>
  );
};
