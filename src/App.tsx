import { HomePage } from "./pages/appPages/Home.tsx";
import { TimekeeperPage } from "./pages/appPages/Timekeeper.tsx";
import { TestPage } from "./pages/appPages/Test.tsx";
import { Route, Routes } from "react-router-dom";
import { SocialPage } from "./pages/appPages/Social.tsx";
import { ProfilePage } from "./pages/appPages/Profile.tsx";
import { LandingPage } from "./pages/landingPages/Landing.tsx";
import { LoginPage } from "./pages/authPages/Login.tsx";
import { SignupPage } from "./pages/authPages/Signup.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
import { LandingLayout } from "./pages/landingPages/LandingLayout.tsx";
import AboutPage from "./pages/landingPages/About.tsx";
import ServicesPage from "./pages/landingPages/Services.tsx";
import ContactPage from "./pages/landingPages/Contact.tsx";
import { AppLayout } from "./pages/appPages/AppLayout.tsx";

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


      <Route element={<AppLayout />}>
        <Route path="/app" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/app/*">
          <Route path="test" element={<PrivateRoute><TestPage /></PrivateRoute>} />
          <Route path="social" element={<PrivateRoute><SocialPage /></PrivateRoute>} />
          <Route path="timekeeper" element={<PrivateRoute><TimekeeperPage /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
