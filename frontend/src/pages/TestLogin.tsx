import { useAuthServiceContext } from "../context/useAuthServiceContext";

const TestLogin = () => {
  const { isLoggedIn } = useAuthServiceContext();
  console.log("in test login", isLoggedIn)

  return <div>{isLoggedIn.toString()}</div>;
};

export default TestLogin;
