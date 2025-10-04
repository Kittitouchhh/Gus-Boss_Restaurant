import React, { useState } from "react";
import Select from "../selecthbar";
import SearchBar from "../searchbarcomponent.tsx";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="flex space-x-2">
        <SearchBar onSearchChange={setKeyword} />
            <Select
                value={type}
                onChange={setType}
                options={[
                    { value: "", label: "Type" },
                    { value: "tea", label: "Tea" },
                    { value: "coffee", label: "Coffee" },
                ]}
            />
            <Select
                value={status}
                onChange={setStatus}
                options={[
                    { value: "", label: "Status" },
                    { value: "Available", label: "Available" },
                    { value: "Sold Out", label: "Sold Out" },
                ]}
            />
        </div>
    );
}
