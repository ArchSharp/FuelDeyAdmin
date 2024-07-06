import { useEffect } from "react";
import { useAppSelector } from "../Store/store";
// import { IVendorsSummary } from "../Features/User/type";
import { VendorsTable } from "../Components/VendorsTable";
import { BsFillFuelPumpFill } from "react-icons/bs";

export const Vendors = () => {
  const { transactionSummary, vendors } = useAppSelector((state) => state.user);
  // const [vendorsSummary, setTrxSummary] =
  //   useState<IVendorsSummary>(transactionSummary);

  useEffect(() => {
    // setTrxSummary(transactionSummary);
  }, [transactionSummary]);

  return (
    <div className="h-[90vh] overflow-y-auto">
      <div className="flex items-center ml-8 mt-10 mb-7 text-orange-600">
        <BsFillFuelPumpFill className="mr-4 text-2xl" />{" "}
        <div className="text-black font-fueldeyserifreg text-2xl">
          4000 Available Vendors
        </div>
      </div>
      {/* transactions table */}
      <div className="rounded-2xl min-w-[1155px] w-[80vw] min-h-[93vh] h-fit border-[1px] ml-8 mt-5 mb-5">
        <VendorsTable vendorsData={vendors} />
      </div>
    </div>
  );
};
