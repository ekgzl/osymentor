import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setUser } from "../features/drawer/UserSlice";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const toUser = {
        username: user?.email?.split("@")[0] || "defaultUsername",
        email: user?.email || "defaultEmail",
        exam: "YKS SAY",
        avatar:
          "https://storage.evrimagaci.org/old/mi_media/afcae823e61eefb077e1f223594b1e7f.jpeg",
        birthdate: "",
      };
      localStorage.setItem("user", JSON.stringify(toUser));
      dispatch(setUser(toUser));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
