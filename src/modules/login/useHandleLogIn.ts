import { useFormik, FormikHelpers } from "formik";
import { FormDataType } from "@/configs/types";
import { useAuth } from "../app/AppAuthProvider";
import { LoginSchema } from "@/utils/formSchemas";

export default function useHandleLogIn() {
  const { login } = useAuth();

  const formik = useFormik<FormDataType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema, // 2. Plug Yup into Formik
    onSubmit: async (
      values: FormDataType,
      { setSubmitting }: FormikHelpers<FormDataType>
    ) => {
      try {
        await login(values);
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
}
