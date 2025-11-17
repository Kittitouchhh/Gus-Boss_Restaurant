import type { BannerProps } from "../../../page/pagesAdmin/BannerPage";
import StatusButton from "../CrudAdmin/statusbutton";

type CardBannerProps = {
  banner: BannerProps;
  setBanner: React.Dispatch<React.SetStateAction<BannerProps[]>>;
};

export default function CardBanner({ banner, setBanner }: CardBannerProps) {
  return (
    <div className="flex justify-between ml-5 bg-[#fba542] w-270 items-center">
      <div className="w-120 h-50 m-2 overflow-hidden">
        <img className="shadow-2xl object-fill" src={banner.image} alt="banner" />
      </div>

      <div className="mr-25 bg-black w-120 flex justify-center">
        <StatusButton item={banner}setItems={setBanner}storageKey="banner"/>
      </div>
    </div>
  );
}
