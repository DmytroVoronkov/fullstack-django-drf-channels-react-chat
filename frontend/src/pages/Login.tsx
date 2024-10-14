import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthService from "../services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthService();

  const formik = useFormik({
    // FIXME: Add const file
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const res = await login(username, password);
      if (res) {
        console.log(res);
        navigate('/testLogin')
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
