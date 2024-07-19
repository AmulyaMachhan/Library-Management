import { useEffect, useState } from "react";
import {
  useGetUsersWithIssuedBookQuery,
  useReturnBookMutation,
} from "../../redux/api/transactionApiSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";

const ReturnModal = ({ book, onClose }) => {
  const [returnBook, { isLoading, error }] = useReturnBookMutation();
  const [selectedUserId, setSelectedUserId] = useState("");

  const {
    data: users,
    isFetching,
    refetch,
  } = useGetUsersWithIssuedBookQuery({
    bookName: book.name,
  });

  const handleReturn = async () => {
    try {
      await returnBook({
        bookName: book.name,
        userId: selectedUserId,
        returnDate: new Date(),
      }).unwrap();
      onClose(); // Close the modal after successful return
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isDisabled = isLoading || !users?.length || !selectedUserId;

  // Modal content
  const modalContent = (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Return Book</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-gray-800 mb-1"
          >
            <IoIosCloseCircleOutline size={22} />
          </button>
        </div>

        <div className="mb-4">
          {isFetching ? (
            <p>Loading users...</p>
          ) : users && users.length > 0 ? (
            <>
              <p className="mb-4">
                You are about to return the book: {book.name}
              </p>
              <label htmlFor="user" className="block text-gray-700 mb-2">
                Select User:
              </label>
              <select
                id="user"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <p className="mb-4">Book Not Issued</p>
          )}
        </div>

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
            className={`px-4 py-2 rounded ${
              isDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white"
            }`}
            onClick={handleReturn}
            disabled={isDisabled}
          >
            {isLoading ? "Returning..." : "Confirm Return"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 mt-4">Failed to return the book.</p>
        )}
      </div>
    </div>
  );

  // Use createPortal to render modal content at the root level
  return createPortal(modalContent, document.body);
};

export default ReturnModal;
