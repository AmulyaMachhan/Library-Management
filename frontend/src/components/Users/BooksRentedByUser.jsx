import { useGetBooksByUserQuery } from "../../redux/api/transactionApiSlice";
import Loader from "../Others/Loader";
import PropTypes from "prop-types";

const BooksRentedByUser = ({ userId, onClose }) => {
  const { data: books, error, isLoading } = useGetBooksByUserQuery({ userId });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600">Error fetching books rented by user.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Books Rented</h2>
        <ul>
          {books?.booksIssued?.length > 0 ? (
            books.booksIssued.map((book, index) => (
              <li key={index} className="py-2">
                {book.bookName}
              </li>
            ))
          ) : (
            <p>No books rented.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

BooksRentedByUser.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default BooksRentedByUser;
