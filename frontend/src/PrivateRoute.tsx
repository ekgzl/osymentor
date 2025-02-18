import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setUser, clearUser } from "../features/drawer/UserSlice";
import NotFoundPage from "./pages/NotFound";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
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
      const response = await axios.get("http://localhost:5000/api/v1/user", {
        withCredentials: true, // Cookie'leri göndermek için
      });
      dispatch(setUser(response.data.user));
      console.log("userdatafromapi", response.data.user);
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };
  // Firebase'deki oturum durumunu dinle
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Firebase'de oturum açıksa, backend'den kullanıcı bilgilerini çek
        await fetchUser();
      } else {
        dispatch(clearUser());
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <Spinner className="h-12 w-12" color="primary" />;
  }

  if (!user.email) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
