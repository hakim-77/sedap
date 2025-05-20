import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
        /*Tambah state lain beserta default value*/
    });

    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.description
                .toLowerCase()
                .includes(_searchTerm);

        const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;

        return matchesSearch && matchesTag;
    });
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };
    return (
        <div className="p-8">
            <input
                type="text"
                // name="searchTerm"
                placeholder="Search framework..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
                // onChange={(e) => setSearchTerm(e.target.value)}
                value={dataForm.searchTerm}
                name="searchTerm"
                onChange={handleChange}
            />

            <select
                // name="selectedTag"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                // onChange={(e) => setSelectedTag(e.target.value)}
                value={dataForm.selectedTag}
                name="selectedTag"
                onChange={handleChange}
            >
                <option value="">All Tags</option>
                {allTags.map((tag, index) => (
                    <option key={index} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-3 md:grid-cols-4">
                {filteredFrameworks.map((item) => (
                    <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                        <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <a className="text-blue-900" href={item.details.officialWebsite}>Visit Website</a>
                        <p className="text-blue-500">{item.details.developer}</p>
                        <p>{item.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2">
                                {tag}
                            </span>
                        ))}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}