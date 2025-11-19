import { useState, useEffect } from "react";
import CardBanner from "../../components/Admin/BannerAdmin/CardBanner";
import type { BannerItem } from "../../components/Admin/BannerAdmin/CardBanner";

export default function BannerPage() {
  // เก็บรายการ banner ทั้งหมด
  const [banner, setBanner] = useState<BannerItem[]>([]);
  
  // หน้าแสดงผลปัจจุบัน (home / postit)
  const [activePage, setActivePage] = useState<"home" | "postit">("home");
  
  // เปิด/ปิดการเพิ่ม Banner ใหม่
  const [openAdd, setOpenAdd] = useState(false);

  // โหลดข้อมูลจาก localStorage ครั้งแรกเมื่อเปิดหน้า
  useEffect(() => {
    const savedRaw = localStorage.getItem("banner");
    let saved: BannerItem[] | null = null;

    try {
      saved = savedRaw ? JSON.parse(savedRaw) : null;
    } catch {
      saved = null;
    }

    // normalize ข้อมูลก่อนเซ็ตเข้า state เช่นแก้ชื่อ page และกำหนด order
    const initial: BannerItem[] = (saved || []).map((b: any, i: number) => ({
      ...b,
      page: b.page === "post-it" ? "postit" : b.page, 
      order: b.order ?? i + 1,
    }));

    setBanner(initial);
  }, []);

  // filter ตามหน้าที่เลือก และเรียงตาม order
  const filteredBanner = banner.filter((b) => b.page === activePage).sort((a, b) => a.order - b.order);

  // ฟังก์ชันจัดอันดับใหม่ในกลุ่มหน้าเดียวกัน
  const handleReorder = (id: number, newOrder: number) => {
    setBanner((prev) => {
      // แยก banner ที่เป็นหน้าปัจจุบันและที่หน้าอื่น
      const samePage = prev.filter((b) => b.page === activePage).sort((a, b) => a.order - b.order);
      
      const others = prev.filter((b) => b.page !== activePage);

      const currentIndex = samePage.findIndex((b) => b.id === id);
      if (currentIndex === -1) return prev;

      // นำ item ออกจาก array เดิม
      const [movingItem] = samePage.splice(currentIndex, 1);

      // คำนวณตำแหน่งใหม่ (ป้องกัน index หลุดขอบรายการ)
      const targetIndex = Math.max(0, Math.min(newOrder - 1, samePage.length));
      samePage.splice(targetIndex, 0, movingItem);

      // อัปเดต order ใหม่ตามลำดับ
      const reindexed = samePage.map((b, i) => ({ ...b, order: i + 1 }));
      
      // รวมกลับกับรายการที่หน้าอื่น
      const merged = [...others, ...reindexed];
      
      // บันทึกกลับ localStorage
      localStorage.setItem("banner", JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <div>
      <div className="w-full absolute bg-black px-5 pb-5 my-10">
        <div className="relative flex justify-center items-center gap-3 mt-2 md:mt-5">
          {["home", "postit"].map((p) => (
            <button
              key={p}
              className={`cursor-pointer hover:scale-110 px-5 text-white text-[20px] border-3 shadow-xl duration-300 ${
                activePage === p ? "bg-orange-500 border-orange-600" : "bg-black border-orange-500"
              }`}
              onClick={() => setActivePage(p as any)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-[#2B2420] mt-5">
          <div className="flex justify-center">
            <button className="cursor-pointer hover:scale-103 mt-5 px-6 py-3 bg-orange-500 text-white text-xl rounded-lg shadow-md" onClick={() => setOpenAdd(true)}>
              + Add Banner
            </button>
          </div>

          <div className="grid md:grid-cols-2 p-3">
            {openAdd && (
              <div className="mt-4 px-3">
                <CardBanner setBanner={setBanner} bannerList={filteredBanner} mode="add" onClose={() => setOpenAdd(false)} />
              </div>
            )}

            {filteredBanner.map((b) => (
              <CardBanner key={b.id} banner={b} bannerList={filteredBanner} mode="view" handleReorder={handleReorder} setBanner={setBanner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
