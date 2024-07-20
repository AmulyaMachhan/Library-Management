import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";

const BookTransactionsModal = ({
  book,
  transactions,
  onClose,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex justify-center items-center gap-3">
            Total Transactions for {book.name}
            <div className="flex items-center text-lg px-3 py-1 gap-2 font-[600] text-blue-600 bg-[#edf2f8] border border-[#60aaf0] rounded-xl">
              <span>{transactions?.totalCount}</span>
            </div>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>

        {/* Book Status */}
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Status:{" "}
            <span
              className={`${
                transactions?.status?.type === "Not issued currently"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {transactions?.status?.type}
            </span>
          </p>
        </div>

        {/* Modal Content */}
        {isFetching && <p className="text-center">Loading transactions...</p>}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load transactions.
          </p>
        )}
        {!isFetching &&
        !isError &&
        transactions &&
        transactions?.txn?.length > 0 ? (
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2 md:table-cell hidden">Email</th>
                  <th className="px-4 py-2">ReturnDate</th>
                  <th className="px-4 py-2 md:table-cell hidden">Rent</th>
                  <th className="px-4 py-2 md:table-cell hidden">Issue Date</th>
                  <th className="px-4 py-2 md:table-cell hidden">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.txn.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="border-t px-4 py-2">
                      {transaction.userId.name}
                    </td>
                    <td className="border-t px-4 py-2 md:table-cell hidden">
                      {transaction.userId.email}
                    </td>
                    <td className="border-t px-4 py-2">
                      {new Date(transaction.returnDate).toLocaleDateString()}
                    </td>
                    <td className="border-t px-4 py-2 md:table-cell hidden">
                      {transaction.rent.toFixed(2)}
                    </td>
                    <td className="border-t px-4 py-2 md:table-cell hidden">
                      {new Date(transaction.issueDate).toLocaleDateString()}
                    </td>
                    <td className="border-t px-4 py-2 md:table-cell hidden">
                      {transaction.returnDate ? "Returned" : "Rented"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isFetching && <p className="text-center">No transactions found.</p>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

BookTransactionsModal.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  transactions: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    status: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
    txn: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
        issueDate: PropTypes.string.isRequired,
        returnDate: PropTypes.string,
        rent: PropTypes.number,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default BookTransactionsModal;
