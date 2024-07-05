import { NavLink, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";

function Navbar() {
  const location = useLocation();

  return (
    <aside className="w-[200px] flex flex-col">
      <nav className="flex flex-col mt-6 space-y-3 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-2  hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid color={location.pathname === "/" ? "#6941C6" : "black"} />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/userlist"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={
                location.pathname === "/people-directory" ? "#6941C6" : "black"
              }
            />
          </div>
          Users
        </NavLink>
        <NavLink
          to="/booklist"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={location.pathname === "/booklist" ? "#6941C6" : "black"}
            />
          </div>
          Books
        </NavLink>
        <NavLink
          to="/transactionlist"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <IoGrid
              color={
                location.pathname === "/transactionlist" ? "#6941C6" : "black"
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
