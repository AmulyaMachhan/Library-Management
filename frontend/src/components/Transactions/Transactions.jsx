import { useGetAllTransactionsQuery } from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";

const Transactions = () => {
  const { data: transactions, error, isLoading } = useGetAllTransactionsQuery();

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
            <span>{transactions?.length} Books</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore and manage your Books below.
        </p>
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
              {transactions?.map((transaction) => (
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
