import { DashboardCard } from "./DashboardCard";
import StateFuelChartAnalysis from "./Charts/StateFuelChartAnalysis";
import { ChartSection } from "./Charts/ChartSection";
import { useEffect, useState } from "react";
import TotalStationsVsAvailability from "./Charts/TotalStationsVsAvailability";
import StateFuelChartPercent from "./Charts/StateFuelChartPercent";
import StateFuelStockLevel from "./Charts/StateFuelStockLevel";
import { useAppSelector } from "../Store/store";

export const DashboardAdmin = () => {
  const { fuelSummary } = useAppSelector((state) => state.user);
  const [chartIndex, setChartIndex] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [availabilityHighStock, setAvailabilityHighStock] = useState(0);
  const [availabilityLowStock, setAvailabilityLowStock] = useState(0);

  const [vendors, setVendors] = useState(0);
  const [vendorsActive, setVendorsActive] = useState(0);
  const [vendorsInActive, setVendorsInActive] = useState(0);

  const [buyers, setBuyers] = useState(0);
  const [buyersActive, setBuyersActive] = useState(0);
  const [buyersInActive, setBuyersInActive] = useState(0);

  const ChartIndex = (index: number) => {
    setChartIndex(index);
  };

  useEffect(() => {
    if (fuelSummary) {
      setAvailability(
        fuelSummary?.fuelAvailability?.highStock +
          fuelSummary?.fuelAvailability?.lowStock
      );

      setAvailabilityHighStock(fuelSummary?.fuelAvailability?.highStock);
      setAvailabilityLowStock(fuelSummary?.fuelAvailability?.lowStock);

      setVendors(fuelSummary?.vendors?.active + fuelSummary?.vendors?.inactive);
      setVendorsActive(fuelSummary?.vendors?.active);
      setVendorsInActive(fuelSummary?.vendors?.inactive);

      setBuyers(fuelSummary?.buyers?.active + fuelSummary?.buyers?.inactive);
      setBuyersActive(fuelSummary?.buyers?.active);
      setBuyersInActive(fuelSummary?.buyers?.inactive);
    }
  }, [fuelSummary]);

  return (
    <div className="px-3 md:px-5 lg:px-10">
      <div className={`w-full py-5 overflow-x-auto`}>
        <div className="w-fit flex items-center">
          <DashboardCard
            css={""}
            svgIndex={3}
            title="Fuel Availability"
            number={availability}
            left_title="High Stock"
            right_title="Low Stock"
            left_number={availabilityHighStock}
            right_number={availabilityLowStock}
          />
          <DashboardCard
            css={"mx-10"}
            svgIndex={1}
            title="Vendors"
            number={vendors}
            left_title="Active"
            right_title="Inactive"
            left_number={vendorsActive}
            right_number={vendorsInActive}
          />
          <DashboardCard
            css={""}
            svgIndex={2}
            title="Buyers"
            number={buyers}
            left_title="Active"
            right_title="Inactive"
            left_number={buyersActive}
            right_number={buyersInActive}
          />
        </div>
      </div>

      <div className="">
        <div className="overflow-x-auto">
          <div className="w-fit flex items-center mt-10 mb-5">
            <ChartSection
              css={"py-1"}
              title="Availability"
              index={0}
              chartIndex={chartIndex}
              ChartIndex={ChartIndex}
            />

            <ChartSection
              css={"ml-5 py-1"}
              title="Overall Status"
              index={1}
              chartIndex={chartIndex}
              ChartIndex={ChartIndex}
            />

            <ChartSection
              css={"ml-5 py-1"}
              title="Availability %"
              index={2}
              chartIndex={chartIndex}
              ChartIndex={ChartIndex}
            />

            <ChartSection
              css={"ml-5 py-1"}
              title="Stock Level"
              index={3}
              chartIndex={chartIndex}
              ChartIndex={ChartIndex}
            />

            {/* <ChartSection
              css={"ml-5 py-1"}
              title="Fuel Types"
              index={4}
              chartIndex={chartIndex}
              ChartIndex={ChartIndex}
            /> */}
          </div>
        </div>
        <h1 className="font-bold font-manrope text-xl">State Fuel Analysis</h1>

        <div className="h-[500px] mt-10 mb-20 overflow-x-auto">
          <div
            className={`${
              chartIndex < 3 ? "w-[150vw]" : "w-[200vw]"
            } md:w-[90vw] lg:w-[70vw] h-full`}
          >
            {chartIndex === 0 && <StateFuelChartAnalysis />}
            {chartIndex === 1 && <TotalStationsVsAvailability />}
            {chartIndex === 2 && <StateFuelChartPercent />}
            {chartIndex === 3 && <StateFuelStockLevel />}
          </div>
        </div>
      </div>
    </div>
  );
};
