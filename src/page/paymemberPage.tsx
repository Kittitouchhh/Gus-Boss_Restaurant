import QRCode from "./QrCode"

export default function Paymenmberpage() {
    return (
        <div className="">
            <div className="m-3  ">
                <div className="">
                    <QRCode amount={100} />
                </div>
                </div>

            </div>

    )
}