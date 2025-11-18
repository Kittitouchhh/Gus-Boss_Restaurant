import { useState, useEffect } from "react";
import BannerData from "../../data/BannerItem.json";

import CardBanner from "../../components/Admin/BannerAdmin/CardBanner";
import type { BannerItem } from "../../components/Admin/BannerAdmin/CardBanner";

export type BannerProps = BannerItem;

export default function BannerPage() {
  const [banner, setBanner] = useState<BannerProps[]>([]);
  const [activePage, setActivePage] =
    useState<"home" | "client" | "menu">("home");
  const [openAdd, setOpenAdd] = useState(false);


  useEffect(() => {
    const savedRaw = localStorage.getItem("banner");
    let saved = null;
    try {
      saved = JSON.parse(savedRaw || "null");
    } catch (e) {
      saved = null;
    }

    const initial: BannerProps[] = (saved || BannerData).map(
      (b: any, i: number) => ({
        ...b,
        order: b.order ?? i + 1,
      })
    );

    setBanner(initial);
  }, []);


  const filteredBanner = banner
    .filter((b) => b.page === activePage)
    .sort((a, b) => a.order - b.order);


  const handleReorder = (id: number, newOrder: number) => {
    setBanner((prev) => {

      const samePage = prev.filter((b) => b.page === activePage);
      const others = prev.filter((b) => b.page !== activePage);

      const target = samePage.find((b) => b.id === id);
      if (!target) return prev;

      const oldOrder = target.order;
      if (oldOrder === newOrder) return prev;

      const updated = samePage.map((b) => {
        if (b.id === id) return { ...b, order: newOrder };

        if (b.order === newOrder) return { ...b, order: oldOrder };

        return b;
      });

      const merged = [...others, ...updated].sort((a, b) => a.order - b.order);

      localStorage.setItem("banner", JSON.stringify(merged));

      return merged;
    });
  };

  return (
    <div>
      <div className="w-full  absolute bg-black px-5 pb-5 my-10">
        <div className="relative flex justify-center items-center  gap-3 mt-2 md:mt-5">
          {["home", "client", "menu"].map((p) => (
            <button
              key={p}
              className={`cursor-pointer hover:scale-110 px-5 text-white text-[20px] border-3 shadow-xl duration-300 
                ${activePage === p
                  ? "bg-orange-500 border-orange-600"
                  : "bg-black border-orange-500"
                }`}
              onClick={() => setActivePage(p as any)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-[#2B2420] mt-5">

          <div className="flex justify-center ">
            <button
              className="cursor-pointer hover:scale-103 mt-5 px-6 py-3 bg-orange-500 text-white text-xl rounded-lg shadow-md"
              onClick={() => setOpenAdd(true)}
            >
              + Add Banner
            </button>
          </div>

          <div className="grid md:grid-cols-2 p-3">
            {openAdd && (
              <div className="mt-4 px-3">
                <CardBanner
                  setBanner={setBanner}
                  bannerList={filteredBanner as BannerItem[]}
                  mode="add"
                  onClose={() => setOpenAdd(false)}
                />
              </div>
            )}

            {filteredBanner.map((b) => (
              <CardBanner
                key={b.id}
                banner={b as BannerItem}
                bannerList={filteredBanner as BannerItem[]}
                mode="view"
                handleReorder={handleReorder}
                setBanner={setBanner}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
