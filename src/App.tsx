import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import AdminPage from "./page/pagesAdmin/AdminPage";
// หาไม่เจอ
import NotFoundPage from "./page/NotfoundPage";
// ตรวจการ login
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/footer";

// 🏠 Client Pages
import HomeClient from "./page/client/Home-Client";
import PostIt from "./page/client/Post-It-Client";
import ProcessOrder from "./page/client/Process-Client";
import Constact from "./page/client/Constact-Client";
import Profile from "./page/Profile";
import Memberpage from "./page/memberpage";

// 🧾 Auth Pages
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";

export default function App() {
  const location = useLocation(); // ใช้ดู path ปัจจุบัน
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signuppage"; // หน้า login/register

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Header />}

      <main className="flex-grow">
        <Routes>
          {/* 🔹 หน้า Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignupPage />} />

          {/* 🔹 Client Pages */}
          <Route path="/" element={<ProtectedRoute> <HomeClient /> </ProtectedRoute>} />
          <Route path="/process" element={<ProtectedRoute> <ProcessOrder /> </ProtectedRoute>} />
          <Route path="/postit" element={<ProtectedRoute> <PostIt /> </ProtectedRoute>} />
          <Route path="/constact" element={<ProtectedRoute> <Constact /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="/memberpage" element={<ProtectedRoute> <Memberpage /> </ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>} />

          {/* 🔹 ถ้าไม่เจอ path → กลับหน้า Login */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
