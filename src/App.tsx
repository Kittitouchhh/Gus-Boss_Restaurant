import { Routes, Route, useLocation } from "react-router-dom";

// หาไม่เจอ
import NotFoundPage from "./page/NotfoundPage";
// ตรวจการ login
import ProtectedRoute from "./components/ProtectedRoute";
// 🔹 Components
import Header from "./components/header";
import HeaderAdmin from "./components/Admin/CrudAdmin/headerAdmin";
import Footer from "./components/footer";

// 🏠 Client Pages
import HomeClient from "./page/client/Home-Client";
import PostIt from "./page/client/Post-It-Client";
import ProcessOrder from "./page/client/Process-Client";
import Constact from "./page/client/Constact-Client";
import Profile from "./page/Profile";

// ⚙️ Admin Pages
import AdminPage from "./page/pagesAdmin/AdminPage";

// 🧾 Auth Pages
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";

export default function App() {
  const location = useLocation(); // ใช้ดู path ปัจจุบัน
  const isAdmin = location.pathname.startsWith("/admin"); // ถ้า URL เริ่มด้วย /admin → ถือว่าเป็น admin
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signuppage"; // หน้า login/register

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ ซ่อน Header/Footer เมื่ออยู่หน้า Login/Register */}
      {!isAuthPage && (isAdmin ? <HeaderAdmin /> : <Header />)}

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

          {/* 🔹 Admin Pages */}
          <Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute> <HomeClient /> </ProtectedRoute>} />
          <Route path="/admin/process" element={<ProtectedRoute> <ProcessOrder /> </ProtectedRoute>} />
          <Route path="/admin/postit" element={<ProtectedRoute> <PostIt /> </ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute> <Constact /> </ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

          {/* 🔹 ถ้าไม่เจอ path → กลับหน้า Login */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* ✅ แสดง Footer เฉพาะหน้าเว็บหลัก */}
      {!isAuthPage && <Footer />}
    </div>
  );
}
