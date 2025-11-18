import type { BannerProps } from "../../../page/pagesAdmin/BannerPage";
import StatusButton from "../CrudAdmin/statusbutton";

type CardBannerProps = {
  banner: BannerProps;
  setBanner: React.Dispatch<React.SetStateAction<BannerProps[]>>;
};

export default function CardBanner({ banner, setBanner }: CardBannerProps) {
  return (
    <div className=" m-3 pt-3 bg-black">
      <div className="w-[90%] m-auto">
        <img className="" src={banner.image} alt="banner" />
      </div>

      <div className="mt-2 flex items-center justify-center">
        <StatusButton item={banner}setItems={setBanner}storageKey="banner"/>
      </div>
    </div>
  );
}
