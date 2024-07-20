function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-8">
        LIBRARY CO.
      </h1>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Overview</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          The Library Co. is a full-stack application that manages users, books,
          transactions, and more. It consists of a backend API and a frontend
          web application.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Backend API</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          The backend API provides endpoints for managing users, books, and
          transactions. The API is hosted at:
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          <strong>Base URL:</strong>{" "}
          <a
            href="https://library-management-nu-seven.vercel.app/api/v1"
            className="text-indigo-600 underline"
          >
            https://library-management-nu-seven.vercel.app/api/v1
          </a>
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          For detailed documentation on the available endpoints, please refer to
          the{" "}
          <a
            href="#backend-api-documentation"
            className="text-indigo-600 underline"
          >
            Backend API Documentation
          </a>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Frontend Application
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          The frontend application is a user-friendly interface for interacting
          with the Library Management System. It allows users to manage books,
          view transactions, and perform other tasks through a web-based
          interface.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          <strong>Frontend URL:</strong>{" "}
          <a
            href="https://library-management-d9up.vercel.app/"
            className="text-indigo-600 underline"
          >
            https://library-management-d9up.vercel.app/
          </a>
        </p>
      </section>

      <section id="backend-api-documentation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Backend API Documentation
        </h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            1. User Endpoints
          </h3>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              1.1 Get All Users
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/users/allusers</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches a list of all users in the
              system.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="http://localhost:8000/api/v1/users/allusers"
                className="text-indigo-600 underline"
              >
                http://localhost:8000/api/v1/users/allusers
              </a>
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            2. Book Endpoints
          </h3>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              2.1 Get All Books
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/books/allbooks</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches a list of all books in the
              library.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/books/allbooks"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/books/allbooks
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              2.2 Get Books By Name
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/books/search/name</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches books by searching for a
              term in the book name.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>query</code> - The search
              term.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/books/search/name?query=The"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/books/search/name?query=The
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              2.3 Get Books By Rent
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/books/search/rent</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches books based on rent range.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>min</code> - Minimum
              rent, <code>max</code> - Maximum rent.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/books/search/rent?max=2"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/books/search/rent?max=2
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              2.4 Global Book Search
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/books/search/global</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Performs a global search based on
              category, name, and rent range.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>category</code> - Book
              category, <code>query</code> - Search term, <code>min</code> -
              Minimum rent, <code>max</code> - Maximum rent.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/books/search/global?category=Fantasy&query=the&min=1.5&max=2"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/books/search/global?category=Fantasy&query=the&min=1.5&max=2
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              2.5 Get Book Categories
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/books/categories</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches a list of all available book
              categories.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/books/categories"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/books/categories
              </a>
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            3. Transaction Endpoints
          </h3>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.1 Issue a Book
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/issue</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Issues a book to a user.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Request Body:</strong> <code>bookName</code> - The name of
              the book, <code>userId</code> - The ID of the user,{" "}
              <code>issueDate</code> - The date the book is issued.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/issue"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/issue
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.2 Return a Book
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/return</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Returns a book and updates the
              transaction record.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Request Body:</strong> <code>bookName</code> - The name of
              the book, <code>userId</code> - The ID of the user,{" "}
              <code>returnDate</code> - The date the book is returned.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/return"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/return
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.3 Get Transactions by Book Name
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/book</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches all transactions for a
              particular book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>bookName</code> - The
              name of the book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/book?bookName=The%20Great%20Gatsby"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/book?bookName=The%20Great%20Gatsby
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.4 Get Total Rent By Book
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/book/rent</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches the total rent generated by
              a particular book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>bookName</code> - The
              name of the book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/book/rent?bookName=The%20Great%20Gatsby"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/book/rent?bookName=The%20Great%20Gatsby
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.5 Get Users with Issued Book
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/users/book</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches a list of users who have
              issued a particular book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Query Parameters:</strong> <code>bookName</code> - The
              name of the book.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/users/book?bookName=The%20Alchemist"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/users/book?bookName=The%20Alchemist
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.6 Books Rented by a User
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong> <code>/transactions/user/:userId</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches a list of books rented by a
              specific user.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Example:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/user/66e0342a9a94ae1b216754a1"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/user/66e0342a9a94ae1b216754a1
              </a>
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              3.7 Get All Transactions
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Endpoint:</strong>{" "}
              <code>/transactions/alltransactions</code>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> Fetches all transactions in the
              system.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>URL:</strong>{" "}
              <a
                href="https://library-management-nu-seven.vercel.app/api/v1/transactions/alltransactions"
                className="text-indigo-600 underline"
              >
                https://library-management-nu-seven.vercel.app/api/v1/transactions/alltransactions
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
