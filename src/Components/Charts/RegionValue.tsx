import React, { PureComponent } from "react";
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

const data = [
  {
    name: "NC",
    Value: 880,
  },
  {
    name: "NE",
    Value: 600,
  },
  {
    name: "NW",
    Value: 600,
  },
  {
    name: "LAG",
    Value: 600,
  },
  {
    name: "SW",
    Value: 800,
  },
  {
    name: "SE",
    Value: 450,
  },
  {
    name: "SS",
    Value: 450,
  },
];
//https://recharts.org/en-US/examples
export default class RegionValue extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/mixed-bar-chart-q4hgc";

  render() {
    return (
      <ResponsiveContainer width="80%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" className=" text-xs" />
          <YAxis domain={[0, 1000]} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend className="text-sm" />
          <Bar dataKey="Value" fill="#17568B" />
          {/* <Bar dataKey="Failed" fill="#CE0000" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
