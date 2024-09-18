import { useLocation } from "react-router-dom";

export const Loader = () => {
  const pathName = useLocation().pathname;

  return (
    <div
      className={`fixed z-[5] top-[43vh] ${
        pathName === "/" ? "left-[45vw] md:eft-[60vw]" : "left-[45vw]"
      } w-[60px] h-[60px]`}
    >
      <span className="loader"></span>
    </div>
  );
};
