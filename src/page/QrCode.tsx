import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

export interface QRCodeProps {
  amount: number;
}


const QRCode: React.FC<QRCodeProps> = ({ amount }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const promptpayId = "0813996955";
  const qrCodeUrl = `https://promptpay.io/${promptpayId}/${amount}`;

  const handleCancel = () => navigate("/memberpage");
  const handleUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("อัปโหลดสลิปก่อนนะครับสุดหล่อ ");
      return;
    }

    const currentUser =
      localStorage.getItem("currentUser") || localStorage.getItem("username");

    if (!currentUser) {
      alert("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.username === currentUser
        ? {
          ...u,
          points: 0,
          membership: { rank: "Bronze", level: 1, discount: 0.05, percent: 0, nextTarget: 100 }
        }
        : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));


    alert("ชำระเงินเรียบร้อยแล้ว ขอบคุณที่ใช้บริการ!");
    setTimeout(() => {
      navigate("/memberpage");
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#3D2F25] px-3 py-5">
      <div className="w-full max-w-[450px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[550px] bg-gradient-to-b from-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 relative">

        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide bg-blue-600 py-3 rounded-t-2xl shadow-inner">
          PAYMENT
        </h1>
        <div className="flex flex-col items-center mt-6">
          <img
            src={qrCodeUrl}
            alt="PromptPay QR"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-xl shadow-lg bg-white p-2"
          />
          <p className="mt-5 bg-black w-full py-2 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-center rounded-md">
            จำนวน: {amount.toLocaleString()} บาท
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 bg-blue-700 px-4 py-3 sm:px-5 sm:py-3 rounded-xl shadow-md w-fit">
            <img
              src="/qr/icon-thaiqr.png"
              alt="thaiqr"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-white p-1"
            />
            <div>
              <p className="text-sm sm:text-base font-medium opacity-80">PromptPay</p>
              <p className="font-bold text-lg sm:text-xl">{promptpayId}</p>
            </div>
          </div>

          <div className="text-center text-xs sm:text-sm mt-2">
            <p className="opacity-70">ชื่อเจ้าของบัญชี</p>
            <p className="font-semibold">นาย กิตติธัช สกุลศักดิ์พินิจ</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            height="mg"
            width="mg"
            color="gray"
            stringColor="white"
            stringSize="mg"
            onClick={handleCancel}
          >
            Back
          </Button>

          <button
            onClick={handleUpload}
            className="cursor-pointer w-full sm:w-auto font-bold text-black bg-white hover:bg-blue-600 hover:text-white mt-1 p-3 border-2 border-dashed border-gray-500 rounded-xl shadow-md hover:scale-105 transition duration-500 flex flex-col items-center justify-center text-sm sm:text-base"
          >
            {!uploadedFile ? (
              <p>Upload QR Code</p>
            ) : (
              <p className="text-xs sm:text-sm mt-1 text-emerald-200 font-medium truncate max-w-[160px]">
                {uploadedFile.name}
              </p>
            )}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            height="mg"
            width="mg"
            color="green"
            stringColor="white"
            stringSize="mg"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        <p className="text-center text-[10px] sm:text-xs opacity-70 mt-6">
          © 2025 GUSBOSS RESTAURANT. All rights reserved. <br />
          Proudly serving handcrafted coffee.
        </p>
      </div>
    </div>
  );
};

export default QRCode;
