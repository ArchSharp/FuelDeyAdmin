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
      Petrol: item?.stockLevel.petrol,
      Diesel: item?.stockLevel.diesel,
      Kerosene: item?.stockLevel.kerosene,
      CookingGas: item?.stockLevel.cookingGas,
      Station: `${item?.vendorName} ${vendor?.address} ${vendor?.state}`,
      ...item,
    }));

    const maxValue = [vendor?.stockLevel]?.reduce((max: number, item: any) => {
      const maxAvailability = Math.max(item?.petrol || 0);
      return Math.max(max, maxAvailability);
    }, 0);

    let exactMaxValue = maxValue + 1000;

    return (
      <ResponsiveContainer width="120%" height="85%">
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
    );
  }
}
