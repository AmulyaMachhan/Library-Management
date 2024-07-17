import { useState } from "react";
import {
  useGetAllTransactionsQuery,
  useGetTransactionsByDateRangeQuery,
} from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";

const TransactionsByDateRange = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetchData, setFetchData] = useState(false);

  const {
    data: alltransactions,
    error: transactionError,
    isLoading: istransactionsLoading,
  } = useGetAllTransactionsQuery();

  // Use the API query with date range parameters
  const {
    data: filteredTransactions,
    error: filteredTransactionsError,
    isLoading: isFilteredTransactionLoading,
  } = useGetTransactionsByDateRangeQuery(
    { start: startDate, end: endDate },
    {
      skip: !fetchData, // Skip fetching data if fetchData is false
    }
  );

  const transactions = fetchData ? filteredTransactions : alltransactions;
  const error = fetchData ? filteredTransactionsError : transactionError;
  const isLoading = fetchData
    ? isFilteredTransactionLoading
    : istransactionsLoading;

  const handleFetchTransactions = () => {
    if (startDate && endDate) {
      setFetchData(true);
    } else {
      alert("Please select both start and end dates.");
    }
  };

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
            <span>{transactions?.length}</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore your transactions below.
        </p>
      </div>
      <div className="mb-6">
        <div className="flex gap-4">
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
        </div>
      </div>

      {fetchData && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Book Name</th>
                <th className="px-4 py-2 border">User Name</th>
                <th className="px-4 py-2 border">Issue Date</th>
                <th className="px-4 py-2 border">Return Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{transaction.bookName}</td>
                  <td className="px-4 py-2 border">{transaction.userName}</td>
                  <td className="px-4 py-2 border">
                    {new Date(transaction.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.returnDate
                      ? new Date(transaction.returnDate).toLocaleDateString()
                      : "Not Returned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsByDateRange;
