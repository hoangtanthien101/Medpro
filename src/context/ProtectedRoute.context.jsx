import { useContext } from "react";
import { AuthContext } from "./auth.context";
import Login from "../pages/Login";
import NotAdmin from "../pages/NotFound/NotAdmin";
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";

export function ProtectedRoute({ Component, role }) {
  const { user } = useContext(AuthContext);
  // if (!user) {
  //     return <HomePage/>
  // }
  // if (role === "ADMIN") {
  //   if (user.role_id === 3) {
  //     return <Component />;
  //   } else return <NotAdmin />;
  // } else return <Component />;
  return <Component />
  
}
