import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase-config";
import axios from "axios";
import { Toast } from "./toastConfig";

export const handleGoogleRedirect = async () => {
  console.log("fonksiyon başı");
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Google Redirect Error:", error);
  }
};

export const handleGoogleLogin = async (
  navigate: (path: string) => void
): Promise<void> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const token: string = await result.user.getIdToken();

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      { idToken: token },
      { withCredentials: true }
    );

    await Toast("Giriş başarılı! Uygulamaya aktarılıyorsun..", "success");
    navigate("/app");
  } catch (error) {
    console.error("Google Popup Hatası:", error);
  }
};
