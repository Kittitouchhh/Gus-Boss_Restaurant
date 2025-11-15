import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

export interface QRCodeProps {
  amount: number;
  bgcard: "blue" | "brown";
  bgtext: "blue" | "brown"
}

const QRCode: React.FC<QRCodeProps> = ({ amount, bgcard, bgtext }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  const promptpayId = "0813996955";
  const qrCodeUrl = `https://promptpay.io/${promptpayId}/${amount}`;

  const handleCancel = () => {
    navigate("/memberpage")
  }

  const handleUpload = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("อัพสลีปก่อนนะครับสุดหล่อ")
      return;
    }

    const currentUser = localStorage.getItem("currentUser") || localStorage.getItem("username");

    if (!currentUser) {
      alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.username === currentUser
        ? { ...u, membership: { rank: "Bronze", level: 0, points: 0 } }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("authToken", "true");

    alert("ชำระเงินเรียบร้อยแล้ว !");
    setTimeout(() => {
      navigate("/memberpage");
      window.location.reload();
    }, 2000);
  }


  const bgcolor =
    bgcard === "blue" ? "bg-blue-800"
      : bgcard === "brown" ? "bg-{#4B2E05}" /* เผื่อบอสอยากมาเปลี่ยน */
        : "bg-{#4B2E05}";

  const bgfont =
    bgtext === "blue" ? "bg-blue-500" :
      bgcard === "brown" ? "bg-{#4B2E05}" :
        "bg-{#4B2E05}";

  return (
    <div className={`rounded-xl shadow-xl  h-full max-w-[700px] mx-auto ${bgcolor}`}>
      <div className="flex flex-col justify-center items-center">
        <p className={`mt-15 text-center text-[50px] text-white ${bgfont} w-full`}>
          PAYMENT
        </p>

        <div className="mt-5  gap-1 text-white">
          <div >
            <div className="flex items-center ">
              <img
                src="/qr/icon-thaiqr.png"
                alt="icon-thaiqr"
                className="w-18 h-18 "
              />
              <div>
                <div>
                  <p className="text-[20px] font-bold opacity-60">
                    PromptPay
                  </p>
                  <p className="text-[20px] font-bold">
                    081 399 6955
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col text-center" >
              <p className="text-[20px] font-bold opacity-60">ชื่อเจ้าของบัญชี</p>
              <p className="text-[20px] font-bold ">
                นาย กิตติธัช สกุลศักดิ์พินิจ
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3  text-white text-[25px] bg-black w-full text-center">
          จำนวน: {amount.toLocaleString()} บาท
        </p>
        <img
          src={qrCodeUrl}
          alt="PromptPay QR Code"
          className="w-64 h-64 mt-5"
        />
      </div>
      <div className="flex justify-between mx-3 mt-7">

        <Button height="m" width="m" color="gray" stringColor="white"
          stringSize="m" onClick={handleCancel}
        >
          Back
        </Button>

        <button onClick={handleUpload}
          className={`${bgcolor} cursor-pointer font-bold text-white mt-8 p-2 md:p-4 border-3 shadow-xl rounded-xl hover:bg-blue-500  hover:scale-105 transition duration-500`} >
          {!uploadedFile && <p>Upload QR Code </p>}
          {uploadedFile && (
            <p className="text-white text-sm mt-2">{uploadedFile.name}</p>
          )}
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />


        <Button height="m" width="m" color="green" stringColor="white"
          stringSize="m" onClick={handleSubmit}
        >
          Submit
        </Button>

      </div>

    </div>
  );
};

export default QRCode;