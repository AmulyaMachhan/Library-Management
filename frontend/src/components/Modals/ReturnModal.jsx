/* eslint-disable react/prop-types */
import { useState } from "react";
import { useReturnBookMutation } from "../../redux/api/transactionApiSlice";

const ReturnModal = ({ book, onClose }) => {
  const [returnBook, { isLoading, error }] = useReturnBookMutation();
  const [returnReason, setReturnReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await returnBook({ bookId: book.id, reason: returnReason }).unwrap();
      // You can add additional logic here, such as updating the state or showing a success message
      onClose(); // Close the modal after successful return
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Return Book</h2>
        <p className="mb-4">You are about to return the book: {book.name}</p>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Reason for return (optional)"
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Returning..." : "Confirm Return"}
            </button>
          </div>
        </form>

        {error && (
          <p className="text-red-600 mt-4">Failed to return the book.</p>
        )}
      </div>
    </div>
  );
};

export default ReturnModal;
