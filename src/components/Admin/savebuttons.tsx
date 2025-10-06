import React from "react";

function Savebuttons() {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}

export default Savebuttons