import { useEffect, useState } from "react";
import {
  useGetAllTransactionsQuery,
  useGetTransactionsByDateRangeQuery,
} from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";
import { setTransactions } from "../../redux/features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const { transactionsList } = useSelector((state) => state.transactions);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetchData, setFetchData] = useState(false);

  const dispatch = useDispatch();

  const {
    data: alltransactions,
    error: transactionError,
    isLoading: istransactionsLoading,
  } = useGetAllTransactionsQuery();

  const {
    data: filteredTransactions,
    error: filteredTransactionsError,
    isLoading: isFilteredTransactionLoading,
  } = useGetTransactionsByDateRangeQuery(
    { start: startDate, end: endDate },
    {
      skip: !fetchData,
    }
  );

  const handleFetchTransactions = () => {
    if (startDate && endDate) {
      setFetchData(true);
    } else {
      setFetchData(false);
    }
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFetchData(false);
  };

  const transactions = fetchData ? filteredTransactions : alltransactions;
  const error = fetchData ? filteredTransactionsError : transactionError;
  const isLoading = fetchData
    ? isFilteredTransactionLoading
    : istransactionsLoading;

  useEffect(() => {
    if (transactions) {
      dispatch(setTransactions(transactions));
    }
  }, [transactions, dispatch, fetchData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-700">
        <p className="text-lg font-semibold">Error fetching Transactions.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Total Transactions
          </h1>
          <div className="flex items-center px-3 py-1 gap-2 font-[600] text-blue-600 bg-[#edf2f8] border border-[#60aaf0] rounded-3xl">
            <span>{transactionsList?.length}</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore your transactions below.
        </p>
      </div>
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleFetchTransactions}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Fetch Transactions
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="bg-white shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Rent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionsList?.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.userId
                      ? transaction.userId.name
                      : "Unknown User"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.bookId
                      ? transaction.bookId.name
                      : "Unknown Book"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(transaction.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.returnDate
                      ? new Date(transaction.returnDate).toLocaleDateString()
                      : "Not Returned"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${transaction.rent?.toFixed(2) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
