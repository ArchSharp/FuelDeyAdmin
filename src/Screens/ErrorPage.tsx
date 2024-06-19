import error from "../assets/Error-404-v3.png";

export const ErrorPage = () => {
  return (
    <div className="border-2">
      <img src={error} alt="error" className="w-full" />
    </div>
  );
};
