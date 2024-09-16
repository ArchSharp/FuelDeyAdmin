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
  LabelList,
  CartesianGrid,
} from "recharts";
// import { useAppSelector } from "../../Store/store";
import { connect } from "react-redux";

interface StateFuelChartPercentProps {
  stateFuelDashboardData: any; // Replace `any` with the appropriate type
}

class StateFuelChartPercent extends PureComponent<StateFuelChartPercentProps> {
  static demoUrl = "https://codesandbox.io/s/mixed-bar-chart-q4hgc";

  render() {
    const { stateFuelDashboardData = { availability: [] } } = this.props;

    const transformedData = stateFuelDashboardData?.map((item: any) => ({
      Availability: item.availability,
      Percentage: (
        (parseFloat(item.availability) / parseFloat(item.totalstation)) *
        100
      ).toFixed(0),
      state: item.state,
      ...item,
    }));

    // const maxValue = stateFuelDashboardData?.totalVsAvailability?.reduce(
    //   (max: number, item: any) => {
    //     const maxAvailability = Math.max(item?.availability || 0);
    //     return Math.max(max, maxAvailability);
    //   },
    //   0
    // );

    let exactMaxValue = 100;

    // console.log("state fuel: ", transformedData, ", maxValue: ", exactMaxValue);

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label text-xs md:text-sm lg:text-base text-green-800">{`${payload[0].payload.state} : ${payload[0].value}%`}</p>
          </div>
        );
      }
      return null;
    };

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
          <Tooltip
            content={<CustomTooltip />}
            contentStyle={{ fontSize: 12 }}
          />
          <Legend className="text-sm" />
          <Bar dataKey={`Percentage`} fill="#1EBB9F">
            <LabelList
              dataKey="Percentage"
              position="top"
              className="text-xs md:text-sm lg:text-base"
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = (state: any) => ({
  stateFuelDashboardData: state.user.vendorSummary,
});

export default connect(mapStateToProps)(StateFuelChartPercent);
