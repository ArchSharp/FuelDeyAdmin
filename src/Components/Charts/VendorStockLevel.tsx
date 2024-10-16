import { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IVendor } from "../../Features/User/type";

interface VendorStockLevelProps {
  vendor?: IVendor; // Add this line to include the `vendor` prop
}

export class VendorStockLevel extends PureComponent<VendorStockLevelProps> {
  static demoUrl = "https://codesandbox.io/s/mixed-bar-chart-q4hgc";

  render() {
    const { vendor } = this.props;

    const transformedData = [vendor]?.map((item) => ({
      Petrol: item?.petrollevel,
      Diesel: item?.diesellevel,
      Kerosene: item?.kerosenelevel,
      CookingGas: item?.gaslevel,
      Station: `${item?.stationname} ${vendor?.address} ${vendor?.state}`,
      ...item,
    }));

    // Find the max level for this vendor (consider petrol, diesel, gas, and kerosene levels)
    const maxVendorLevel = Math.max(
      vendor?.petrollevel || 0,
      vendor?.diesellevel || 0,
      vendor?.gaslevel || 0,
      vendor?.kerosenelevel || 0
    );

    let exactMaxValue = maxVendorLevel + 1000;
    // let exactMaxValue = 1000;

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart
            // width={500}
            // height={300}
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Station" className="text-xs" />
            <YAxis domain={[0, exactMaxValue]} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend className="text-sm" />
            <Bar dataKey="Petrol" fill="orange" />
            <Bar dataKey="Diesel" fill="brown" />
            <Bar dataKey="Kerosene" fill="#1EBB9F" />
            <Bar dataKey="CookingGas" fill="lightblue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
