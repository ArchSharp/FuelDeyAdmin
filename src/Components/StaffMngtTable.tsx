import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa6";
// import { HiFilter } from "react-icons/hi";
import { RiCpuFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import ReactPaginate from "react-paginate";
import { useAppDispatch } from "../Store/store";
import { IAlertProps, IStaff, IStaffs } from "../Features/User/type";
import { setShowAlert } from "../Features/User/userSlice";
import { SVGs } from "../assets/SVGs";
import { IoPersonAdd } from "react-icons/io5";
import StaffModal from "./Modals/StaffModal";
import { AiFillEdit } from "react-icons/ai";
import NewStaffModal from "./Modals/NewStaffModal";

// import { clearErrors } from "../../Features/Error/errorSlice";

// import { TableData } from "../Interface/ITableData";
// import { initialData } from "../Data/TableData";

type IStaffsProps = {
  staffsData: IStaffs;
};

export const StaffMngtTable = ({ staffsData }: IStaffsProps) => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<IStaffs>(staffsData);
  const [sortBy, setSortBy] = useState<keyof any>("internalid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openStaff, setOpenStaff] = useState(false);
  const [addStaff, setAddStaff] = useState(false);
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
    setData(staffsData);
  }, [staffsData]);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleSort = (column: keyof IStaff) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = data?.data.slice().sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy as keyof IStaff];
      const bValue = b[sortBy as keyof IStaff];
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
    const sortedData = staffsData?.data
      ?.slice()
      .filter((dt: any) => dt?.processorName === processors);

    if (processors !== "All Processors") {
      setData({ data: sortedData, pagination: data.pagination });
    } else {
      setData(staffsData);
    }
    // setShowFilter(false);
    // setShowProcessor((prevValue) => !prevValue);
  }, [processors, staffsData, data?.pagination]);

  // const handleProcessorChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setProcessors(event.target.value);
  // };

  // const handleSearch = (option: string) => {
  //   setSearch(option);
  // };

  const closeModal = () => {
    setOpenStaff(false);
    setAddStaff(false);
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
    <div className="min-w-[1125px] xl:min-w-full min-h-[93vh] h-fit mb-10 transaction">
      <StaffModal
        isOpen={openStaff}
        onClose={closeModal}
        content="testing"
        dataId={currentIndex}
      />
      <NewStaffModal
        isOpen={addStaff}
        onClose={closeModal}
        content="testing"
        dataId={currentIndex}
      />
      {/* Table header */}
      <div className="pt-6 flex">
        {/* add staff */}
        <button
          className="flex px-5 py-2 ml-5 bg-blue-950 text-white h-full justify-center items-center border-[1px] rounded-[64px] text-xs md:text-sm font-poppins font-bold"
          onClick={() => {
            setAddStaff(!addStaff);
          }}
        >
          <IoPersonAdd className=" text-main text-xl" />
          <div className="w-fit mx-3">New Staff</div>
        </button>
        {/* processors */}
        <div className="w-[165px] h-[38px] text-sm ml-5 z-[3]">
          <button
            className="flex w-full h-full justify-center items-center border-[1px] rounded-[64px] text-xs font-poppins font-bold"
            onClick={() => {
              setShowProcessor(!showProcessor);
              // setShowFilter(false);
            }}
          >
            <RiCpuFill className=" text-main text-xl" />
            <div className="w-fit mx-3">Filter</div>
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
                Admin
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setProcessors("ZONE")}
              >
                SuperAdmin
              </li>
            </ul>
          )}
        </div>

        <div className="w-[220px] h-[38px] z-[3] ml-5 mr-5">
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
              placeholder="Search staff by email"
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
            <th onClick={() => handleSort("fullName")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                FULL NAME
                {sortBy === "fullName" && (
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
            <th onClick={() => handleSort("role")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                ROLE
                {sortBy === "role" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("createdAt")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                DATE CREATED
                {sortBy === "createdAt" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("isActive")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                STATUS
                {sortBy === "isActive" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((dt: IStaff, index: number) => {
            if (index < rowsPerPage) {
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
                    <AiFillEdit
                      className="mx-auto"
                      onClick={() => {
                        setCurrentIndex(index);
                        setOpenStaff(!openStaff);
                      }}
                    />
                  </td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.fullName === null ? "-" : dt.fullName
                  }`}</td>

                  <td className="text-center text-sm px-3 text-nowrap">{`${
                    dt.email === null ? "-" : dt.email
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.phoneno === null ? "-" : dt.phoneno
                  }`}</td>
                  <td className="text-center text-sm px-3">{`${
                    dt.role === null ? "-" : dt.role
                  }`}</td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.createdAt === null ? "-" : dt.createdAt
                  }`}</td>
                  <td
                    className={`text-center text-sm px-3 ${
                      dt.isActive === true ? "text-green-700" : "text-red-700"
                    } font-bold`}
                  >{`${dt.isActive === true ? "Active" : "Inactive"}`}</td>
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

export default StaffMngtTable;
