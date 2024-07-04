import { DashboardCard } from "./DashboardCard";
import fuelDrop from "../assets/Images/fuel-splash3.png";
import StateFuelChartAnalysis from "./Charts/StateFuelChartAnalysis";

export const DashboardAdmin = () => {
  return (
    <div className="border-2 border-red-600 px-3 md:px-5 lg:px-10">
      <div className={`w-full py-5 overflow-x-auto`}>
        <div className="w-fit flex items-center">
          <DashboardCard
            css={""}
            svgIndex={3}
            title="Fuel Availability"
            number={20000}
            left_title="High Stock"
            right_title="Low Stock"
            left_number={15000}
            right_number={5000}
          />
          <DashboardCard
            css={"mx-10"}
            svgIndex={1}
            title="Vendors"
            number={120}
            left_title="Active"
            right_title="Inactive"
            left_number={100}
            right_number={20}
          />
          <DashboardCard
            css={""}
            svgIndex={2}
            title="Buyers"
            number={20000}
            left_title="Active"
            right_title="Inactive"
            left_number={19000}
            right_number={1000}
          />
        </div>
      </div>

      <div className="">
        <div className="flex items-center mt-10 mb-5">
          <div className="flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500">
            <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
            <div className="font-bold font-poppins text-white ml-2 text-sm tracking-wider">
              Availability
            </div>
          </div>

          <div className="flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500 ml-5">
            <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
            <div className="font-bold font-poppins text-white ml-2 text-sm tracking-wider text-center">
              Stations vs <br /> Availability No.
            </div>
          </div>

          <div className="flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500 ml-5">
            <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
            <div className="font-bold font-poppins text-white ml-2 text-sm tracking-wider text-center">
              Availability <br />
              percentage
            </div>
          </div>

          <div className="flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500 ml-5">
            <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
            <div className="font-bold font-poppins text-white ml-2 text-sm tracking-wider">
              Stock Level
            </div>
          </div>

          <div className="flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500 ml-5">
            <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
            <div className="font-bold font-poppins text-white ml-2 text-sm tracking-wider">
              Fuel Types
            </div>
          </div>
        </div>
        <h1 className="font-bold font-manrope text-xl">State Fuel Analysis</h1>

        <div className="h-[500px] border-2 mt-10 mb-20">
          <StateFuelChartAnalysis />
        </div>
      </div>
    </div>
  );
};
