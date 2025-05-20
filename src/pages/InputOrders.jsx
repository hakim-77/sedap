import React, { useState } from "react";
import orderData from "../JSON/orders.json"; // Misalkan data pesanan berada di file orders.json
import PageHeader from "../components/PageHeader";

export default function OrderForm() {
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedStatus: ""
    });

    const [newOrder, setNewOrder] = useState({
        OrderID: "",
        CustomerName: "",
        Status: "Completed", // Default status
        TotalPrice: "",
        OrderDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Order Added:", newOrder);
        // Reset form setelah submit
        setNewOrder({
            OrderID: "",
            CustomerName: "",
            Status: "Completed",
            TotalPrice: "",
            OrderDate: ""
        });
    };

    const _searchTerm = filters.searchTerm.toLowerCase();
    const statusOptions = ["Completed", "Pending", "Cancelled"];

    const filteredOrders = orderData.filter((order) => {
        const nameMatch = order.CustomerName?.toLowerCase().includes(_searchTerm);
        const orderIDMatch = order.OrderID?.toLowerCase().includes(_searchTerm);
        const statusMatch = filters.selectedStatus ? order.Status === filters.selectedStatus : true;

        return (nameMatch || orderIDMatch) && statusMatch;
    });

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Order Management</h2>
            <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Order List"]}>
                <button className="mr-2 bg-hijau text-white px-4 py-2 rounded-lg">
                    Add Order
                </button>
            </PageHeader>

            <input
                type="text"
                name="searchTerm"
                placeholder="Search by Order ID or Customer Name"
                value={filters.searchTerm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select
                name="selectedStatus"
                value={filters.selectedStatus}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>

            {/* Form Input for New Order */}
            <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-300 rounded">
                <h3 className="text-lg font-semibold mb-4">Add New Order</h3>

                <div className="mb-4">
                    <label htmlFor="OrderID" className="block text-sm font-medium mb-2">Order ID</label>
                    <input
                        type="text"
                        id="OrderID"
                        name="OrderID"
                        value={newOrder.OrderID}
                        onChange={handleOrderChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="CustomerName" className="block text-sm font-medium mb-2">Customer Name</label>
                    <input
                        type="text"
                        id="CustomerName"
                        name="CustomerName"
                        value={newOrder.CustomerName}
                        onChange={handleOrderChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Status" className="block text-sm font-medium mb-2">Status</label>
                    <select
                        id="Status"
                        name="Status"
                        value={newOrder.Status}
                        onChange={handleOrderChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="TotalPrice" className="block text-sm font-medium mb-2">Total Price</label>
                    <input
                        type="number"
                        id="TotalPrice"
                        name="TotalPrice"
                        value={newOrder.TotalPrice}
                        onChange={handleOrderChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="OrderDate" className="block text-sm font-medium mb-2">Order Date</label>
                    <input
                        type="date"
                        id="OrderDate"
                        name="OrderDate"
                        value={newOrder.OrderDate}
                        onChange={handleOrderChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Order</button>
            </form>

            {/* Table for Orders */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Order ID</th>
                            <th className="p-2 border">Customer Name</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Total Price</th>
                            <th className="p-2 border">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.OrderID} className="hover:bg-gray-50">
                                <td className="p-2 border">{order.OrderID}</td>
                                <td className="p-2 border">{order.CustomerName}</td>
                                <td className="p-2 border">{order.Status}</td>
                                <td className="p-2 border">{order.TotalPrice}</td>
                                <td className="p-2 border">{order.OrderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No matching orders found.</p>
                )}
            </div>
        </div>
    );
}
