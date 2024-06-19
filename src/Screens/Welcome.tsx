import { Basic } from "./AnimatedBGs/Basic";
// import { Congratulations } from "./AnimatedBGs/Congratulations";

export const Welcome = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      {/* <Congratulations /> */}
      <Basic />
      <div className="text-xl lg:text-4xl text-white mt-52 z-[1] font-italiana text-center">
        You are welcome <br /> <br /> To <br /> <br /> Fuel Dey Project
      </div>
    </div>
  );
};
