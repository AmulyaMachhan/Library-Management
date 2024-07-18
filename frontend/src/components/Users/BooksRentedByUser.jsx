/* eslint-disable react/prop-types */

import { useGetBooksByUserQuery } from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";

const BooksRentedByUser = ({ userId, onClose }) => {
  const { data: books, error, isLoading } = useGetBooksByUserQuery({ userId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching books by user:", error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-700">
        <p className="text-lg font-semibold">
          Error fetching books rented by user:{" "}
          {error.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Books Rented</h2>
      <ul>
        {books && books.booksIssued.length > 0 ? (
          books.booksIssued.map((book, index) => (
            <li key={index} className="py-2">
              {book.bookName}
            </li>
          ))
        ) : (
          <p>No books rented.</p>
        )}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  );
};

export default BooksRentedByUser;
