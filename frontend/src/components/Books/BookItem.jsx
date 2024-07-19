import PropTypes from "prop-types";
import { useState } from "react";
import RentModal from "../Modals/RentModal";
import ReturnModal from "../Modals/ReturnModal";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useLazyGetTransactionByBookQuery } from "../../redux/api/transactionApiSlice";
import BookTransactionsModal from "../Modals/BookTransactionsModal";

const BookItem = ({ book }) => {
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState(null);

  const [triggerGetTransactions, { isFetching, isError }] =
    useLazyGetTransactionByBookQuery();

  // Handle Rent Modal
  const handleRentNowClick = () => setIsRentModalOpen(true);
  const handleCloseRentModal = () => setIsRentModalOpen(false);

  // Handle Return Modal
  const handleReturnClick = () => setIsReturnModalOpen(true);
  const handleCloseReturnModal = () => setIsReturnModalOpen(false);

  // Toggle Dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle Show Transactions (Dropdown Option)
  const handleShowTransactionsClick = async () => {
    setIsTransactionModalOpen(true);
    setIsDropdownOpen(false); // Close the dropdown

    const result = await triggerGetTransactions(book.name);
    if (result?.data) {
      setTransactionsData(result.data);
    }
  };

  // Handle Close Transaction Modal
  const handleCloseTransactionModal = () => setIsTransactionModalOpen(false);

  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl h-full">
      {/* Dropdown Button (Top Right) */}
      <div className="absolute top-5 right-2">
        <button
          onClick={toggleDropdown}
          className="text-white hover:text-gray-700 focus:outline-none"
        >
          <BsThreeDotsVertical size={22} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleShowTransactionsClick}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Show Transactions
            </button>
          </div>
        )}
      </div>

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

      {/* Action Buttons (Rent & Return) */}
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
      </div>

      {/* Rent Modal */}
      {isRentModalOpen && (
        <RentModal book={book} onClose={handleCloseRentModal} />
      )}

      {/* Return Modal */}
      {isReturnModalOpen && (
        <ReturnModal book={book} onClose={handleCloseReturnModal} />
      )}

      {/* Transactions Modal */}
      {isTransactionModalOpen && (
        <BookTransactionsModal
          book={book}
          transactions={transactionsData}
          onClose={handleCloseTransactionModal}
          isFetching={isFetching}
          isError={isError}
        />
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
