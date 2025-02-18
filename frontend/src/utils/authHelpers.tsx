import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  User,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase-config";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
export const isMobileOrTablet = (): boolean => {
  return window.innerWidth <= 768;
};

export const handleGoogleRedirect = async (
  navigate: Function
): Promise<void> => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Google Redirect Error:", error);
  }

  const result: UserCredential | null = await getRedirectResult(auth);
  if (result) {
    const user: User = result.user;
    console.log("Kullanıcı:", user);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token: string | undefined = credential?.accessToken;

    await axios.post(
      `${import.meta.env.API_URL}/api/v1/login`,
      { idToken: token },
      { withCredentials: true }
    );
  }

  navigate("/app");
};

export const handleGoogleLogin = async (navigate: Function): Promise<void> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const token: string = await result.user.getIdToken();

    await axios
      .post(
        `${import.meta.env.API_URL}/api/v1/login`,
        { idToken: token },
        { withCredentials: true }
      )
      .then(() => {
        console.log("babafireda");
        console.log(import.meta.env.API_URL);
      });

    Toast.fire({
      icon: "success",
      title: "Giriş başarılı! Uygulamaya aktarılıyorsun..",
    }).then(() => {
      console.log("babafireda");
      navigate("/app");
    });
  } catch (error) {
    console.error("Google Popup Hatası:", error);
  }
};
