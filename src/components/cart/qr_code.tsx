import React from "react";

interface QRCodeProps {
  amount: number;
}

const QRCodeStatic: React.FC<QRCodeProps> = ({ amount }) => {
  const promptpayId = "0909105195";
  const qrCodeUrl = `https://promptpay.io/${promptpayId}/${amount}`;

  return (
    <div className=" p-4 rounded-2xl w-auto h-auto flex flex-col items-center">
      <img
        src={qrCodeUrl}
        alt="PromptPay QR Code"
        className="w-full h-full object-contain"
      />
      <p className="text-white mt-2 md:text-lg text-[10px] font-medium">
        จำนวน: {amount.toLocaleString()} บาท
      </p>
    </div>
  );
};

export default QRCodeStatic;