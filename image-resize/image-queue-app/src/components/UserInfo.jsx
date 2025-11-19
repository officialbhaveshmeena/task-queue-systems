import {jwtDecode} from "jwt-decode";

const UserInfo = () => {
  // Get token (adjust based on where you store it)
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <p>No token found. User not logged in.</p>;
  }

  let user = null;

  try {
    user = jwtDecode(token); // Decode the JWT
    console.log("user : ",user)
  } catch (err) {
    return <p>Invalid token</p>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", width: "300px" }}>
      <h3>User Info</h3>
      <p><strong>Username:</strong> {user.username}</p>
      {/* <p><strong>Email:</strong> {user.email}</p> */}
    </div>
  );
};

export default UserInfo;
