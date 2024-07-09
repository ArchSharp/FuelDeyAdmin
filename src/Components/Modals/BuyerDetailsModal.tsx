// Modal.tsx
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../Store/store";
import { IBuyer } from "../../Features/User/type";

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  dataId: number;
}

const BuyerDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  dataId,
}) => {
  const modalClasses = `w-[95vw] md:w-[720px] h-[610px] rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-[5] ${
    isOpen ? "block" : "hidden"
  }`;

  const overlayClasses = `fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
    isOpen ? "block" : "hidden"
  }`;

  const { buyers } = useAppSelector((state) => state.user);

  const [buyer, setBuyer] = useState<IBuyer>();

  useEffect(() => {
    setBuyer(buyers?.data[dataId]);
  }, [content, dataId]);
  // console.log("dataId: ", dataId);

  return (
    <>
      <div className={modalClasses}>
        <div className="flex">
          <div className="w-fit font-poppins text-base text-gray-800 font-semibold">
            Buyer details
          </div>
          <IoClose
            className="ml-auto text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex mt-2">
          <div className="text-base text-left font-semibold text-green-700">
            {buyer?.fullName}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col h-[480px] overflow-y-auto">
          <div className="h-fit">
            {VendorRow(
              "",
              "Buyer Name",
              buyer?.fullName,
              "Buyer Phone",
              buyer?.phoneno
            )}

            {VendorRow("mt-5", "Buyer Email", buyer?.email, "", "")}

            <div className="text-center mt-5 font-bold font-poppins">
              Last Ten Visited Stations
            </div>

            {/* {buyer?.lastTenVisitedStation.map((last, index) =>
              VendorRow("mt-5", "", last?.stationName, "", "")
            )} */}
            <table className="mx-auto mt-5 font-poppins text-sm">
              <thead>
                <tr>
                  <th className="px-2">S/N</th>
                  <th>Station Name</th>
                  <th>Station Address</th>
                  <th>Frequency (Last 3 Days)</th>
                </tr>
              </thead>
              <tbody>
                {buyer?.lastTenVisitedStation.map((last, index) => (
                  <tr key={index} className="">
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center py-2">{last.stationName}</td>
                    <td className="text-center px-5 py-2">{last.address}</td>
                    <td className="text-center py-2">{last.countIn3Days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default BuyerDetailsModal;
