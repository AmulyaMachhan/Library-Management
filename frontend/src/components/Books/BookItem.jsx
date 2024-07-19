import PropTypes from "prop-types";
import { useState } from "react";
import RentModal from "../Modals/RentModal";
import ReturnModal from "../Modals/ReturnModal"; // Assuming your API slice
import { useLazyGetTransactionByBookQuery } from "../../redux/api/transactionApiSlice";

const BookItem = ({ book }) => {
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isTransactionDropdownOpen, setIsTransactionDropdownOpen] =
    useState(false);
  const [transactionsData, setTransactionsData] = useState(null);

  // Lazy query to fetch transaction details for a book
  const [triggerGetTransactions, { isFetching, isError }] =
    useLazyGetTransactionByBookQuery();

  // Handle opening and closing the Rent Modal
  const handleRentNowClick = () => setIsRentModalOpen(true);
  const handleCloseRentModal = () => setIsRentModalOpen(false);

  // Handle opening and closing the Return Modal
  const handleReturnClick = () => setIsReturnModalOpen(true);
  const handleCloseReturnModal = () => setIsReturnModalOpen(false);

  // Handle Transaction Dropdown Toggle
  const handleTransactionDropdownClick = async () => {
    setIsTransactionDropdownOpen(!isTransactionDropdownOpen);

    if (!isTransactionDropdownOpen) {
      const result = await triggerGetTransactions(book.name);
      if (result?.data) {
        setTransactionsData(result.data);
      }
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl h-full">
      {/* Book Image */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
        <p className="text-white font-bold text-2xl uppercase">
          {book.name.charAt(0)}
        </p>
      </div>

      {/* Book Details */}
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {book.name}
          </h2>
          <p className="text-gray-500 text-center mb-4">
            Category:{" "}
            <span className="font-medium text-gray-700">{book.category}</span>
          </p>
        </div>
        <div className="flex justify-center items-center mb-4">
          <span className="bg-green-100 text-green-600 text-lg font-semibold py-1 px-4 rounded-full shadow-sm">
            ${book.rentPerDay} / Day
          </span>
        </div>
      </div>

      {/* Action Buttons (Rent, Return & Transactions) */}
      <div className="p-4 bg-gray-100 border-t mt-auto flex flex-col gap-2">
        {/* Rent Now Button */}
        <button
          onClick={handleRentNowClick}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Rent Now
        </button>

        {/* Return Book Button */}
        <button
          onClick={handleReturnClick}
          className="w-full bg-red-200 text-red-700 py-2 rounded-lg font-semibold shadow-md hover:bg-red-100 transition"
        >
          Return Book
        </button>

        {/* Show Transactions Button */}
        <button
          onClick={handleTransactionDropdownClick}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition"
        >
          {isFetching ? "Loading..." : "Show Transactions"}
        </button>

        {/* Dropdown for Transactions */}
        {isTransactionDropdownOpen && (
          <div className="bg-white border mt-2 p-4 rounded-lg shadow-lg">
            {isError ? (
              <p className="text-red-500">Failed to load transactions</p>
            ) : (
              <>
                <p className="font-semibold">
                  Total Transactions: {transactionsData?.totalCount || 0}
                </p>
                <p className="font-semibold">
                  Status:{" "}
                  {transactionsData?.status?.currentlyIssuedTo ||
                    transactionsData?.status?.status}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Rent Modal */}
      {isRentModalOpen && (
        <RentModal book={book} onClose={handleCloseRentModal} />
      )}

      {/* Return Modal */}
      {isReturnModalOpen && (
        <ReturnModal book={book} onClose={handleCloseReturnModal} />
      )}
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rentPerDay: PropTypes.number.isRequired,
  }).isRequired,
};
export default BookItem;
