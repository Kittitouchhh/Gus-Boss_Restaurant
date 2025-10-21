import React, { useState, useEffect } from "react";
import Select from "../../selecthbar.tsx";
import SearchBar from "../../searchbarcomponent.tsx";

interface SearchsetProps {
  onFilterChange: (filters: { keyword: string; type: string; status: string }) => void;
}
// prop onFilterChange ต้องเป็นฟังก์ชันที่รับอ็อบเจกต์ { keyword, type, status } ทั้งหมดเป็น string
const Searchset: React.FC<SearchsetProps> = ({ onFilterChange }) => {
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        onFilterChange({ keyword, type, status });
    }, [keyword, type, status]);

    return (
        <div className="space-x-7">
            <SearchBar onSearchChange={setKeyword} />
            <Select
                value={type}
                onChange={setType}
                options={[
                    { value: "tea", label: "Tea" },
                    { value: "coffee", label: "Coffee" },
                    { value: "softdrink", label: "Softdrink" },
                    { value: "maindishes", label: "Maindishes" },
                    { value: "desserts", label: "Desserts" },

                ]}
            />
        </div>
    );
}

export default Searchset