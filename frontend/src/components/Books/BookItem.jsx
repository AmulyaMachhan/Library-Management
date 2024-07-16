/* eslint-disable react/prop-types */
import { useState } from "react";
import RentModal from "../Modals/RentModal";
import { useIssueBookMutation } from "../../redux/api/transactionApiSlice";

const BookItem = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issueBook, { isLoading, isError }] = useIssueBookMutation();

  const handleRentClick = () => {
    setIsModalOpen(true); // Open modal when "Rent Now" is clicked
  };

  const handleRentConfirm = async () => {
    try {
      await issueBook({ bookId: book.id, userId: "currentUserId" }).unwrap(); // Replace "currentUserId" with actual user
      setIsModalOpen(false); // Close modal after successful issue
      alert("Book issued successfully!");
    } catch (error) {
      alert(error.message || "Failed to issue the book.");
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

      {/* Action Button (Stays at Bottom) */}
      <div className="p-4 bg-gray-100 border-t mt-auto">
        <button
          onClick={handleRentClick}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Rent Now
        </button>
      </div>

      {/* Rent Confirmation Modal */}
      {isModalOpen && (
        <RentModal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold mb-4">Rent Book: {book.name}</h3>
          <p>Are you sure you want to rent this book?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleRentConfirm}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              {isLoading ? "Renting..." : "Confirm Rent"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
          {isError && (
            <p className="text-red-600 mt-4">Failed to issue the book.</p>
          )}
        </RentModal>
      )}
    </div>
  );
};

export default BookItem;
