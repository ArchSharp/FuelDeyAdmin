import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaArrowDown, FaEye } from "react-icons/fa6";
// import { HiFilter } from "react-icons/hi";
import { RiCpuFill } from "react-icons/ri";
import { IoCalendar } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { IAlertProps, IVendor, IVendors } from "../Features/User/type";
import { setShowAlert } from "../Features/User/userSlice";
import { SVGs } from "../assets/SVGs";
import VendorDetailsModal from "./Modals/VendorDetailsModal";

// import { clearErrors } from "../../Features/Error/errorSlice";

// import { TableData } from "../Interface/ITableData";
// import { initialData } from "../Data/TableData";

type IVendorsProps = {
  vendorsData: IVendors;
};

export const VendorsTable = ({ vendorsData }: IVendorsProps) => {
  // const navigate = useNavigate();
  const { vendors } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<IVendors>(vendorsData);
  const [sortBy, setSortBy] = useState<keyof any>("internalid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openTrx, setOpenTrx] = useState(false);
  const [processors, setProcessors] = useState("All Processors");
  // const [showFilter, setShowFilter] = useState(false);
  const [showProcessor, setShowProcessor] = useState(false);
  // const [openToDate, setOpenToDate] = useState<boolean>(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [search, setSearch] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setData(vendorsData);
  }, [vendorsData]);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleSort = (column: keyof IVendor) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = data?.data.slice().sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy as keyof IVendor];
      const bValue = b[sortBy as keyof IVendor];
      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  useEffect(() => {
    const sortedData = vendors?.data
      ?.slice()
      .filter((dt: any) => dt?.processorName === processors);

    if (processors !== "All Processors") {
      setData({ data: sortedData, pagination: data.pagination });
    } else {
      setData(vendors);
    }
    // setShowFilter(false);
    // setShowProcessor((prevValue) => !prevValue);
  }, [processors, vendors, data?.pagination]);

  // const handleProcessorChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setProcessors(event.target.value);
  // };

  const handleFromDate = (option: string) => {
    console.log("fromdate: ", option);
    setFromDate(option);
  };

  const handleToDate = (option: string) => {
    console.log("todate: ", option);
    setToDate(option);
  };

  // const handleSearch = (option: string) => {
  //   setSearch(option);
  // };

  const closeModal = () => {
    setOpenTrx(false);
  };

  var pages = Math.ceil(data?.pagination?.totalCount / data?.pagination?.limit);

  useEffect(() => {
    var today = new Date();
    var d1 = new Date(fromDate);
    var d2 = new Date(toDate);
    if (d1 > d2) {
      var msg: IAlertProps = {
        isError: true,
        showAlert: true,
        content: "Start date cannot be greater that end date",
      };
      setToDate("");
      dispatch(setShowAlert(msg));
    } else if (d1 < d2 && d2 <= today) {
      // dispatch(getAllTranasctionByDateRange(1, fromDate, toDate));
      setFromDate("");
      setToDate("");
    } else if (d2 > today) {
      var msg1: IAlertProps = {
        isError: true,
        showAlert: true,
        content: `End date cannot be greater than today's date ${today.toDateString()}`,
      };
      setToDate("");
      dispatch(setShowAlert(msg1));
    }
  }, [dispatch, fromDate, toDate]);

  const handlePageClick = (event: any) => {
    if (event.selected !== undefined) {
      const num: number = event.selected + 1;
      // if (num !== data?.pagination?.page) dispatch(getAllTransactions(num));

      console.log(
        `User requested page number ${num} page: ${data?.pagination?.page}`
      );
      // setItemOffset(newOffset);
    }
  };

  useEffect(() => {
    // dispatch(getAllTransactions(1));
  }, [dispatch]);

  // console.log("sorted data: ", showProcessor);

  return (
    <div className="w-[1125px] xl:w-full min-h-[93vh] h-fit mb-10 transaction">
      <VendorDetailsModal
        isOpen={openTrx}
        onClose={closeModal}
        content="testing"
        dataId={currentIndex}
      />
      {/* Table header */}
      <div className="pt-6 flex">
        {/* processors */}
        <div className="w-[165px] h-[38px] text-sm ml-7 z-[3]">
          <button
            className="flex w-full h-full justify-center items-center border-[1px] rounded-[64px] text-xs font-PoppinsRegular font-bold"
            onClick={() => {
              setShowProcessor(!showProcessor);
              // setShowFilter(false);
            }}
          >
            <RiCpuFill className=" text-main text-xl" />
            <div className="w-fit mx-3">Type</div>
            <FaArrowDown />
          </button>
          {showProcessor && (
            <ul className="bg-gray-200 rounded-md px-0 text-xs">
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setProcessors("All Processors")}
              >
                All Types
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setProcessors("Interswitch")}
              >
                Private
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setProcessors("ZONE")}
              >
                Government
              </li>
            </ul>
          )}
        </div>
        {/* filters */}
        {/* <div className="w-[149px] h-[38px] z-[3]">
          <button
            className="flex w-full h-full text-xs justify-center items-center border-[1px] rounded-[64px] font-PoppinsRegular font-bold"
            onClick={() => {
              setShowFilter(!showFilter);
              setShowProcessor(false);
            }}
          >
            <HiFilter className=" text-main text-xl" />
            <div className="w-fit mx-3">Filters</div>
            <FaArrowDown />
          </button>
          {showFilter && (
            <ul className="bg-gray-200 rounded-md px-3 text-xs">
              <li className="p-2">Interswitch</li>
              <li className="p-2">Zone</li>
              <li className="p-2">NIBBS</li>
            </ul>
          )}
        </div> */}
        {/* Dates */}
        <div className="w-[160px] h-[38px] z-[3] ml-5 mr-3">
          <div className="relative w-full h-full">
            {!fromDate && (
              <IoCalendar className="absolute top-3 left-4 text-main" />
            )}
            <input
              id="fromDate"
              name="fromDate"
              type="date"
              value={fromDate}
              // defaultValue={""}
              placeholder="date"
              onChange={(e) => handleFromDate(e.currentTarget.value)}
              className="rounded-[64px] h-full w-[145px] pr-1 border-[1px] text-center border-gray-400 font-PoppinsRegular text-xs font-bold"
            />
          </div>
        </div>
        <div className="flex items-center text-sm font-PoppinsRegular font-bold">
          -
        </div>
        <div className="w-[160px] h-[38px] z-[3] ml-3 mr-5">
          <div className="relative w-full h-full">
            {!toDate && (
              <IoCalendar className="absolute top-3 left-4 text-main" />
            )}
            <input
              id="toDate"
              name="toDate"
              type="date"
              value={toDate}
              placeholder=""
              // readOnly
              onChange={(e) => handleToDate(e.currentTarget.value)}
              className="rounded-[64px] h-full w-[145px] pr-1 border-[1px] text-center border-gray-400 font-PoppinsRegular text-xs font-bold"
            />
          </div>
        </div>
        <div className="w-[220px] h-[38px] z-[3] ml-0 mr-5">
          <div className="relative w-[220px] h-[38px]">
            <CiSearch
              className="text-2xl absolute top-2 left-4 text-main cursor-pointer"
              onClick={() => {
                if (search) {
                  // dispatch(searchTransacactionByRRN(search));
                }
              }}
            />
            <input
              id="rrn"
              name="rrn"
              type="text"
              value={search}
              placeholder="Search vendors by name"
              // onClick={() => handleSearch}
              onChange={(e) => setSearch(e.currentTarget.value)}
              className="rounded-[64px] w-full pl-10 h-full border-[1px] border-gray-400 font-PoppinsRegular text-xs font-bold"
            />
          </div>
        </div>
        <button className="w-[114px] h-[38px] text-xs ml-auto mr-4 bg-main text-white rounded-[64px] flex items-center justify-center">
          <SVGs index={20} className={"mr-1"} />
          Export CSV
        </button>
      </div>
      {/* Table */}
      <table className="mt-7 w-full">
        <thead>
          <tr className="bg-slate-400 h-[50px] text-gray font-PoppinsRegular text-xs">
            <th>
              <div className="flex items-center justify-center px-2 text-nowrap">
                S/N
                {sortBy === "s/n" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th>
              <div className="flex items-center justify-center px-2 text-nowrap">
                VIEW
              </div>
            </th>
            <th onClick={() => handleSort("vendorName")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                VENDOR NAME
                {sortBy === "vendorName" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("manager")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                MANAGER
                {sortBy === "manager" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("phoneno")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                PHONE NUMBER
                {sortBy === "phoneno" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("email")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                EMAIL
                {sortBy === "email" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("address")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                ADDRESS
                {sortBy === "address" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("lga")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                LOCAL GOVERNMENT
                {sortBy === "lga" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("state")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                STATE
                {sortBy === "state" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("isFuelAvailable")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                FUEL AVAILABILITY
                {sortBy === "isFuelAvailable" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((dt: IVendor, index: number) => {
            if (index < rowsPerPage) {
              return (
                <tr
                  key={index}
                  className={`${
                    (index + 1) % 2 == 0 ? "bg-slate-200" : "bg-white"
                  } font-PoppinsRegular text-xs md:text-base cursor-pointer h-[45px] hover:bg-orange-200`}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                >
                  <td className="text-center text-sm">{index + 1}</td>
                  <td className="flex items-center justify-center h-[45px]">
                    <FaEye onClick={() => setOpenTrx(!openTrx)} />
                  </td>
                  <td className="text-center text-sm">{`${
                    dt.vendorName === null ? "-" : dt.vendorName
                  }`}</td>

                  <td className="text-center text-sm">{`${
                    dt.manager === null ? "-" : dt.manager
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.phoneno === null ? "-" : dt.phoneno
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.email === null ? "-" : dt.email
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.address === null ? "-" : dt.address
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.lga === null ? "-" : dt.lga
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.state === null ? "-" : dt.state
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.isFuelAvailable === null ? "-" : dt.isFuelAvailable
                  }`}</td>
                </tr>
              );
            } else {
              return <></>;
            }
          })}
        </tbody>
      </table>
      {/* table navigation */}
      <div className="flex items-center justify-center">
        <div className="w-fit ml-8 mt-6">
          Showing:
          <select
            className="border-[1px] mx-2 rounded-2xl p-1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          per page
        </div>
        <ReactPaginate
          className="flex w-fit ml-auto mt-6 paginate font-PoppinsRegular"
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pages ? pages : 0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={(e) => {
            handlePageClick(e);
          }}
          containerClassName={"pagination"}
          activeClassName={"bg-orange-400 text-white"}
          initialPage={data?.pagination?.page - 1}
        />
      </div>
    </div>
  );

  // function TableNav(index: number, number: any) {
  //   return (
  //     <div
  //       id={`tabNav${index}`}
  //       className={`${
  //         currentTabNavIndex === index ? "bg-main text-white" : ""
  //       } rounded-[24px] w-[24px] h-[24px] font-semibold cursor-pointer flex items-center justify-center mx-3 py-[3px] px-[0px]`}
  //       onClick={() => {
  //         if (number !== "..." && index <= pages) {
  //           setTabNav(index);
  //           // dispatch(allTransaction(number));
  //         }
  //       }}
  //       key={index}
  //     >
  //       {number}
  //     </div>
  //   );
  // }
};

export const formatDate = (inputDateStr: string) => {
  const inputDate = new Date(inputDateStr);

  // Months of the year
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day and month components
  const day = inputDate.getDate();
  const monthIndex = inputDate.getMonth();
  const month = monthsOfYear[monthIndex];
  const year = inputDate.getFullYear();

  // Format the output
  return `${day} ${month}, ${year}`;
};

// function formatDateHere(date: any) {
//   const currentDate = new Date(date);
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1; // Months are zero-indexed
//   const day = currentDate.getDate();
//   return new Date(
//     `${year}-${month.toString().padStart(2, "0")}-${day
//       .toString()
//       .padStart(2, "0")}`
//   );
// }

export default VendorsTable;
