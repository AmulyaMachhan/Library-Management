import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import { useIssueBookMutation } from "../../redux/api/transactionApiSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

const RentModal = ({ book, onClose }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [issueBook] = useIssueBookMutation();

  const { data: users } = useGetAllUsersQuery();

  const handleRent = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user.");
      return;
    }
    console.log(selectedUserId);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Rent Book</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-gray-800 mb-1"
          >
            <IoIosCloseCircleOutline size={22} />
          </button>
        </div>
        <p className="mb-4">Renting &quot;{book.name}&quot;.</p>

        {/* User Selection */}
        <div className="mb-4">
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
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleRent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

RentModal.propTypes = {
  book: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RentModal;
