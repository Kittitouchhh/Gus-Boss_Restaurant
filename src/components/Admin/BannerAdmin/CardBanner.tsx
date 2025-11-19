import React, { useState, useEffect } from "react";
import Button from "../../button";
import StatusButton from "../CrudAdmin/statusbutton";
import { Trash2 } from "lucide-react";

export type BannerItem = {
  id: number;
  image: string;
  status: number;
  page: "home" | "postit";
  order: number;
};
// รับค่าจาก parent
type CardBannerProps = {
  banner?: BannerItem; // ถ้ามีแปลว่าเป็นโหมดแก้ไข
  setBanner: React.Dispatch<React.SetStateAction<BannerItem[]>>; // ฟังก์ชันอัปเดต list ทั้งหมด
  bannerList: BannerItem[]; 
  handleReorder?: (id: number, newOrder: number) => void; // ฟังก์ชันจัดลำดับ
  mode: "view" | "edit" | "add"; // โหมดการใช้งาน
  onClose?: () => void;
};


export default function CardBannerAdmin({
  banner,
  setBanner,
  bannerList,
  handleReorder,
  mode = "view",
  onClose,
}: CardBannerProps) {

  // ถ้ามี banner = ใช้ข้อมูลเดิม, ถ้าไม่มีก็สร้างใหม่พร้อมค่าพวกนี้
  const initial: BannerItem = banner ?? {
    id: Date.now(),
    image: "",
    status: 1,
    page: "home",
    order: bannerList.length + 1,  // ลำดับต่อจากตัวสุดท้าย ดูจาก baner[] item ว่ามีกี่ชิ้นนะจ๊ะ
  };

  // สำหรับโหมดแก้ไข
  const [editing, setEditing] = useState(mode === "add");

  // ไว้ใช้ในฟอร์ม
  const [form, setForm] = useState({
    image: initial.image,
    status: initial.status,
    page: initial.page as BannerItem["page"],
    order: initial.order,
  });

  // banner bannerList เปลี่ยน ก็ อัปเดต
  useEffect(() => {
    if (banner) { 
      setForm({ // ถ้ามี bannerใช้ของเดิมตามนรี้
        image: banner.image,
        status: banner.status,
        page: banner.page,
        order: banner.order,
      });
    } else {
      // add + 1 จะได้ต่อตูด
      setForm((f) => ({ ...f, order: bannerList.length + 1 }));
    }
  }, [banner, bannerList]);

  // อัปโหลดไฟล์เป็น base64 เก็บใน form.image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.image) {
      alert("กรุณาอัปโหลดรูปก่อน");
      return;
    }

    //  เอาค่าform มาสร้าง banner ใหม่
    const newItem: BannerItem = {
      id: banner ? banner.id : Date.now(),
      image: form.image,
      status: Number(form.status),
      page: form.page,
      order: Number(form.order),
    };

    // อัปเดตรายการ banner ทั้งหมดใน state
    setBanner((prev) => {
      // กรณีแก้ไข และย้ายหน้า  ต้องจัดลำดับใหม่ทั้งสองหน้า
      if (banner && banner.page !== newItem.page) {
        

        const withoutOld = prev.filter((p) => p.id !== banner.id);
        
        const targetList = withoutOld.filter((p) => p.page === newItem.page);
       
        const desired = Number(newItem.order) || targetList.length + 1;
        const bounded = Math.max(1, Math.min(desired, targetList.length + 1));
        const itemToInsert = { ...newItem, order: bounded };
        const merged = [...withoutOld, itemToInsert];

        
        const pages = Array.from(new Set(merged.map((m) => m.page)));
        const reindexed = pages.flatMap((p) =>
          merged
            .filter((m) => m.page === p)
            .sort((a, b) => a.order - b.order)
            .map((m, i) => ({ ...m, order: i + 1 }))
        );

        localStorage.setItem("banner", JSON.stringify(reindexed));
        return reindexed;
      }

      // กรณีแก้ไขแต่ไม่เปลี่ยนหน้า
      if (banner) {
        const oldOrder = banner.order;
        const desiredOrder = Number(newItem.order);

        
        const replaced = prev.map((p) => {
          if (p.id === banner.id) return { ...newItem };
          

          if (p.page === newItem.page && p.order === desiredOrder) {
            return { ...p, order: oldOrder };
          }
          return p;
        });

        // reindex ใหม่
        const pages = Array.from(new Set(replaced.map((m) => m.page)));
        const reindexed = pages.flatMap((p) =>
          replaced
            .filter((m) => m.page === p)
            .sort((a, b) => a.order - b.order)
            .map((m, i) => ({ ...m, order: i + 1 }))
        );

        localStorage.setItem("banner", JSON.stringify(reindexed));
        return reindexed;
      }

      // กรณีเพิ่ม banner ใหม่
      const without = [...prev];
      const targetList = without.filter((p) => p.page === newItem.page).sort((a, b) => a.order - b.order);
      
      
      const desired = Number(newItem.order) || targetList.length + 1;
      const insertIndex = Math.max(0, Math.min(desired - 1, targetList.length));
      

      const others = without.filter((p) => p.page !== newItem.page);
      
      const newPageList = [
        ...targetList.slice(0, insertIndex),
        { ...newItem, order: insertIndex + 1 },
        ...targetList.slice(insertIndex),
      ].map((m, i) => ({ ...m, order: i + 1 }));

      const merged = [...others, ...newPageList];
      localStorage.setItem("banner", JSON.stringify(merged));
      return merged;
    });

    // เรียกฟังก์ชัน reorder ถ้ามี
    handleReorder?.(newItem.id, newItem.order);

    if (mode === "add") {
      onClose?.();
      setEditing(false);
      return;
    }

    setEditing(false); //ออกจากโหมดแก้ไข
  };

  const handleDelete = () => {
    if (!banner) return;
    if (!confirm("ต้องการลบ Banner นี้จริงหรือ?")) return;

    setBanner((prev) => {
      const updated = prev.filter((b) => b.id !== banner.id); // ลบออกจากรายการ
    
      const pages = Array.from(new Set(updated.map((m) => m.page)));
      const reindexed = pages.flatMap((p) =>
        updated
          .filter((m) => m.page === p)
          .sort((a, b) => a.order - b.order)
          .map((m, i) => ({ ...m, order: i + 1 }))
      );
      localStorage.setItem("banner", JSON.stringify(reindexed));
      return reindexed;
    });
  };
  
  // ถ้าไม่ได้อยู่ในโหมดแก้ไข  แสดงแบบ view อย่างเดียว กดรนูปเเล้วเป็นเเก้ไข
  if (!editing) {
    return (
      <div className="m-3 pt-3 bg-black h-[90%] cursor-pointer">
        <div className="w-[90%] h-[80%] m-auto overflow-hidden" onClick={() => setEditing(true)}>
          <img src={form.image} alt="banner" className="w-full h-full object-cover hover:scale-105 duration-300" />
        </div>

        <div className="h-[15%] mt-2 flex items-center justify-center">
          {banner && (
            <StatusButton type="banner" storageKey="banner" item={banner} setItems={setBanner} showLabel={true} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={mode === "add" ? "min-w-[100%] h-[91%] m-auto p-4 bg-white rounded-lg shadow-md mb-4" : "w-[90%] bg-white rounded-2xl shadow-lg border p-4 m-3"}>
      <div className="flex flex-col gap-3 h-[100%]">
        <div className="w-full h-[160px] md:h-[80%] bg-gray-200 rounded-lg overflow-hidden">
          {!form.image ? (
            <label className="w-full h-full flex justify-center items-center text-gray-700 cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} />
              UPLOAD IMAGE
            </label>
          ) : (
            <label className="w-full h-full cursor-pointer">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" />
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        <div className="text-black flex gap-3 w-full justify-center">
          <select value={form.page} onChange={(e) => setForm((f) => ({ ...f, page: e.target.value as BannerItem["page"] }))} className="border rounded p-1 text-center ">
            <option value="home">Home</option>
            <option value="postit">Post It</option>
          </select>

          <input type="number" min={1} value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} className="border rounded p-1 w-13 text-center " />

          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: Number(e.target.value) }))} className="border rounded p-1 text-center">
            <option value={1}>Show</option>
            <option value={0}>Hide</option>
          </select>
        </div>

        <div className="flex justify-between mt-3 ">
          <Button height="mk" width="mk" color="gray" stringColor="white" stringSize="mk" onClick={() => { if (mode === "add") return onClose?.(); setEditing(false); banner && setForm({ image: banner.image, status: banner.status, page: banner.page, order: banner.order }); }}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {banner && (
              <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">
                <Trash2 />
              </button>
            )}
          </div>
          <Button height="mk" width="mk" color="green" stringColor="white" stringSize="mk" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
