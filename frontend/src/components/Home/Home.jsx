function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-8">
        Welcome to Library Co.
      </h1>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What this task is all about
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Library Co. is a modern book rental management system that simplifies
          how users rent and manage books. This application uses React, Tailwind
          CSS, and Redux for state management. It connects to a Node.js backend
          powered by multiple REST APIs to manage books, users, and
          transactions.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Here, users can view available books, search based on book categories
          or names, and view user and transaction information. Below is a
          detailed explanation of the backend APIs and how they interact with
          the frontend.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Backend APIs and Interaction with Frontend
        </h2>

        {/* Books API Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            1. Books API
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Books API handles operations related to books. The frontend uses
            this API to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Fetch the list of available books via a{" "}
              <span className="font-bold">GET</span> request to{" "}
              <code className="bg-gray-100 px-1 rounded">/api/books</code>.
            </li>
            <li>
              Retrieve book details, filter by category, and search by book
              name.
            </li>
          </ul>
        </div>

        {/* Users API Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            2. Users API
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Users API manages all user-related data. The frontend interacts
            with it to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Retrieve the list of registered users with a{" "}
              <span className="font-bold">GET</span> request to{" "}
              <code className="bg-gray-100 px-1 rounded">/api/users</code>.
            </li>
            <li>View individual user details and manage user data.</li>
          </ul>
        </div>

        {/* Transactions API Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            3. Transactions API
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Transactions API manages the rental activities of books. The
            frontend communicates with this API to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Issue a book to a user by sending a{" "}
              <span className="font-bold">POST</span> request to{" "}
              <code className="bg-gray-100 px-1 rounded">
                /api/transactions/issue
              </code>
              .
            </li>
            <li>
              Return a book using a <span className="font-bold">POST</span>{" "}
              request to{" "}
              <code className="bg-gray-100 px-1 rounded">
                /api/transactions/return
              </code>
              .
            </li>
            <li>
              Fetch transaction history through{" "}
              <span className="font-bold">GET</span> requests.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How the APIs Integrate with the Frontend
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          The frontend uses `fetch` or Axios to interact with the backend APIs.
          State management is handled through Redux, ensuring smooth data flow
          between components. Each API call retrieves or modifies data, which is
          then displayed or updated in real-time across the app’s components.
          Redux manages application state efficiently, ensuring a consistent
          experience as users interact with books, transactions, and users.
        </p>
      </section>
    </div>
  );
}

export default Home;
