import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// ✅ ใช้เช็กว่ามี token หรือไม่
export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    //  ถ้ายังไม่มี token → เด้งไปหน้า login
    return <Navigate to="/login" replace />;
  }

  //  ถ้ามี token → แสดงหน้าปกติ
  return <>{children}</>;
}
