import { useState } from "react";
import customerData from "../JSON/customers.json";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Customers() {
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedLoyalty: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const _searchTerm = filters.searchTerm.toLowerCase();
    const loyaltyOptions = [...new Set(customerData.map(c => c.Loyalty))];

    const filteredCustomers = customerData.filter((c) => {
        const nameMatch = c.CustomerName?.toLowerCase().includes(_searchTerm);
        const emailMatch = c.Email?.toLowerCase().includes(_searchTerm);
        const loyaltyMatch = filters.selectedLoyalty ? c.Loyalty === filters.selectedLoyalty : true;

        return (nameMatch || emailMatch) && loyaltyMatch;
    });

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Customer Table</h2>
            <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Order List"]}>
                <Link
                    to="/AddCustomers"
                    className="mt-6 inline-block bg-hijau text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition-all duration-300"
                >
                    Add Customer
                </Link>
            </PageHeader>

            <input
                type="text"
                name="searchTerm"
                placeholder="Search by name or email"
                value={filters.searchTerm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select
                name="selectedLoyalty"
                value={filters.selectedLoyalty}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Loyalty Levels</option>
                {loyaltyOptions.map((loyalty) => (
                    <option key={loyalty} value={loyalty}>
                        {loyalty}
                    </option>
                ))}
            </select>



            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Customer ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((c) => (
                            <tr key={c.CustomerID} className="hover:bg-gray-50">
                                <td className="p-2 border">{c.CustomerID}</td>
                                <td className="p-2 border">{c.CustomerName}</td>
                                <td className="p-2 border">{c.Email}</td>
                                <td className="p-2 border">{c.Phone}</td>
                                <td className="p-2 border">{c.Loyalty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCustomers.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No matching customers found.</p>
                )}
            </div>
        </div>
    );
}
