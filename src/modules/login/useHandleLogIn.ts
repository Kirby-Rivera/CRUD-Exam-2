import { useFormik, FormikHelpers } from "formik";
import { FormDataType } from "@/configs/auth";
import { useAuth } from "../app/AppAuthProvider";

export default function useHandleLogIn() {
  const { login } = useAuth();
  const formik = useFormik<FormDataType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (
      values: FormDataType,
      { setSubmitting }: FormikHelpers<FormDataType>
    ) => {
      login(values);
      setSubmitting(false);
    },
  });

  return formik;
}
