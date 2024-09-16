// Modal.tsx
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IVendor } from "../../Features/User/type";
import { VendorStockLevel } from "../Charts/VendorStockLevel";

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  data: IVendor;
}

const VendorDetailsModal: React.FC<ModalProps> = ({
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

  const [vendor, setVendor] = useState<IVendor>();

  useEffect(() => {
    setVendor(data);
  }, [content, data]);
  // console.log("dataId: ", dataId);

  return (
    <>
      <div className={modalClasses}>
        <div className="flex">
          <div className="w-fit font-poppins text-base text-gray-800 font-semibold">
            Vendor details
          </div>
          <IoClose
            className="ml-auto text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex mt-2">
          <div className="text-base text-left font-semibold text-green-700">
            {vendor?.stationname}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col h-[480px] overflow-y-auto">
          <div className="h-fit">
            {VendorRow(
              "",
              "Manager Name",
              vendor?.stationname,
              "Manager Phone",
              vendor?.phonenumber
            )}
            {VendorRow(
              "mt-5",
              "Assistant Name",
              vendor?.stationname,
              "Assistant Phone",
              vendor?.phonenumber
            )}

            {VendorRow(
              "mt-5",
              "Owner Type",
              vendor?.stationname,
              "Fuel Types",
              "" // vendor?.fuelTypes?.join(", ")
            )}
            {VendorRow(
              "mt-5",
              "Station address",
              `${vendor?.address} ${vendor?.lga} ${vendor?.state}`,
              "Station email",
              vendor?.email
            )}
            <div className="text-center underline font-bold font-poppins mt-5">
              Stock Levels
            </div>

            <div className="h-[280px] w-[90vw] md:w-[712px] -ml-4 px-3 overflow-x-auto">
              <VendorStockLevel vendor={vendor} />
            </div>
          </div>
        </div>
      </div>
      <div className={overlayClasses}></div>
    </>
  );

  function VendorRow(
    css: string,
    leftTitle: string,
    leftValue: any,
    rightTitle: string,
    rightValue: any
  ) {
    return (
      <div className={`flex w-full ${css}`}>
        <div className="w-1/2">
          <div className="font-bold font-poppins text-sm">{leftTitle}</div>
          <div className="text-sm font-poppins">{leftValue}</div>
        </div>
        <div className="w-1/2">
          <div className="font-bold font-poppins text-sm">{rightTitle}</div>
          <div className="text-sm font-poppins">{rightValue}</div>
        </div>
      </div>
    );
  }
  // function CardComponents(text1: any, text2: any) {
  //   return (
  //     <div className="my-8 w-fit font-poppins text-left text-xs">
  //       <div className=" font-semibold text-gray-600">{text1}</div>
  //       {!text2 ? "-" : text2}
  //     </div>
  //   );
  // }
};

export default VendorDetailsModal;
