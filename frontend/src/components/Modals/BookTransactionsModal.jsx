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

  console.log(transactions);
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Total Transactions for {book.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoIosCloseCircleOutline size={24} />
          </button>
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
        transactions.txn?.length > 0 ? (
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Issue Date</th>
                  <th className="px-4 py-2">Return Date</th>
                  <th className="px-4 py-2">Rent</th>
                </tr>
              </thead>
              <tbody>
                {transactions.txn.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="border-t px-4 py-2">{transaction._id}</td>
                    <td className="border-t px-4 py-2">
                      {transaction.userId.name}
                    </td>
                    <td className="border-t px-4 py-2">
                      {transaction.userId.email}
                    </td>
                    <td className="border-t px-4 py-2">
                      {new Date(transaction.issueDate).toLocaleDateString()}
                    </td>
                    <td className="border-t px-4 py-2">
                      {transaction.returnDate
                        ? new Date(transaction.returnDate).toLocaleDateString()
                        : "Not returned"}
                    </td>
                    <td className="border-t px-4 py-2">{transaction.rent}</td>
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
    txn: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
        issueDate: PropTypes.string.isRequired,
        returnDate: PropTypes.string,
        rent: PropTypes.number.isRequired,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default BookTransactionsModal;
