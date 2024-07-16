import { useGetAllTransactionsQuery } from "../../redux/api/transactionApiSlice";

const Transactions = () => {
  // Use the Redux hook to fetch transactions
  const { data: transactions, error, isLoading } = useGetAllTransactionsQuery();

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error fetching transactions</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>
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
