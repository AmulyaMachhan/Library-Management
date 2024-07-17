import { useGetAllTransactionsQuery } from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";

const Transactions = () => {
  // Use the Redux hook to fetch transactions
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
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Total Transactions
          </h1>
          <div className="flex items-center px-3 py-1 gap-2 font-[600] text-blue-600 bg-[#edf2f8] border border-[#60aaf0] rounded-3xl">
            <span>{transactions?.length}</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore and manage your Books below.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Book</th>
              <th className="px-4 py-2 border">Issue Date</th>
              <th className="px-4 py-2 border">Return Date</th>
              <th className="px-4 py-2 border">Rent</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction._id}>
                <td className="px-4 py-2 border">
                  {transaction.userId
                    ? transaction.userId.name
                    : "Unknown User"}
                </td>
                <td className="px-4 py-2 border">
                  {transaction.bookId
                    ? transaction.bookId.name
                    : "Unknown Book"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(transaction.issueDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {transaction.returnDate
                    ? new Date(transaction.returnDate).toLocaleDateString()
                    : "Not Returned"}
                </td>
                <td className="px-4 py-2 border">${transaction.rent || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
