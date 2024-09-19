import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuth,
  children,
}) => {
  if (!isAuth) {
    window.location.pathname = "/";
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
