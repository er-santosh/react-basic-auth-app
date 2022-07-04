import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoute = ({
  guest = false,
  redirectPath = "/",
  children,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (guest) {
    if (isLoggedIn) {
      // user is authenticated
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    if (!isLoggedIn) {
      // user is not authenticated
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
};
