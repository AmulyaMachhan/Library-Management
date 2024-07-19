import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import { useIssueBookMutation } from "../../redux/api/transactionApiSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";

const RentModal = ({ book, onClose }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [issueBook] = useIssueBookMutation();

  const { data: users } = useGetAllUsersQuery();

  const handleRent = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user.");
      return;
    }

    try {
      await issueBook({
        bookName: book.name,
        userId: selectedUserId,
        issueDate: new Date(),
      }).unwrap();
      toast.success("Book successfully rented!");
      onClose();
    } catch (error) {
      toast.error(error.data.message || "Failed to rent the book.");
    }
  };

  // Modal content
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Rent Book</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-gray-800 mb-1"
          >
            <IoIosCloseCircleOutline size={28} />
          </button>
        </div>
        <p className="mb-6 text-lg">Renting &quot;{book.name}&quot;.</p>

        {/* User Selection */}
        <div className="mb-6">
          <label htmlFor="user" className="block text-gray-700 mb-2 text-lg">
            Select User:
          </label>
          <select
            id="user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full border border-gray-300 rounded p-3 text-lg"
          >
            <option value="">Select User</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 rounded-lg text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleRent}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render modal content at the root level
  return createPortal(modalContent, document.body);
};

RentModal.propTypes = {
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RentModal;
