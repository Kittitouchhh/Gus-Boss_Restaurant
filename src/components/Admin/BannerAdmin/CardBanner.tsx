import type { BannerItem } from "../../../page/pagesAdmin/BannerPage";
import Bannerstatus from "./BannerStatus";

type CardBannerProps = {
    banner: BannerItem;
}

export default function CardBanner({ banner }: CardBannerProps) {
    return (
        <>
            <div className="" >
                <div className="flex justify-between ml-5 bg-[#fba542] w-270  flex items-center">
                    <div className="w-120 h-50 m-2  overflow-hidden ">
                        <img className="shadow-2xl object-fill" src={banner.image} alt="banner" />
                    </div>
                    <div  className="mr-25 bg-black w-120 justify-center flex " >
                        <Bannerstatus />
                    </div>
                </div>
            </div>
        </>
    )
}