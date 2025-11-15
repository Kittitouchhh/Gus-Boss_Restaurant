import QRCode from "./QrCode"
export default function Paymentpage() {
    return (
        <div className="">
            <div className="mb-1 bg-white h-[750px] grid grids-col-1 md:grid-cols-2">
                <div>
                    <QRCode bgcard="blue" bgtext="blue" amount={100} />
                </div>
            </div>
        </div>

    )
}