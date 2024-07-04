import { DashboardCard } from "./DashboardCard";
import StateFuelChartAnalysis from "./Charts/StateFuelChartAnalysis";
import { ChartSection } from "./Charts/ChartSection";

export const DashboardAdmin = () => {
  return (
    <div className="px-3 md:px-5 lg:px-10">
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
        <div className="overflow-x-auto">
          <div className="w-fit mx-5 flex items-center mt-10 mb-5">
            <ChartSection css={"py-1"} title="Availability" />

            <ChartSection css={"ml-5 py-1"} title="Overall Status" />

            <ChartSection css={"ml-5 py-1"} title="Availability %" />

            <ChartSection css={"ml-5 py-1"} title="Stock Level" />

            <ChartSection css={"ml-5 py-1"} title="Fuel Types" />
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
