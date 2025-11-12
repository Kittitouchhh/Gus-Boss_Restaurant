import React from "react";

interface SearchBarProps {
  onSearchChange: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearchChange(e.target.value)}
      className="px-3 py-2 border rounded-md w-[200px] md:w-[350px] focus:outline-none bg-white "
    />
  );
};

export default SearchBar;
