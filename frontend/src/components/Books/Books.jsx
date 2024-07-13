import { useEffect, useState } from "react";
import {
  useGetAllBooksQuery,
  useGetBooksByNameQuery,
  useGetBooksByRentQuery,
} from "../../redux/api/bookApiSlice";
import { Range } from "react-range";
import Loader from "../Others/Loader";
import BookItem from "./BookItem";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../redux/features/bookSlice";

const MIN = 0;
const MAX = 20;

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rentRange, setRentRange] = useState([MIN, MAX]);
  const [category, setCategory] = useState("");

  const { booksList } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  // Fetch all books
  const {
    data: allBooks,
    error: allBooksError,
    isLoading: isLoadingAllBooks,
  } = useGetAllBooksQuery();

  // Fetch filtered books by rent
  const {
    data: filteredBooksByRent,
    error: rentError,
    isLoading: isLoadingRent,
  } = useGetBooksByRentQuery({
    min: rentRange[0],
    max: rentRange[1],
  });

  // Fetch filtered books by name
  const {
    data: filteredBooksByName,
    error: nameError,
    isLoading: isLoadingName,
  } = useGetBooksByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  // Determine which books to display
  const books = searchTerm
    ? filteredBooksByName
    : filteredBooksByRent || allBooks;
  const error = searchTerm ? nameError : rentError || allBooksError;
  const isLoading = searchTerm
    ? isLoadingName
    : isLoadingRent || isLoadingAllBooks;

  // Dispatch books to the global state when data is fetched
  useEffect(() => {
    if (books) {
      dispatch(setBooks(books));
    }
  }, [books, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search query will automatically trigger the useGetBooksByNameQuery
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
            <span>{booksList?.length} Books</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore and manage your Books below.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg shadow-sm mb-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="p-2 border border-gray-300 rounded"
          />

          {/* Range Slider for Rent */}
          <div className="w-full">
            <label className="text-gray-700 font-semibold mb-2 block">
              Rent Range: ${rentRange[0]} - ${rentRange[1]}
            </label>
            <Range
              step={1}
              min={MIN}
              max={MAX}
              values={rentRange}
              onChange={(values) => setRentRange(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-2 bg-gray-300 rounded-full">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-blue-500 rounded-full shadow-md outline-none cursor-pointer"
                />
              )}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {booksList?.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
