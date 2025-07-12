import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setAuth, clearAuth } from "../features/drawer/AuthSlice";
import { clearUser, setUser } from "../features/drawer/UserSlice";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  //-----FETCH USER-----
  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setAuth({ token }));
      dispatch(setUser(response.data.user));
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
        const token = await user.getIdToken();
        await fetchUser(token);
      } else {
        dispatch(clearUser());
        dispatch(clearAuth());
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <Spinner className="h-12 w-12" color="primary" />;
  }

  if (!authState.token) {
    console.log("token yok", authState.token);
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
