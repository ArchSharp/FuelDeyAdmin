import { useAppSelector } from "../Store/store";
import StaffMngtTable from "../Components/StaffMngtTable";
import { PiUsersThreeFill } from "react-icons/pi";

export const StaffMngt = () => {
  const { staffs } = useAppSelector((state) => state.user);

  return (
    <div className="h-[90vh] overflow-y-auto overflow-x-hidden">
      <div className="flex items-center ml-8 mt-10 mb-7 text-blue-900">
        <PiUsersThreeFill className="mr-2 text-4xl" />
        <div className="text-black font-fueldeyserifreg text-2xl">
          50 Staffs
        </div>
      </div>
      {/* transactions table*/}
      <div className="rounded-2xl w-[96vw] lg:w-[76vw] min-h-[93vh] h-fit border-[1px] ml-[2vw] mt-5 mb-5 overflow-x-auto">
        <StaffMngtTable staffsData={staffs} />
      </div>
    </div>
  );
};
