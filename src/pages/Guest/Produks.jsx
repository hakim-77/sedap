import { useEffect, useState } from "react";

export default function Produks() {
    const [produkData, setProdukData] = useState([]);

    useEffect(() => {
        fetch("./Guest/produks.json")
            .then((res) => res.json())
            .then((data) => setProdukData(data))
            .catch((err) => console.error("Error loading JSON:", err));
    }, []);
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedKode: ""
    });

    const handleChange = (p) => {
        const { name, value } = p.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const KodeOptions = [...new Set(produkData.map(p => p.KodeProduk))];

    const filteredProduk = produkData.filter((p) => {
        const searchTerm = filters.searchTerm.toLowerCase();
        const namaMatch = p.NamaProduk.toLowerCase().includes(searchTerm);
        const kodeMatch = filters.selectedKode ? p.KodeProduk === filters.selectedKode : true;

        return namaMatch && kodeMatch;
    });
    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Customer Table</h2>
            <select
                name="selectedKode"
                value={filters.selectedKode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Loyalty Levels</option>
                {KodeOptions.map((KodeProduk) => (
                    <option key={KodeProduk} value={KodeProduk}>
                        {KodeProduk}
                    </option>
                ))}
            </select>



            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Kode Produk</th>
                            <th className="p-2 border">Nama Produk</th>
                            <th className="p-2 border">Harga</th>
                            <th className="p-2 border">Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProduk.map((p) => (
                            <tr key={p.KodeProduk} className="hover:bg-gray-50">
                                <td className="p-2 border">{p.KodeProduk}</td>
                                <td className="p-2 border">{p.NamaProduk}</td>
                                <td className="p-2 border">{p.Harga}</td>
                                <td className="p-2 border">{p.Stok}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProduk.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No matching Produk found.</p>
                )}
            </div>
        </div>
    )
}