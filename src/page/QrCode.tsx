import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

export interface QRCodeProps{
  amount:number
}

const QRCode: React.FC<QRCodeProps> = ({ amount}) => {
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
      alert("อัปโหลดสลิปก่อนนะครับสุดหล่อ 😎");
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
        ? { ...u, membership: { rank: "Bronze", level: 0, points: 0 } }
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
    <div className=" rounded-2xl shadow-2xl h-[99%] max-w-[700px] mx-auto bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center py-6">
        <h1 className="text-[48px] font-bold tracking-wide bg-blue-600 w-full text-center py-3 rounded-t-2xl shadow-inner">
          PAYMENT
        </h1>

        {/* PROMPTPAY INFO */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 bg-blue-700 px-4 py-2 rounded-xl shadow-md">
            <img
              src="/qr/icon-thaiqr.png"
              alt="thaiqr"
              className="w-10 h-10 rounded-md bg-white p-1"
            />
            <div>
              <p className="font-semibold opacity-80">PromptPay</p>
              <p className="font-bold text-lg">{promptpayId}</p>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-sm opacity-80">ชื่อเจ้าของบัญชี</p>
            <p className="font-semibold text-lg">
              นาย กิตติธัช สกุลศักดิ์พินิจ
            </p>
          </div>
        </div>

        {/* QR */}
        <p className="mt-5 bg-black w-full py-2 text-[22px] font-semibold tracking-wide text-center">
          จำนวน: {amount.toLocaleString()} บาท
        </p>

        <img
          src={qrCodeUrl}
          alt="PromptPay QR"
          className="w-64 h-64 mt-5 rounded-xl shadow-lg bg-white p-2"
        />
      </div>

      {/* BUTTON ZONE */}
      <div className="flex justify-between items-center mx-5 mt-6 mb-6 gap-3">
        {/* BACK */}
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

        {/* UPLOAD */}
        <button
          onClick={handleUpload}
          className="cursor-pointer font-bold text-white bg-blue-700 hover:bg-blue-600 mt-4 p-3 border-2 border-dashed border-white rounded-xl shadow-md hover:scale-105 transition duration-500 flex flex-col items-center justify-center min-w-[160px]"
        >
          {!uploadedFile && <p>Upload QR Code</p>}
          {uploadedFile && (
            <p className="text-sm mt-1 text-emerald-300 font-medium truncate max-w-[140px]">
              📄 {uploadedFile.name}
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

        {/* SUBMIT */}
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
    </div>
  );
}
export default QRCode