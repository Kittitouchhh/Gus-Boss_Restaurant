import React, { useState } from "react";

interface SearchBarProps {
  color?: "white" | "cream" ;
  placeholder?: string;
  onSearchChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  color = "cream",
  placeholder = "Search...",
  onSearchChange,
}) => {
  let bgClass = "";
    if (color === "cream") bgClass = "bg-[#EEDBC4]";
    else if (color === "white") bgClass = "bg-[#ffffff]";

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value); // ส่งค่าออกไปให้ parent ถ้ามี
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={` ${bgClass} border  rounded-[10px] px-3 py-3  text-black w-[350px] bg-#EEDBC4`}
    />
  );
};

export default SearchBar;
