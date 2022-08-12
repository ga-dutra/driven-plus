import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../styles/globalStyles";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import SubscriptionsPage from "./SubscriptionsPage";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import UserUpdatePage from "./UserUpdatePage";
import { UserStorage } from "../contexts/UserContext";
import { PlansStorage } from "../contexts/PlansContext";
import PlanSigningPage from "./PlanSigningPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserStorage>
        <PlansStorage>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route
                path="/subscriptions/:planId"
                element={<PlanSigningPage />}
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/users/:userId" element={<UserPage />} />
              <Route
                path="/users/:userId/update"
                element={<UserUpdatePage />}
              />
            </Routes>
          </BrowserRouter>
        </PlansStorage>
      </UserStorage>
    </>
  );
}
