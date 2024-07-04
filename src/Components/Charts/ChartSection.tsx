import fuelDrop from "../../assets/Images/fuel-splash3.png";

interface ChartSectionProps {
  title: string;
  css: string;
}

export const ChartSection = ({ title, css }: ChartSectionProps) => {
  return (
    <div
      className={`${css} flex items-center cursor-pointer rounded-md px-[8px] bg-gradient-to-r from-blue-500 to-green-500`}
    >
      <img src={fuelDrop} alt="fuel-drop" className="w-[15px]" />
      <div className="font-bold font-poppins text-white ml-2 mr-4 text-sm tracking-wider text-center text-nowrap">
        {title}
      </div>
    </div>
  );
};
