import React from "react";

export interface QRCodeProps {
  amount: number;
  bgcard: "blue" | "brown";
  bgtext: "blue" | "brown"
}

const QRCode: React.FC<QRCodeProps> = ({ amount, bgcard, bgtext }) => {
  const promptpayId = "0813996955";
  const qrCodeUrl = `https://promptpay.io/${promptpayId}/${amount}`;

  const bgcolor =
    bgcard === "blue" ? "bg-blue-800"
      : bgcard === "brown" ? "bg-{#4B2E05}" /* เผื่อบอสอยากมาเปลี่ยน */
        : "bg-{#4B2E05}";

  const bgfont =
    bgtext === "blue" ? "bg-blue-500" :
      bgcard === "brown" ? "bg-{#4B2E05}" :
        "bg-{#4B2E05}";

  return (
    <div className={`h-full max-w-[700px] mx-auto ${bgcolor}`}>
      <div className="flex flex-col justify-center items-center">
        <p className={`mt-15 text-center text-[50px] text-white ${bgfont} w-full`}>
          PAYMENT
        </p>

        <div className="mt-5  gap-1 text-white">
          <div>
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


        <p className="mt-3 hover:mt-2 text-white text-[25px] bg-black w-full text-center">
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