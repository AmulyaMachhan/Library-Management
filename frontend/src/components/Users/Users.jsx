import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import Loader from "../Others/Loader";
import UserList from "./UserList";

const Users = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-700">
        <p className="text-lg font-semibold">Error fetching users.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <div className="flex justify-center items center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Users List
          </h1>
          <div className="flex items-center px-3 py-1 gap-2 font-[600] text-blue-600 bg-[#edf2f8] border border-[#60aaf0] rounded-3xl">
            <span>{users.length} users</span>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          Explore and manage your users below.
        </p>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg shadow-sm">
        <UserList users={users} />
      </div>
    </div>
  );
};

export default Users;
