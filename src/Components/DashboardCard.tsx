import { BsFillFuelPumpFill } from "react-icons/bs";
import { PiUserSwitchFill } from "react-icons/pi";

interface DashboardCardProps {
  css: string;
  svgIndex: number;
  title: string;
  number: number;
  left_title: string;
  right_title: string;
  left_number: number;
  right_number: number;
}

export const DashboardCard = ({
  css,
  svgIndex,
  title,
  number,
  left_title,
  right_title,
  left_number,
  right_number,
}: DashboardCardProps) => {
  return (
    <div
      className={`${css} border-[1px] border-slate-400 rounded-[35px] w-[90vw] md:w-[40vw] lg:w-[20vw] h-[45vh] md:h-[40vh] lg:h-[35vh]`}
    >
      <div className="border-b-[1px] border-slate-400 rounded-tr-[35px] rounded-tl-[35px] h-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            {svgIndex === 1 && (
              <BsFillFuelPumpFill className="mr-3 text-2xl text-orange-600" />
            )}
            {svgIndex === 2 && (
              <PiUserSwitchFill className="mr-3 text-2xl text-gray-700" />
            )}
            <div className="font-pacifico text-2xl">{title}</div>
          </div>
          <div className="font-pacifico text-2xl">{number}</div>
        </div>
      </div>
      <div className="flex items-center justify-center h-1/2 rounded-bl-[35px] rounded-br-[35px]">
        <div className=" w-1/2 flex flex-col items-center justify-center h-full rounded-bl-[35px]">
          <div className="text-green-600 font-poppins font-bold">
            {left_title}
          </div>
          <div className="font-pacifico text-2xl">{left_number}</div>
        </div>
        <div className="w-1/2 rounded-br-[35px] flex flex-col items-center justify-center">
          <div className="text-red-600 font-poppins font-bold">
            {right_title}
          </div>
          <div className="font-pacifico text-2xl">{right_number}</div>
        </div>
      </div>
    </div>
  );
};
