import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setUser, clearUser } from "../features/drawer/UserSlice";
import NotFoundPage from "./pages/NotFound";
import axios from "axios";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  //-----FETCH USER-----
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true, // Cookie'leri göndermek için
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const toUser = {
          username: user?.email?.split("@")[0] || "defaultUsername",
          email: user?.email || "defaultEmail",
          exam: "YKS SAY",
          avatar:
            "https://storage.evrimagaci.org/old/mi_media/afcae823e61eefb077e1f223594b1e7f.jpeg",
          birthdate: "",
        };
        dispatch(setUser(toUser));
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <NotFoundPage></NotFoundPage>;
  }

  if (!user.email) {
    return <Navigate to="/login" />;
  }
  console.log("as");
  return children;
};

export default PrivateRoute;
