// Modal.tsx
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../Store/store";
import { IVendors } from "../../Features/User/type";
// import { SVGs } from "../../assets/SVGs";

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  dataId: number;
}

const VendorDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  dataId,
}) => {
  const modalClasses = `w-[95vw] md:w-[720px] h-[600px] text-center rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-[5] ${
    isOpen ? "block" : "hidden"
  }`;

  const overlayClasses = `fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
    isOpen ? "block" : "hidden"
  }`;

  const { transactions, agentTransactions } = useAppSelector(
    (state) => state.user
  );

  const [trx, setTrx] = useState<IVendors>();
  console.log(dataId, ", ", trx);

  useEffect(() => {
    if (content === "agent") {
      setTrx(agentTransactions);
    } else {
      setTrx(transactions);
    }
  }, [content, agentTransactions, transactions]);

  return (
    <>
      <div className={modalClasses}>
        <div className="flex">
          <div className="w-fit font-poppins text-base text-gray-800 font-semibold">
            Vendors details
          </div>
          <IoClose
            className="ml-auto text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex mt-8">
          {/* <div className="text-base text-left font-semibold">
            {`₦${trx?.data[dataId]?.transactionAmount}`} <br />
            {trx?.data[dataId]?.agentName}
          </div> */}
          {/* <div className="w-fit flex ml-auto">
            <button
              className={`w-[151px] h-[38px] text-xs ml-auto mr-3 ${
                trx?.data[dataId]?.responseDescription === "Approved"
                  ? "bg-lightSuccess text-success"
                  : "bg-orange-400 text-white"
              } rounded-[64px] flex items-center justify-center`}
            >
              {trx?.data[dataId]?.responseDescription}
            </button>
            <button className="w-[151px] h-[38px] text-xs ml-auto mr-4 bg-main text-white rounded-[64px] flex items-center justify-center">
              <SVGs index={20} className={"mr-1"} />
              Generate Receipt
            </button>
          </div> */}
        </div>
        <hr className="my-4" />
        {/* <div className="flex">
          <div className="w-1/2">
            {CardComponents("Agent ID", trx?.data[dataId]?.agentID)}
            {CardComponents("Terminal ID", trx?.data[dataId]?.terminalId)}
            {CardComponents("Date", trx?.data[dataId]?.transactionDate)}
            {CardComponents("RRN", trx?.data[dataId]?.rrn)}
            {CardComponents("STAN", trx?.data[dataId]?.stan)}
            {CardComponents(
              "Amount",
              `₦${trx?.data[dataId]?.transactionAmount}`
            )}
          </div>
          <div className="w-1/2 pl-14">
            {CardComponents("Time", trx?.data[dataId]?.transactionTime)}
            {CardComponents("Auth Code", trx?.data[dataId]?.authCode)}
            {CardComponents("PAN ", trx?.data[dataId]?.maskpan)}
            {CardComponents("Card Scheme", trx?.data[dataId]?.cardScheme)}
            {CardComponents(
              "Settlement Status",
              trx?.data[dataId]?.settlementStatus
            )}
            {CardComponents("Merchant Name", trx?.data[dataId]?.agentName)}
          </div>
        </div> */}
      </div>
      <div className={overlayClasses}></div>
    </>
  );

  // function CardComponents(text1: any, text2: any) {
  //   return (
  //     <div className="my-8 w-fit font-poppins text-left text-xs">
  //       <div className=" font-semibold text-gray-600">{text1}</div>
  //       {!text2 ? "-" : text2}
  //     </div>
  //   );
  // }

  // function Trxcard(l1: string, l2: string, r1: string, r2: string) {
  //   return (
  //     <div className="flex my-9">
  //       <div className="w-fit font-poppins text-left text-xs">
  //         <div className=" font-semibold text-gray-600">{l1}</div>
  //         {l2}
  //       </div>
  //       <div className="font-poppins text-left text-xs ml-auto mr-52 border-2">
  //         <div className=" font-semibold text-gray-600">{r1}</div>
  //         {r2}
  //       </div>
  //     </div>
  //   );
  // }
};

export default VendorDetailsModal;
