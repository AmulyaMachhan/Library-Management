import { useState } from "react";
import {
  useGetAllBooksQuery,
  //   useGetAllBooksQuery,
  //   useGetBooksByNameQuery,
  //   useGetBooksByRentQuery,
} from "../../redux/api/bookApiSlice";
import Loader from "../Others/Loader";
import BookItem from "./BookItem";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [category, setCategory] = useState("");

  // Use global search if filters are provided
  const { data: books, error, isLoading } = useGetAllBooksQuery();

  const handleSearch = () => {
    // Trigger the search API based on the current state
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-700">
        <p className="text-lg font-semibold">Error fetching Books.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Books List
          </h1>
          <div className="flex items-center px-3 py-1 gap-2 font-[600] text-blue-600 bg-[#edf2f8] border border-[#60aaf0] rounded-3xl">
            <span>{books?.length} Books</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore and manage your Books below.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            placeholder="Min Rent"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            placeholder="Max Rent"
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            {/* Add more categories as needed */}
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
