import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const OnalyAdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin === true ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' />
  );
};

export default OnalyAdminRoute;
