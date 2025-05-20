import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8">
            <input
                type="text"
                name="searchTerm"
                placeholder="Search framework..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select
                name="selectedTag"
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Tags</option>
            </select>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {frameworkData.map((item) => (
                    <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                        <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-600">{item.category}</p>
                        <p className="text-gray-600">{item.discountPercentage}</p>  
                        <p className="text-gray-600">{item.category}</p>
                        <p className="text-gray-600">{item.rating}</p>
                        <p className="text-gray-600">{item.stocks}</p>
                        <p className="text-gray-600">{item.brand}</p>
                        <p className="text-blue-500">{item.dimensions.width}</p>
                        <p className="text-blue-500">{item.dimensions.height}</p>
                        <p className="text-blue-500">{item.dimensions.depth}</p>
                        <p className="text-gray-950">$.{item.price}</p>
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