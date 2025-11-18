import React, { useState, useEffect } from "react";
import Button from "../../button";
import StatusButton from "../CrudAdmin/statusbutton";
import { Trash2 } from "lucide-react";

export type BannerItem = {
  id: number;
  image: string;
  status: number;
  page: "home" | "post-it";
  order: number;
};

type CardBannerProps = {
  banner?: BannerItem;
  setBanner: React.Dispatch<React.SetStateAction<BannerItem[]>>;
  bannerList: BannerItem[];
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
    order: bannerList.length + 1,
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
    }
  }, [banner]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.image) {
      alert("กรุณาอัปโหลดรูปก่อน");
      return;
    }

    const newItem: BannerItem = {
      id: banner ? banner.id : Date.now(),
      image: form.image,
      status: Number(form.status),
      page: form.page,
      order: Number(form.order),
    };

    setBanner((prev) => {
      const updated = banner
        ? prev.map((b) => (b.id === banner.id ? newItem : b)) 
        : [...prev, newItem];                                 

      localStorage.setItem("banner", JSON.stringify(updated));
      return updated;
    });

    handleReorder?.(newItem.id, newItem.order);

    if (mode === "add") {
      onClose?.();
      return;
    }

    setEditing(false);
  };

  const handleDelete = () => {
    if (!banner) return;
    if (!confirm("ต้องการลบ Banner นี้จริงหรือ?")) return;

    setBanner((prev) => {
      const updated = prev.filter((b) => b.id !== banner.id);
      localStorage.setItem("banner", JSON.stringify(updated));
      return updated;
    });
  };

  if (!editing) {
    return (
      <div className="m-3 pt-3 bg-black h-[90%] cursor-pointer">
        <div className="w-[90%] h-[80%] m-auto overflow-hidden" onClick={() => setEditing(true)}>
          <img
            src={form.image}
            alt="banner"
            className="w-full h-full object-cover hover:scale-105 duration-300"
          />
        </div>

        <div className="h-[15%]   mt-2 flex items-center justify-center">
          {banner && (
            <StatusButton
              type="banner"
              storageKey="banner"
              item={banner}
              setItems={setBanner}
              showLabel={true}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        mode === "add"
          ? "min-w-[100%] h-[91%] m-auto p-4 bg-white rounded-lg shadow-md mb-4"
          : "w-[90%] bg-white rounded-2xl shadow-lg border p-4 m-3"
      }
    >
      <div className="flex flex-col gap-3 h-[80%]">
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

        <div className="flex gap-3 w-full justify-center">
          <select
            value={form.page}
            onChange={(e) => setForm((f) => ({ ...f, page: e.target.value as BannerItem["page"] }))}
            className="border rounded p-1"
          >
            <option value="home">Home</option>
            <option value="post it">Post It</option>
          </select>

          <input
            type="number"
            min={1}
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
            className="border rounded p-1 w-13"
          />

          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: Number(e.target.value) }))}
            className="border rounded p-1"
          >
            <option value={1}>Show</option>
            <option value={0}>Hide</option>
          </select>
        </div>

        <div className="flex justify-between mt-3 ">
          <Button
            height="mk"
            width="mk"
            color="gray"
            stringColor="white"
            stringSize="mk"
            onClick={() => {
              if (mode === "add") return onClose?.();
              setEditing(false);
              banner &&
                setForm({
                  image: banner.image,
                  status: banner.status,
                  page: banner.page,
                  order: banner.order,
                });
            }}
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {banner && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                <Trash2 />
              </button>
            )}
          </div>
          <Button
              height="mk"
              width="mk"
              color="green"
              stringColor="white"
              stringSize="mk"
              onClick={handleSave}
            >
              Save
            </Button>
        </div>
      </div>
    </div>
  );
}
