import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import UserList from "./UserList";

const Users = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      <UserList users={users} />
    </div>
  );
};

export default Users;
