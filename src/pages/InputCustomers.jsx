import { useState } from "react";
import customerData from "../JSON/customers.json";
import PageHeader from "../components/PageHeader";

export default function Customers() {
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedLoyalty: ""
    });

    const [newCustomer, setNewCustomer] = useState({
        CustomerName: "",
        Email: "",
        Phone: "",
        Loyalty: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Example of how you can handle adding a new customer:
        // This could involve sending the data to a server or updating state
        console.log("New Customer Added:", newCustomer);
        // Reset form after submission
        setNewCustomer({
            CustomerName: "",
            Email: "",
            Phone: "",
            Loyalty: ""
        });
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
                <button className="mr-2 bg-hijau text-white px-4 py-2 rounded-lg">
                    Add Customer
                </button>
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

            {/* Form Input for New Customer */}
            <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-300 rounded">
                <h3 className="text-lg font-semibold mb-4">Add New Customer</h3>

                <div className="mb-4">
                    <label htmlFor="CustomerName" className="block text-sm font-medium mb-2">Customer Name</label>
                    <input
                        type="text"
                        id="CustomerName"
                        name="CustomerName"
                        value={newCustomer.CustomerName}
                        onChange={handleCustomerChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={newCustomer.Email}
                        onChange={handleCustomerChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Phone" className="block text-sm font-medium mb-2">Phone</label>
                    <input
                        type="tel"
                        id="Phone"
                        name="Phone"
                        value={newCustomer.Phone}
                        onChange={handleCustomerChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Loyalty" className="block text-sm font-medium mb-2">Loyalty Level</label>
                    <select
                        id="Loyalty"
                        name="Loyalty"
                        value={newCustomer.Loyalty}
                        onChange={handleCustomerChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Loyalty Level</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Customer</button>
            </form>

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
