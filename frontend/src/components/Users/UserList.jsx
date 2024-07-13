import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const UserList = ({ users }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filtering, setFiltering] = useState("");

  // Memoized table data and columns
  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name", // key in the user object
      },
      {
        header: "Email",
        accessorKey: "email", // key in the user object
      },
      {
        header: "Membership Date",
        accessorKey: "membershipDate", // key in the user object
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(), // format date
      },
    ],
    []
  );

  // React Table hook
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      {/* Global Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search users..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 transition-all"
        />
      </div>

      {/* Table */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden ">
        <thead className="bg-blue-700 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-sm font-semibold text-left cursor-pointer border-r"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="ml-2">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <FaChevronDown className="inline h-3 w-3 pb-3" />
                        ) : (
                          <FaChevronUp className="inline h-3 w-3" />
                        )
                      ) : null}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-r border-r-gray-300 transition-colors hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <button
            className={`px-4 py-2 mr-2 rounded-lg ${
              !table.getCanPreviousPage()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span className="mx-4 text-sm font-semibold">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            className={`px-4 py-2 ml-2 rounded-lg ${
              !table.getCanNextPage()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        <div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      membershipDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
