import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// ProtectedRoute ไว้กันหน้าคนที่ล็อกอินแล้ว
export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("authToken"); // ดึง token จาก localStorage เพื่อเช็คล็อกอินอยู่ไหม

  // ถ้าไม่มี token แปลว่ายังไม่ล็อกอิน 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
