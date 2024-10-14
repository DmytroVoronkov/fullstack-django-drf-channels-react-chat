import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/useAuthServiceContext";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const navigate = useNavigate()

  return (
    <div>
      {isLoggedIn.toString()}
      <button
        onClick={() => {
          logout();
          navigate("/login")
        }}
      >Logout</button>
    </div>
  );
};

export default TestLogin;
