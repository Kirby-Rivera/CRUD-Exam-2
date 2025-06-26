import { Formik, Field, Form, FormikHelpers } from "formik";
import { useAuth } from "../app/AppAuthProvider";

interface ValuesType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(
        values: ValuesType,
        { setSubmitting }: FormikHelpers<ValuesType>
      ) => {
        setTimeout(() => {
          login(values);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" type="email" />
          <Field name="password" type="password" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
