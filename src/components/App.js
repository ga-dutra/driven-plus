import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../styles/globalStyles";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import SubscriptionsPage from "./SubscriptionsPage";
import { UserStorage } from "../contexts/UserContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}
