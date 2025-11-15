import React from "react";

export interface QRCodeProps {
  amount: number;
  bgcard: "blue"  | "brown" ;
  bgtext: "blue"  | "brown"
}

const QRCode: React.FC<QRCodeProps> = ({ amount, bgcard, bgtext }) => {
  const promptpayId = "0813996955";
  const qrCodeUrl = `https://promptpay.io/${promptpayId}/${amount}`;
  
  const bgcolor = 
  bgcard === "blue" ? "bg-blue-800"
  : bgcard === "brown" ? "bg-{#4B2E05}" /* เผื่อบอสอยากมาเปลี่ยน */
  : "bg-{#4B2E05}";

  const bgfont = 
  bgtext === "blue" ? "bg-blue-500":
  bgcard === "brown" ? "bg-{#4B2E05}": 
  "bg-{#4B2E05}";
  
  return (
    <div className={`h-full max-w-[700px] mx-auto ${bgcolor}`}>
      <div className="flex flex-col justify-center items-center">
        <p className={`mt-15 text-center text-[50px] text-white ${bgfont} w-full`}>
          PAYMENT
        </p>
        <img src="" alt="" />

        <div className="mt-5 flex gap-1 text-white">
          <p className="">ชื่อผู้รับ :</p>
          <p className="">
          นายกิตติธัช สกุลศักดิ์พินิจ
        </p>
        </div>
        <div className="flex gap-1 text-white">
          <p className="">
          Promptpay id : 
          </p>
          <p className="">
           081 399 6955 
          </p>
        </div>
        <p className="hover:mt-2 text-white text-[25px] bg-black w-full text-center">
          จำนวน: {amount.toLocaleString()} บาท
        </p>
        <img
          src={qrCodeUrl}
          alt="PromptPay QR Code"
          className="w-64 h-64 mt-5"
        />
        
      </div>
      <div>

      </div>

    </div>
  );
};

export default QRCode;