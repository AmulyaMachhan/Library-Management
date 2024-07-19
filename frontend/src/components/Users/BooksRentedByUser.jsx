import { useGetBooksByUserQuery } from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";
import PropTypes from "prop-types";

const BooksRentedByUser = ({ userId, onClose }) => {
  const { data: books, error, isLoading } = useGetBooksByUserQuery({ userId });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
          <p className="text-red-500 font-semibold text-lg">
            Error fetching books rented by user.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Books Rented
        </h2>
        {books?.booksIssued?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {books.booksIssued.map((book, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg px-4 transition duration-200 ease-in-out"
              >
                <span className="text-gray-700 font-medium">
                  {book.bookName}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No books rented.</p>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

BooksRentedByUser.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BooksRentedByUser;
