import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

interface Props {
  folder?: string;
  onUploaded?: (url: string) => void;
  label?: string;
}

// ✅ forwardRef เพื่อให้ component อื่นเรียกฟังก์ชันภายในได้
const ImageUploader = forwardRef((props: Props, ref) => {
  const { folder, onUploaded, label } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      if (onUploaded) onUploaded(url);
    } catch {
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ให้ component ภายนอกสามารถเรียก input.click() ได้
  useImperativeHandle(ref, () => ({
    openFileDialog: () => inputRef.current?.click(),
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      {label && <p>{label}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {loading && <p>Uploading...</p>}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-[120px] h-[120px] rounded-lg object-cover mt-2"
        />
      )}
    </div>
  );
});

export default ImageUploader;
