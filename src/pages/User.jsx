import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// --- Constants ---
const ITEMS_PER_PAGE = 10;
const API_URL = 'https://dummyjson.com/users';

// --- Icons --- (Using simple text/emoji for brevity, replace with SVG components if preferred)
const EditIcon = () => <span title="Edit">✏️</span>;
const DeleteIcon = () => <span title="Delete">🗑️</span>;
const AddIcon = () => <span title="Add User">➕</span>;
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

// --- Initial Form State ---
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  age: '',
};

function ListUsers() {
  // --- State Variables ---
  const [allUsers, setAllUsers] = useState([]); // All users from API
  const [loading, setLoading] = useState(true); // Initial page load
  const [error, setError] = useState(''); // General fetch error
  const [currentPage, setCurrentPage] = useState(1); // Pagination

  // State for Modal and Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null for Add, user object for Edit
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [modalError, setModalError] = useState(''); // Error specific to the modal form

  // --- Fetch Initial Data ---
  const fetchUsers = useCallback(() => {
      setLoading(true);
      setError('');
      axios
        .get(API_URL)
        .then((response) => {
          const userData = response.data?.users ?? []; // Use nullish coalescing
          setAllUsers(userData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Fetch Error:", err);
          setError(`Failed to fetch users. ${err.message || 'Please try again later.'}`);
          setLoading(false);
        });
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Fetch users on mount

  // --- PaginatiFn Logic ---
  const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = allUsers.slice(startIndex, endIndex);

  // --- Modal Handlers ---
  const openModalForAdd = () => {
    setEditingUser(null);
    setFormData(initialFormData); // Reset form for adding
    setModalError('');
    setIsModalOpen(true);
  };

  const openModalForEdit = (user) => {
    setEditingUser(user);
    // Pre-fill form with existing user data (only fields present in initialFormData)
    const fieldsToEdit = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = user[key] ?? ''; // Use existing value or empty string
        return acc;
      }, {});
    setFormData(fieldsToEdit);
    setModalError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData(initialFormData);
    setModalError('');
    setIsSubmitting(false); // Reset submitting state on close
  };

  // --- Form Input Handler ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- CRUD Operations ---

  // Handle Form Submission (Add or Update)
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setModalError('');

    const url = editingUser ? `${API_URL}/${editingUser.id}` : `${API_URL}/add`;
    const method = editingUser ? 'put' : 'post';
    // DummyJSON needs 'Content-Type' header
    const config = { headers: { 'Content-Type': 'application/json' } };

    axios[method](url, JSON.stringify(formData), config)
      .then(response => {
        const returnedUser = response.data;

        if (editingUser) {
          // UPDATE: Replace the old user data with the updated data in local state
          setAllUsers(prevUsers =>
            prevUsers.map(u => (u.id === editingUser.id ? { ...u, ...returnedUser } : u))
          );
          // console.log("Simulated Update Response:", returnedUser);
        } else {
          // ADD: Add the new user to the beginning of the local state
           // IMPORTANT: DummyJSON add endpoint might return the input data + a new ID.
           // Make sure the structure matches your state.
           // If it returns just the ID, you might need to merge formData + new ID.
          setAllUsers(prevUsers => [returnedUser, ...prevUsers]);
          // console.log("Simulated Add Response:", returnedUser);
           // Optional: Go to first page after adding
           setCurrentPage(1);
        }
        closeModal();
        // Consider adding a success notification here (e.g., using react-toastify)
      })
      .catch(err => {
        console.error(`API ${method.toUpperCase()} Error:`, err.response || err);
        setModalError(`Failed to ${editingUser ? 'update' : 'add'} user. ${err.response?.data?.message || err.message || 'Please try again.'}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handle Delete
  const handleDelete = (userId) => {
    // Simple confirmation
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}? This action cannot be undone.`)) {
      // Optionally, add a specific loading state for the row being deleted
      axios.delete(`${API_URL}/${userId}`)
        .then(response => {
           // console.log("Simulated Delete Response:", response.data);
          // DELETE: Remove the user from local state
          setAllUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
          // Consider adding a success notification here

          // Adjust page if the deleted user was the last one on the current page
           const newTotalPages = Math.ceil((allUsers.length - 1) / ITEMS_PER_PAGE);
           if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
           } else if (allUsers.length - 1 === 0) { // Handle case where last user is deleted
                setCurrentPage(1);
           }
        })
        .catch(err => {
          console.error("API DELETE Error:", err);
          // Display error to the user (e.g., using a toast notification)
          alert(`Failed to delete user. ${err.message || 'Please try again.'}`);
        });
    }
  };


  // --- Pagination Handlers ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };


  // --- Render Logic ---

  if (loading) {
    // ... (Loading component remains the same)
     return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="ml-4 text-lg font-semibold text-gray-600">Loading Users...</p>
        </div>
      );
  }

  if (error) {
    // ... (Error component remains the same)
     return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md" role="alert">
          <p className="font-bold text-lg mb-2">Oops! Something went wrong.</p>
          <p>{error}</p>
           <button onClick={fetchUsers} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Try Again
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Users Management
          </h2>
          <button
            onClick={openModalForAdd}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <AddIcon />
            <span className="ml-2">Add New User</span>
          </button>
        </div>


        {/* Kontainer Tabel */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
           <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-50 via-gray-50 to-indigo-50">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-center text-xs font-semibold text-indigo-800 uppercase tracking-wider w-16">ID</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Username</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3.5 text-center text-xs font-semibold text-indigo-800 uppercase tracking-wider">Age</th>
                   {/* --- Action Column Header --- */}
                  <th scope="col" className="px-6 py-3.5 text-center text-xs font-semibold text-indigo-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className={`transition duration-150 ease-in-out ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-100`}>
                    <td className="px-4 py-4 whitespace-nowrap text-center align-middle text-sm font-medium text-gray-600">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle text-sm text-indigo-600">@{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle text-sm text-gray-700">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center align-middle">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.age < 30 ? 'bg-green-100 text-green-800' : user.age < 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {user.age} yrs
                      </span>
                    </td>
                    {/* --- Action Column Cells --- */}
                    <td className="px-6 py-4 whitespace-nowrap text-center align-middle text-sm font-medium space-x-3">
                       <button
                          onClick={() => openModalForEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                          aria-label={`Edit ${user.firstName}`}
                       >
                           <EditIcon />
                       </button>
                       <button
                           onClick={() => handleDelete(user.id)}
                           className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                           aria-label={`Delete ${user.firstName}`}
                       >
                           <DeleteIcon />
                       </button>
                    </td>
                  </tr>
                ))}

                {currentUsers.length === 0 && !loading && (
                  <tr>
                    {/* --- Adjusted ColSpan --- */}
                    <td colSpan="7" className="px-6 py-16 text-center text-gray-500 italic">
                      {allUsers.length === 0 ? "No users found to display." : "No users on this page."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Pagination Controls --- */}
         {totalPages > 1 && (
           <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
             <div className="text-sm text-gray-600">
                 Showing <span className="font-semibold text-gray-800">{currentUsers.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-semibold text-gray-800">{Math.min(endIndex, allUsers.length)}</span> of <span className="font-semibold text-gray-800">{allUsers.length}</span> results
             </div>
              {/* ... (Pagination buttons remain the same) ... */}
             <div className="inline-flex items-center space-x-2 rounded-md shadow-sm border border-gray-300 bg-white p-1">
                 <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center justify-center px-3 py-1.5 rounded-l-md text-sm font-medium transition ease-in-out duration-150 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500'}`}
                    aria-label="Previous Page"
                 >
                   <ChevronLeftIcon />
                   <span className="ml-1 hidden sm:inline">Prev</span>
                 </button>
                 <span className="px-4 py-1.5 text-sm font-medium text-gray-700 border-l border-r border-gray-300">
                   {currentPage} / {totalPages}
                 </span>
                 <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center justify-center px-3 py-1.5 rounded-r-md text-sm font-medium transition ease-in-out duration-150 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500'}`}
                    aria-label="Next Page"
                 >
                   <span className="mr-1 hidden sm:inline">Next</span>
                   <ChevronRightIcon />
                 </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Add/Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>

            {modalError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Example Input: First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Example Input: Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Add other inputs similarly (email, phone, username, age) */}
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" name="age" id="age" value={formData.age} onChange={handleInputChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>


              {/* Form Actions */}
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Saving...' : (editingUser ? 'Update User' : 'Add User')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListUsers;