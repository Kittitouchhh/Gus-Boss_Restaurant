import ReactDOM from "react-dom";

type EditMenuProps = {
  open: boolean;
  onClose: () => void;
  position: { x: number; y: number } | null;
};

export default function EditMenu({ open, onClose, position }: EditMenuProps) {


  if (!open || !position) return null;

  return ReactDOM.createPortal(
    <div
      className="z-49 absolute top-0 left-0 w-full h-full"
      onClick={onClose}
    >
      <div
        className="absolute bg-white border border-[#73594A] shadow-xl p-4 rounded-lg 
             opacity-90 w-[100px] h-[90px]"
        style={{ top: position.y - 7, 
                left: position.x - 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="block text-blue-500 w-full text-left">Edit</button>
        <button className="block text-red-500 w-full text-left">Remove</button>
      </div>
    </div>,
    document.body
  );
}
