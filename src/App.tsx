import { HomePage } from "./pages/Home.tsx";
import { TimekeeperPage } from "./pages/Timekeeper.tsx";
import { TestPage } from "./pages/Test.tsx";
import { Route, Routes } from "react-router-dom";
import { SocialPage } from "./pages/Social.tsx";
import { ProfilePage } from "./pages/Profile.tsx";
import { LandingPage } from "./pages/Landing.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { SignupPage } from "./pages/Signup.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import NotFoundPage from "./pages/NotFound.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/app/*">
        <Route
          index
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="test"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="social"
          element={
            <PrivateRoute>
              <SocialPage />
            </PrivateRoute>
          }
        />
        <Route
          path="timekeeper"
          element={
            <PrivateRoute>
              <TimekeeperPage />
            </PrivateRoute>
          }
        />

        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
