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
} from "recharts";
// import { useAppSelector } from "../../Store/store";
import { connect } from "react-redux";

interface StateFuelChartAnalysisProps {
  stateFuelDashboardData: any; // Replace `any` with the appropriate type
}

class StateFuelChartAnalysis extends PureComponent<StateFuelChartAnalysisProps> {
  static demoUrl = "https://codesandbox.io/s/mixed-bar-chart-q4hgc";

  render() {
    const { stateFuelDashboardData = { availability: [] } } = this.props;

    const transformedData = stateFuelDashboardData?.availability?.map(
      (item: any) => ({
        Availability: item.availability,
        state: item.state,
        ...item,
      })
    );

    const maxValue = stateFuelDashboardData?.availability?.reduce(
      (max: number, item: any) => {
        const maxAvailability = Math.max(item?.availability || 0);
        return Math.max(max, maxAvailability);
      },
      0
    );

    let exactMaxValue = maxValue + 10;

    // console.log("state fuel: ", transformedData, ", maxValue: ", exactMaxValue);

    return (
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="state" className=" text-xs" />
          <YAxis domain={[0, exactMaxValue]} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend className="text-sm" />
          <Bar dataKey="Availability" fill="#1EBB9F" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = (state: any) => ({
  stateFuelDashboardData: state.user.stateFuelDashboardData,
});

export default connect(mapStateToProps)(StateFuelChartAnalysis);
