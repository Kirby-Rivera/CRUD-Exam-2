import { useFormik, FormikHelpers } from "formik";
import { FormDataType } from "@/configs/types";
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
      setTimeout(() => {
        login(values);
        setSubmitting(false);
      }, 500);
    },
  });

  return formik;
}
