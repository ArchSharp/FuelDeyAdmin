import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  // Cell ,
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
    Volume: 880,
  },
  {
    name: "NE",
    Volume: 450,
  },
  {
    name: "NW",
    Volume: 600,
  },
  {
    name: "LAG",
    Volume: 300,
  },
  {
    name: "SW",
    Volume: 800,
  },
  {
    name: "SE",
    Volume: 450,
  },
  {
    name: "SS",
    Volume: 350,
  },
];

//https://recharts.org/en-US/examples
export default class RegionVolume extends PureComponent {
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
          <Bar dataKey="Volume" fill="#FF5F00" />
          {/* <Bar dataKey="Failed" fill="#CE0000" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
