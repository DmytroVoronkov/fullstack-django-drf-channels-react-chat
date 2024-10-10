import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: () => {},
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formik.values.username} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" value={formik.values.password} />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
