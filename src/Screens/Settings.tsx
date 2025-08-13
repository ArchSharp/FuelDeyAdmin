import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Profile } from "./Profile";
import { Security } from "./Security";
import { DownloadMobileApp } from "./DownloadMobileApp";

interface ISettingsProps {
  subIndex: number;
}
export const Settings = ({ subIndex }: ISettingsProps) => {
  // const navigate = useNavigate();
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (pathName === "/admin/settings") {
      // navigate(routes.profile);
    }
  }, [pathName]);

  return (
    <div className="">
      {subIndex === 0 && <Profile />}
      {subIndex === 1 && <Security />}
      {subIndex === 2 && <DownloadMobileApp />}
    </div>
  );
};
