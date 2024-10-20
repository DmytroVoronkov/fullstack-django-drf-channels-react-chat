import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthService from "../services/AuthService";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthService();
  const formik = useFormik({
    // FIXME: Add const file
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};

      const { username, password } = values;

      if (!username) {
        errors.username = "Username is required!";
      }

      if (!password) {
        errors.password = "Password is required!";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const status = await register(username, password);

      if (status == 401) {
        console.log("Unauthorized");
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else if (status == 409) {
        console.log("Error");
        formik.setErrors({
          username: "Invalid username",
        });
      } else {
        navigate("/login");
      }
    },
  });
  return (
    <>
      <Container component={"main"} sx={{ maxWidth: "xs" }}>
        <Box sx={{ mt: 8, display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography
            variant="h5"
            noWrap
            component={"h5"}
            sx={{
              fontWeight: 500,
              pb: 2,
            }}
          >
            Sign Up
          </Typography>
          <Box
            component={"form"}
            sx={{
              mt: 1,
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              autoFocus
              fullWidth
              label="username"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              error={!!formik.errors.username && !!formik.touched.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              autoFocus
              fullWidth
              type="text"
              label="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={!!formik.errors.password && !!formik.touched.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button disableElevation type="submit" sx={{ mt: 1, mb: 2 }}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
