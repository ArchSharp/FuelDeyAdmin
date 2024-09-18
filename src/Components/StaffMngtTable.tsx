import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa6";
// import { HiFilter } from "react-icons/hi";
import { RiCpuFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { IAlertProps, IStaff, IStaffs } from "../Features/User/type";
import { getAllStaffs, setShowAlert } from "../Features/User/userSlice";
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
  const { currentUser } = useAppSelector((state) => state.user);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<IStaffs>(staffsData);
  const [sortBy, setSortBy] = useState<keyof any>("internalid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openStaff, setOpenStaff] = useState(false);
  const [addStaff, setAddStaff] = useState(false);
  const [filter, setFilter] = useState("All Types");
  // const [showFilter, setShowFilter] = useState(false);
  const [showProcessor, setShowProcessor] = useState(false);
  // const [openToDate, setOpenToDate] = useState<boolean>(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [search, setSearch] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  const [tappedStaff, setTappedStaff] = useState<IStaff>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  useEffect(() => {
    setData(staffsData);
  }, [staffsData]);

  useEffect(() => {
    // Skip the first load
    setIsFirstLoad(false);
  }, []);

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
      .filter((dt: any) => dt?.role === filter);

    if (filter !== "All Types") {
      setData({ data: sortedData, pagination: data.pagination });
    } else {
      setData(staffsData);
    }
    // setShowFilter(false);
    // setShowProcessor((prevValue) => !prevValue);
  }, [filter, staffsData, data?.pagination]);

  // const handleProcessorChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setFilter(event.target.value);
  // };

  // const handleSearch = (option: string) => {
  //   setSearch(option);
  // };

  const closeModal = () => {
    setOpenStaff(false);
    setAddStaff(false);
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
        dispatch(getAllStaffs(num));

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
      const sortedData = staffsData?.data
        ?.slice()
        .filter((dt: IStaff) => regex.test(dt?.firstname + " " + dt.lastname)); // Use regex to match station names
      // console.log("searching...: ", sortedData);
      setData({ data: sortedData, pagination: data.pagination });
    } else if (search.length === 0) {
      setData(staffsData);
    }
  }, [search, staffsData]);

  // console.log("sorted data: ", showProcessor);

  return (
    <div className="min-w-[1125px] xl:min-w-full min-h-[93vh] h-fit mb-10 transaction">
      <StaffModal
        isOpen={openStaff}
        onClose={closeModal}
        content="testing"
        data={tappedStaff!}
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
        {currentUser?.role === "superadmin" && (
          <button
            className="flex px-5 py-2 ml-5 bg-blue-950 text-white h-full justify-center items-center border-[1px] rounded-[64px] text-xs md:text-sm font-poppins font-bold"
            onClick={() => {
              setAddStaff(!addStaff);
            }}
          >
            <IoPersonAdd className=" text-main text-xl" />
            <div className="w-fit mx-3">New Staff</div>
          </button>
        )}
        {/* filter */}
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
                onClick={() => setFilter("All Types")}
              >
                All Types
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setFilter("admin")}
              >
                Admin
              </li>
              <li
                className="py-2 px-3 hover:bg-white cursor-pointer"
                onClick={() => setFilter("superadmin")}
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
              placeholder="Search staff by full name"
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
            <th onClick={() => handleSort("firstname")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                FULL NAME
                {sortBy === "firstname" && (
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
            <th onClick={() => handleSort("createdat")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                DATE CREATED
                {sortBy === "createdat" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort("isactive")}>
              <div className="flex items-center justify-center px-2 text-nowrap">
                STATUS
                {sortBy === "isactive" && (
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
                        setTappedStaff(dt);
                      }}
                    />
                  </td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.firstname === null
                      ? "-"
                      : dt.firstname + " " + dt.lastname
                  }`}</td>

                  <td className="text-center text-sm px-3 text-nowrap">{`${
                    dt.email === null ? "-" : dt.email
                  }`}</td>
                  <td className="text-center text-sm">{`${
                    dt.phonenumber === null ? "-" : dt.phonenumber
                  }`}</td>
                  <td className="text-center text-sm px-3">{`${
                    dt.role === null ? "-" : dt.role
                  }`}</td>
                  <td className="text-center text-sm text-nowrap">{`${
                    dt.createdat === null ? "-" : formatDate(dt.createdat)
                  }`}</td>
                  <td
                    className={`text-center text-sm px-3 ${
                      dt.isactive === true ? "text-green-700" : "text-red-700"
                    } font-bold`}
                  >{`${dt.isactive === true ? "Active" : "Inactive"}`}</td>
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

export default StaffMngtTable;
