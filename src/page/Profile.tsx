import { useState, useEffect, useRef } from "react";
import ImageUploader from "../components/ImageUploader";

export default function ProfileSetting() {
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [showname, setShowname] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const uploaderRef = useRef<{ openFileDialog: () => void }>(null);

  // โหลดข้อมูลโปรไฟล์จาก localStorage
  useEffect(() => {
    const username =
      localStorage.getItem("currentUser") || localStorage.getItem("username");
    if (!username) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const current = users.find((u: any) => u.username === username);

    if (current) {
      setShowname(current.showname || "");
      setImageUrl(current.image || null);
    }
  }, []);

  // อัปโหลดรูปใหม่
  const handleImageUploaded = (url: string) => {
    const username =
      localStorage.getItem("currentUser") || localStorage.getItem("username");
    if (!username) return;

    setImageUrl(url);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u: any) => u.username === username);

    if (idx !== -1) {
      users[idx].image = url;
      localStorage.setItem("users", JSON.stringify(users));
      alert("อัปโหลดรูปใหม่เรียบร้อยแล้ว!");
    }
  };

  // บันทึกชื่อใหม่
  const handleSaveProfile = () => {
    const username =
      localStorage.getItem("currentUser") || localStorage.getItem("username");
    if (!username) {
      alert("ไม่พบข้อมูลผู้ใช้");
      return;
    }

    if (!showname.trim()) {
      alert("กรุณากรอกชื่อก่อนบันทึก");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u: any) => u.username === username);

    if (idx !== -1) {
      users[idx].showname = showname;
      localStorage.setItem("users", JSON.stringify(users));
      alert("บันทึกโปรไฟล์เรียบร้อยแล้ว!");
    }
  };

  // เปลี่ยนรหัสผ่าน
  const handlePasswordChange = () => {
    const username =
      localStorage.getItem("currentUser") || localStorage.getItem("username");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u: any) => u.username === username);

    if (idx === -1) {
      alert("ไม่พบข้อมูลผู้ใช้ในระบบ");
      return;
    }

    if (users[idx].password !== oldPassword) {
      alert("รหัสผ่านเดิมไม่ถูกต้อง");
      return;
    }

    if (newPassword.length < 6) {
      alert("รหัสผ่านใหม่ควรมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    users[idx].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว!");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#EEDBC4]">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[380px] mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#3D342F]">
          Profile Settings
        </h1>

        {/* รูปโปรไฟล์ */}
        <div className="flex flex-col items-center mb-5">
          <img
            src={imageUrl || "/user/default.png"}
            alt="Profile"
            className="w-[120px] h-[120px] rounded-full object-cover border-2 border-[#3D342F] mb-3"
          />
          <button
            onClick={() => uploaderRef.current?.openFileDialog()}
            className="cursor-pointer bg-[#3D342F] text-white py-2 px-4 rounded hover:bg-[#6b5e55] duration-300"
          >
            Upload New Photo
          </button>
          <ImageUploader
            ref={uploaderRef}
            folder="profile"
            label=""
            onUploaded={handleImageUploaded}
          />
        </div>

        {/* ชื่อแสดงผล */}
        <div className="mb-5">
          <label className="block text-[#3D342F] font-semibold mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={showname}
            onChange={(e) => setShowname(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-[#3D342F]"
          />
        </div>

        <button
          onClick={handleSaveProfile}
          className="cursor-pointer w-full bg-[#3D342F] text-white py-2 rounded hover:bg-[#6b5e55] duration-300 mb-6"
        >
          Save Profile
        </button>

        {/* เปลี่ยนรหัสผ่าน */}
        <div
          className="border-t border-gray-300 pt-4 flex justify-between"
          onClick={() => setShowFormPassword(!showFormPassword)}
        >
          <h2 className="text-xl font-bold mb-3 text-[#3D342F]">
            Change Password
          </h2>
          <span className="text-[#3D342F] mr-3 cursor-pointer transition-transform duration-200 hover:scale-125">
            {showFormPassword ? "▲" : "▼"}
          </span>
        </div>

        {showFormPassword && (
          <>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handlePasswordChange}
              className="cursor-pointer w-full bg-[#4ECDD2] text-white py-2 rounded hover:bg-[#38b9be] duration-300"
            >
              Update Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
