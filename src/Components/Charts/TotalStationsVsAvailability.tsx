import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// import { useAppSelector } from "../../Store/store";
import { connect } from "react-redux";

interface TotalStationsVsAvailabilityProps {
  stateFuelDashboardData: any; // Replace `any` with the appropriate type
}

class TotalStationsVsAvailability extends PureComponent<TotalStationsVsAvailabilityProps> {
  static demoUrl = "https://codesandbox.io/s/mixed-bar-chart-q4hgc";

  render() {
    const { stateFuelDashboardData = { availability: [] } } = this.props;

    const transformedData = stateFuelDashboardData?.map((item: any) => ({
      Availability: item.availability,
      TotalStations: item.totalstation,
      state: item.state,
      ...item,
    }));

    const maxValue = stateFuelDashboardData?.reduce(
      (max: number, item: any) => {
        const maxAvailability = Math.max(item?.totalstation || 0);
        return Math.max(max, maxAvailability);
      },
      0
    );

    let exactMaxValue = maxValue + 100;

    // console.log("state fuel: ", transformedData, ", maxValue: ", exactMaxValue);

    return (
      <ResponsiveContainer
        width="100%"
        height="85%"
        // style={{ border: "3px solid", padding: "0px", margin: "0px" }}
      >
        <BarChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 20,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" className=" text-xs" />
          <YAxis domain={[0, exactMaxValue]} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend className="text-sm" />
          <Bar dataKey="TotalStations" fill="rgb(50,50,50)" />
          <Bar dataKey="Availability" fill="#1EBB9F" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = (state: any) => ({
  stateFuelDashboardData: state.user.vendorSummary,
});

export default connect(mapStateToProps)(TotalStationsVsAvailability);
