import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaArrowDown, FaEye } from "react-icons/fa6";
// import { HiFilter } from "react-icons/hi";
import { RiCpuFill } from "react-icons/ri";
// import { IoCalendar } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import ReactPaginate from "react-paginate";
import { useAppDispatch } from "../Store/store";
import { IAlertProps, IVendor, IVendors } from "../Features/User/type";
import { getAllVendors, setShowAlert } from "../Features/User/userSlice";
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
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<IVendors>(vendorsData);
  const [sortBy, setSortBy] = useState<keyof any>("internalid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openTrx, setOpenTrx] = useState(false);
  const [filter, setFilter] = useState("All Types");
  // const [showFilter, setShowFilter] = useState(false);
  const [showProcessor, setShowProcessor] = useState(false);
  // const [openToDate, setOpenToDate] = useState<boolean>(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [search, setSearch] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tappedVendor, setTappedVendor] = useState<IVendor>();
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  useEffect(() => {
    setData(vendorsData);
  }, [vendorsData]);

  useEffect(() => {
    // Skip the first load
    setIsFirstLoad(false);
  }, []);

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

  const sortedData = data?.data?.slice().sort((a, b) => {
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
    const sortedData = vendorsData?.data
      ?.slice()
      .filter((dt: any) => dt?.stationname === filter);

    if (filter !== "All Types") {
      setData({ data: sortedData, pagination: data.pagination });
    } else {
      setData(vendorsData);
    }
    // setShowFilter(false);
    // setShowProcessor((prevValue) => !prevValue);
  }, [filter, vendorsData, data?.pagination]);

  // const handleProcessorChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setFilter(event.target.value);
  // };

  // const handleFromDate = (option: string) => {
  //   console.log("fromdate: ", option);
  //   setFromDate(option);
  // };

  // const handleToDate = (option: string) => {
  //   console.log("todate: ", option);
  //   setToDate(option);
  // };

  // const handleSearch = (option: string) => {
  //   setSearch(option);
  // };

  const closeModal = () => {
    setOpenTrx(false);
  };

  var pages = data?.pagination?.total_pages;

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
    if (isFirstLoad) return;
    if (event.selected !== undefined) {
      const num: number = event.selected + 1;
      if (num !== currentPageNo) {
        dispatch(getAllVendors(num));

        setCurrentPageNo(num);
      }
      // if (num !== data?.pagination?.page) dispatch(getAllTransactions(num));

      // console.log(
      //   `User requested page number ${num} page: ${data?.pagination?.page}`
      // );
      // setItemOffset(newOffset);
    }
  };

  useEffect(() => {
    if (search && search.length >= 3) {
      const words = search
        .split(" ")
        .map((word) => word.trim())
        .filter(Boolean);
      const regex = new RegExp(words.join("|"), "i"); // 'i' for case-insensitive matching
      const sortedData = vendorsData?.data
        ?.slice()
        .filter((dt: IVendor) => regex.test(dt?.stationname)); // Use regex to match station names
      // console.log("searching...: ", sortedData);
      setData({ data: sortedData, pagination: data.pagination });
    } else if (search.length === 0) {
      setData(vendorsData);
    }
  }, [search, vendorsData]);

  // console.log("sorted data: ", showProcessor);

  return (
    <div className="min-w-[1125px] xl:min-w-full min-h-[93vh] h-fit mb-10 transaction">
      <VendorDetailsModal
        isOpen={openTrx}
        onClose={closeModal}
        content={`${currentIndex}`}
        data={tappedVendor!}
      />
      {/* Table header */}
      <div className="pt-6 flex">
        {/* filter */}
        <div className="w-[165px] h-[38px] text-sm ml-7 z-[3] mr-3">
          <button
            className="flex w-full h-full justify-center items-center border-[1px] rounded-[64px] text-xs font-poppins font-bold"
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
                onClick={() => setFilter("All Types")}
              >
                All Types
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setFilter("private")}
              >
                Private
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setFilter("government")}
              >
                Government
              </li>
            </ul>
          )}
        </div>
        {/* filters */}
        {/* <div className="w-[149px] h-[38px] z-[3]">
          <button
            className="flex w-full h-full text-xs justify-center items-center border-[1px] rounded-[64px] font-poppins font-bold"
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
        {/* <div className="w-[160px] h-[38px] z-[3] ml-5 mr-3">
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
              className="rounded-[64px] h-full w-[145px] pr-1 border-[1px] text-center border-gray-400 font-poppins text-xs font-bold"
            />
          </div>
        </div>
        <div className="flex items-center text-sm font-poppins font-bold">
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
              className="rounded-[64px] h-full w-[145px] pr-1 border-[1px] text-center border-gray-400 font-poppins text-xs font-bold"
            />
          </div>
        </div> */}

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
              className="rounded-[64px] w-full pl-10 h-full border-[1px] border-gray-400 font-poppins text-xs font-bold"
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
          <tr className="bg-slate-400 h-[50px] text-gray font-poppins text-xs">
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
            <th onClick={() => handleSort("stationname")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                VENDOR NAME
                {sortBy === "stationname" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("stationname")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                MANAGER
                {sortBy === "stationname" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("phonenumber")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                PHONE NUMBER
                {sortBy === "phonenumber" && (
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
            <th onClick={() => handleSort("ispetrol")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                FUEL AVAILABILITY
                {sortBy === "isFuelAvailable" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("isdiesel")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                FUEL TYPES
                {sortBy === "fuelTypes" && (
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
              var fueltypes = [];
              if (dt.isdiesel) fueltypes.push("Diesel");
              if (dt.isgas) fueltypes.push("Gas");
              if (dt.iskerosene) fueltypes.push("Kerosene");
              if (dt.ispetrol) fueltypes.push("Petrol");

              return (
                <tr
                  key={index}
                  className={`${
                    (index + 1) % 2 == 0 ? "bg-slate-200" : "bg-white"
                  } font-poppins text-xs md:text-base cursor-pointer h-[45px] hover:bg-orange-200`}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                >
                  <td className="text-center text-sm">{index + 1}</td>
                  <td className="text-center">
                    <FaEye
                      className="mx-auto"
                      onClick={() => {
                        setCurrentIndex(index);
                        setOpenTrx(!openTrx);
                        setTappedVendor(dt);
                      }}
                    />
                  </td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.stationname === null ? "-" : dt.stationname
                  }`}</td>

                  <td className="text-center text-sm px-3 text-nowrap">{`${
                    dt.stationname === null ? "-" : dt.stationname
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.phonenumber === null ? "-" : dt.phonenumber
                  }`}</td>
                  <td className="text-center text-sm px-3">{`${
                    dt.email === null ? "-" : dt.email
                  }`}</td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.address === null ? "-" : dt.address
                  }`}</td>
                  <td className="text-center text-sm px-3">{`${
                    dt.lga === null ? "-" : dt.lga
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.state === null ? "-" : dt.state
                  }`}</td>
                  <td
                    className={`text-center text-sm px-3 ${
                      dt.ispetrol === true ||
                      dt.isdiesel === true ||
                      dt.isgas === true ||
                      dt.iskerosene === true
                        ? "text-green-700"
                        : "text-red-700"
                    } font-bold`}
                  >{`${
                    dt.ispetrol === true ||
                    dt.isdiesel === true ||
                    dt.isgas === true ||
                    dt.iskerosene === true
                      ? "Available"
                      : "Finished"
                  }`}</td>
                  <td className="text-center text-sm px-3 text-nowrap">{`${fueltypes.join(
                    ", "
                  )}`}</td>
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
            <option value={30}>50</option>
            <option value={30}>80</option>
            <option value={30}>100</option>
          </select>
          per page
        </div>
        <ReactPaginate
          className="flex w-fit ml-auto mt-6 paginate font-poppins"
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
