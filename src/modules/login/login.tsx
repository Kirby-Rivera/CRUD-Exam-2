import { Formik, Field, Form, FormikHelpers } from "formik";
import { useAuth } from "../app/AppAuthProvider";
import useHandleLogIn from "./useHandleLogIn";

interface ValuesType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const formik = useHandleLogIn();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
