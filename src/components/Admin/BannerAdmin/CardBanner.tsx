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

type CardBannerProps = {
  banner?: BannerItem;
  setBanner: React.Dispatch<React.SetStateAction<BannerItem[]>>;
  bannerList: BannerItem[]; // items on current active page (filtered)
  handleReorder?: (id: number, newOrder: number) => void;
  mode: "view" | "edit" | "add";
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
  const initial: BannerItem = banner ?? {
    id: Date.now(),
    image: "",
    status: 1,
    page: "home",
    order: bannerList.length + 1, // default to end of current page list
  };

  const [editing, setEditing] = useState(mode === "add");
  const [form, setForm] = useState({
    image: initial.image,
    status: initial.status,
    page: initial.page as BannerItem["page"],
    order: initial.order,
  });

  useEffect(() => {
    if (banner) {
      setForm({
        image: banner.image,
        status: banner.status,
        page: banner.page,
        order: banner.order,
      });
    } else {
      // if switching to add mode ensure order defaults to bannerList length+1
      setForm((f) => ({ ...f, order: bannerList.length + 1 }));
    }
  }, [banner, bannerList]);

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

    // prepare new item (note: order may be adjusted below)
    const newItem: BannerItem = {
      id: banner ? banner.id : Date.now(),
      image: form.image,
      status: Number(form.status),
      page: form.page,
      order: Number(form.order),
    };

    setBanner((prev) => {
      // if editing existing and page changed => remove from old page then append to target page
      if (banner && banner.page !== newItem.page) {
        // remove old
        const withoutOld = prev.filter((p) => p.id !== banner.id);
        // items already on target page
        const targetList = withoutOld.filter((p) => p.page === newItem.page);
        // assign order: if user set an order, use it (bounded), otherwise put at end
        const desired = Number(newItem.order) || targetList.length + 1;
        const bounded = Math.max(1, Math.min(desired, targetList.length + 1));
        const itemToInsert = { ...newItem, order: bounded };
        const merged = [...withoutOld, itemToInsert];

        // reindex per page so orders become consecutive starting 1
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

      // if editing existing and same page => replace and swap if collision
      if (banner) {
        const oldOrder = banner.order;
        const desiredOrder = Number(newItem.order);

        // apply replace + swap logic
        const replaced = prev.map((p) => {
          if (p.id === banner.id) return { ...newItem };
          // if another item has desired order on same page -> swap to oldOrder
          if (p.page === newItem.page && p.order === desiredOrder) {
            return { ...p, order: oldOrder };
          }
          return p;
        });

        // ensure no duplicates in ordering for that page (sort + normalize)
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

      // add new item (mode === "add")
      // if user specified order, insert at that index in that page; otherwise append
      const without = [...prev];
      const targetList = without.filter((p) => p.page === newItem.page).sort((a, b) => a.order - b.order);
      const desired = Number(newItem.order) || targetList.length + 1;
      const insertIndex = Math.max(0, Math.min(desired - 1, targetList.length));
      // remove items of same page from main list temporarily
      const others = without.filter((p) => p.page !== newItem.page);
      // build new page list with inserted item
      const newPageList = [
        ...targetList.slice(0, insertIndex),
        { ...newItem, order: insertIndex + 1 },
        ...targetList.slice(insertIndex),
      ].map((m, i) => ({ ...m, order: i + 1 }));

      const merged = [...others, ...newPageList];
      localStorage.setItem("banner", JSON.stringify(merged));
      return merged;
    });

    // call handleReorder if parent provided (keeps parent-side reactions)
    handleReorder?.(newItem.id, newItem.order);

    if (mode === "add") {
      onClose?.();
      setEditing(false);
      return;
    }

    setEditing(false);
  };

  const handleDelete = () => {
    if (!banner) return;
    if (!confirm("ต้องการลบ Banner นี้จริงหรือ?")) return;

    setBanner((prev) => {
      const updated = prev.filter((b) => b.id !== banner.id);
      // reindex pages to keep orders consecutive
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
