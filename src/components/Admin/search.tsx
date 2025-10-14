import React, { useState } from "react";
import Select from "../selecthbar";
import SearchBar from "../searchbarcomponent.tsx";

function Searchset() {
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="space-x-7">
        <SearchBar  onSearchChange={setKeyword}  />
            <Select
                value={type}
                onChange={setType}
                options={[
                    { value: "", label: "Type" },
                    { value: "tea", label: "Tea" },
                    { value: "coffee", label: "Coffee" },
                    { value: "softdrink", label: "Softdrink" },
                    { value: "maindishes", label: "Maindishes" },
                    { value: "desserts", label: "Desserts" },
                    
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

export default Searchset