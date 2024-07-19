import PropTypes from "prop-types";
import { useEffect } from "react";

const TransactionsModal = ({
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Transactions for {book.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        {isFetching && <p className="text-center">Loading transactions...</p>}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load transactions.
          </p>
        )}
        {!isFetching && !isError && transactions && transactions.length > 0 ? (
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="border-t px-4 py-2">{transaction.id}</td>
                    <td className="border-t px-4 py-2">
                      {transaction.user.name}
                    </td>
                    <td className="border-t px-4 py-2">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="border-t px-4 py-2">
                      {transaction.type === "rent" ? "Rent" : "Return"}
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
};

TransactionsModal.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired, // rent or return
    })
  ),
  onClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default TransactionsModal;
