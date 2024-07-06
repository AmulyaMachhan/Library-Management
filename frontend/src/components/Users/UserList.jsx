import PropTypes from "prop-types";

const UserList = ({ users }) => {
  return (
    <ul className="list-disc pl-5">
      {users.map((user) => (
        <li key={user._id} className="text-lg">
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.object,
};
export default UserList;
