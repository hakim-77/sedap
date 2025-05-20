import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import orderData from "../JSON/orders.json"; // Pastikan Anda memiliki file orders.json
import { Link } from "react-router-dom";

export default function Orders() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedStatus: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const _searchTerm = filters.searchTerm.toLowerCase();
  const statusOptions = [...new Set(orderData.map(order => order.Status))];

  // Filter orders based on search term and selected status
  const filteredOrders = orderData.filter((order) => {
    const nameMatch = order.CustomerName?.toLowerCase().includes(_searchTerm);
    const orderIDMatch = order.OrderID?.toLowerCase().includes(_searchTerm);
    const statusMatch = filters.selectedStatus ? order.Status === filters.selectedStatus : true;

    return (nameMatch || orderIDMatch) && statusMatch;
  });

  // Stats
  const totalOrders = filteredOrders.length;
  const totalCompleted = filteredOrders.filter(order => order.Status === "Completed").length;
  const totalPending = filteredOrders.filter(order => order.Status === "Pending").length;
  const totalCancelled = filteredOrders.filter(order => order.Status === "Cancelled").length;
  const totalRevenue = filteredOrders.filter(order => order.Status === "Completed").reduce((acc, order) => acc + order.TotalPrice, 0);

  return (
    <div id="dashboard-container" className="p-8">
        <h2 className="text-xl font-bold mb-4">Order Table</h2>
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Order List"]}>
      <Link
                    to="/AddOrders"
                    className="mt-6 inline-block bg-hijau text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition-all duration-300"
                >
                    Add Order
                </Link>
      </PageHeader>

      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by name or order ID"
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
      </div>

      {/* Orders Table */}
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
                <td className="p-2 border">{`Rp. ${order.TotalPrice.toLocaleString()}`}</td>
                <td className="p-2 border">{new Date(order.OrderDate).toLocaleDateString()}</td>
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
