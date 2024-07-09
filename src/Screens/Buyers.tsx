import { useAppSelector } from "../Store/store";
// import { IVendorsSummary } from "../Features/User/type";
import BuyersTable from "../Components/BuyersTable";
import { PiUserSwitchFill } from "react-icons/pi";

export const Buyers = () => {
  const { buyers } = useAppSelector((state) => state.user);
  // const [vendorsSummary, setTrxSummary] =
  //   useState<IVendorsSummary>(transactionSummary);

  return (
    <div className="h-[90vh] overflow-y-auto overflow-x-hidden">
      <div className="flex items-center ml-8 mt-10 mb-7 text-orange-600">
        <PiUserSwitchFill className="mr-2 text-2xl" />
        <div className="text-black font-fueldeyserifreg text-2xl">
          20000 Buyers
        </div>
      </div>
      {/* transactions table */}
      <div className="rounded-2xl w-[96vw] lg:w-[76vw] min-h-[93vh] h-fit border-[1px] ml-[2vw] mt-5 mb-5 overflow-x-auto">
        <BuyersTable buyersData={buyers} />
      </div>
    </div>
  );
};
