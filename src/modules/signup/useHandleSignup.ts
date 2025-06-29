import { useFormik } from "formik";
import { SignupRequest } from "@/configs/types";
import { useAuth } from "@/modules/app/AppAuthProvider";
import { SignupSchema } from "@/utils/formSchemas";

export default function useHandleSignup() {
  const { signup } = useAuth();

  return useFormik<SignupRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await signup(values);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
}
