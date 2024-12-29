import { HomePage } from "./pages/Home.tsx";
import { TimekeeperPage } from "./pages/Timekeeper.tsx";
import { TestPage } from "./pages/Test.tsx";
import { Route, Routes } from "react-router-dom";
import { SocialPage } from "./pages/Social.tsx";
import { ProfilePage } from "./pages/Profile.tsx";
import { LandingPage } from "./pages/landingPages/Landing.tsx";
import { LoginPage } from "./pages/authPages/Login.tsx";
import { SignupPage } from "./pages/authPages/Signup.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
import { LandingLayout } from "./pages/landingPages/LandingLayout.tsx";
import AboutPage from "./pages/landingPages/About.tsx";
import ServicesPage from "./pages/landingPages/Services.tsx";
import ContactPage from "./pages/landingPages/Contact.tsx";

function App() {
  return (
    <Routes>

      <Route element={<LandingLayout />}> {/* LandingLayout tüm bu rotalara uygulanır */}
        {/* LandingLayout içinde LandingNavbar ve FooterComp bulunur aşağıdaki rotalar Outlet componentinin yerine gönderilir */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>


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
