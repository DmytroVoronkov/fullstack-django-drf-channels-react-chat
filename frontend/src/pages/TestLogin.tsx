import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/useAuthServiceContext";
import { BASE_URL } from "../config";
import { useState } from "react";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import axios from "axios";

// FIXME: Move to separate file
interface UserDetailsResponse {
  username: string;
}

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const jwtaxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      // FIXME: Fix typing && Refactor urls
      const response = await jwtaxios
        .get<UserDetailsResponse>(`${BASE_URL}/account/?user_id=1`, {
          withCredentials: true,
        })

      setUsername(response.data.username);
      // FIXME: Type error
    } catch (e) {
      return e;
    }
  };

  return (
    <div>
      {isLoggedIn.toString()}
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
      <button onClick={getUserDetails}>Get User Details</button>
      {username}
    </div>
  );
};

export default TestLogin;
