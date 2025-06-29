import useHandleLogIn from "./useHandleLogIn";
import { TextField, Button, Box } from "@mui/material";
import styles from  "./Login.module.scss"

export default function LoginForm() {
  const formik = useHandleLogIn();

  return (
    <form onSubmit={formik.handleSubmit} className={styles["login-form"]}>
      <Box>
        {/* <label htmlFor="email">Email: </label> */}
        <TextField
          sx={{
            width: "100%",
          }}
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <Box style={{ color: "red" }}>{formik.errors.email}</Box>
        )}
      </Box>

      <Box>
        {/* <label htmlFor="password">Password: </label> */}
        <TextField
          sx={{
            width: "100%",
          }}
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <Box style={{ color: "red" }}>{formik.errors.password}</Box>
        )}
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
