import { NavLink, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";

function Navbar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col">
      <nav className="flex flex-col mt-6 space-y-3 text-sm text-indigo-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-2  hover:bg-gray-200 ${
              isActive ? "text-indigo-600" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid color={location.pathname === "/" ? "#3949ab" : "black"} />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-indigo-600" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={location.pathname === "/users" ? "#3949ab" : "black"}
            />
          </div>
          Users
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-indigo-600" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={location.pathname === "/books" ? "#3949ab" : "black"}
            />
          </div>
          Books
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-indigo-600" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={
                location.pathname === "/transactions" ? "#3949ab" : "black"
              }
            />
          </div>
          Transactions
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
