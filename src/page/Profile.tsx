import { useState, useEffect, useRef } from "react";
import ImageUploader from "../components/ImageUploader"; // component อัปโหลดภาพผ่าน Cloudinary
import Users from "../data/login.json";

export default function ProfileSetting() {
    // Dropdown password form
    const [showFormPassword, setShowFormPassword] = useState(false);
    // 🌟 ข้อมูลชื่อและรูป
    const [showname, setShowname] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // 🌟 ช่องกรอกรหัสผ่าน
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 🌟 ใช้เรียก input ของ ImageUploader จากภายนอก
    const uploaderRef = useRef<{ openFileDialog: () => void }>(null);

    // โหลดข้อมูลโปรไฟล์เมื่อเข้าเพจ
    useEffect(() => {
        const storedName = localStorage.getItem("showname");
        const storedImage = localStorage.getItem("image");
        if (storedName) setShowname(storedName);
        if (storedImage) setImageUrl(storedImage);
    }, []);

    // รวม users ทั้งหมดจาก localStorage และ JSON
    const getAllUsers = () => {
        const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
        return [...Users, ...localUsers];
    };

    // เมื่ออัปโหลดรูปใหม่เสร็จ (อัปเดต localStorage + users array)
    const handleImageUploaded = (url: string) => {
        setImageUrl(url);
        localStorage.setItem("image", url);

        const username = localStorage.getItem("username");
        const users = getAllUsers();

        // หา user ปัจจุบันใน array
        const index = users.findIndex((u: any) => u.username === username);

        if (index !== -1) {
            users[index].image = url;
            localStorage.setItem("users", JSON.stringify(users));
        }
    };

    // บันทึกชื่อใหม่
    const handleSaveProfile = () => {
        if (!showname.trim()) {
            alert(" กรุณากรอกชื่อก่อนบันทึก");
            return;
        }

        const username = localStorage.getItem("username");

        // อัปเดตชื่อใน localStorage หลัก
        localStorage.setItem("showname", showname);

        // และใน users array ด้วย (เพื่อให้ login ใช้ข้อมูลใหม่)
        const users = getAllUsers();
        const index = users.findIndex((u: any) => u.username === username);

        if (index !== -1) {
            users[index].showname = showname;
            localStorage.setItem("users", JSON.stringify(users));
        }

        alert(" บันทึกโปรไฟล์เรียบร้อยแล้ว!");
    };

    // เปลี่ยนรหัสผ่าน
    const handlePasswordChange = () => {
        const username = localStorage.getItem("username");
        const allUsers = getAllUsers();

        // หา user ปัจจุบัน
        const index = allUsers.findIndex((u: any) => u.username === username);

        if (index === -1) {
            alert(" ไม่พบข้อมูลผู้ใช้ในระบบ");
            return;
        }

        const isFromJson = Users.some((u: any) => u.username === username);

        if (isFromJson) {
            alert("Admin ไม่สามารถเปลี่ยนรหัสผ่านได้จากหน้านี้");
            return;
        }
        // ตรวจสอบ old password
        const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = localUsers.findIndex((u: any) => u.username === username);

        if (userIndex === -1) {
            alert("ไม่พบข้อมูลผู้ใช้ใน localStorage");
            return;
        }

        if (localUsers[userIndex].password !== oldPassword) {
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

        // อัปเดตรหัสผ่านใน localStorage.users
        localUsers[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(localUsers));

        // อัปเดต session ปัจจุบัน
        localStorage.setItem("userpassword", newPassword);

        alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#EEDBC4]">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px]">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#3D342F]">
                    Profile Settings
                </h1>

                {/* 🔹 รูปโปรไฟล์ */}
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

                {/* 🔹 เปลี่ยนชื่อ */}
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

                {/* 🔹 เปลี่ยนรหัสผ่าน */}
                <div className="border-t border-gray-300 pt-4 flex justify-between"
                    onClick={() => setShowFormPassword(!showFormPassword)}>
                    <h2 className="text-xl font-bold mb-3 text-[#3D342F]">
                        Change Password
                    </h2>
                    <span className="text-[#3D342F] mr-3 cursor-pointer
                    transition-transform duration-200 hover:scale-125 ">
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
