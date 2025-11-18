function Savebuttons() {
  return (
    <div className="flex justify-end gap-10 mt-4">
      <button className="duration-500 hover:scale-105 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      <button className="duration-500 hover:scale-105 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}

export default Savebuttons