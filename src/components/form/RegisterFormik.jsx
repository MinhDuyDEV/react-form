import React from "react";
import InputFormik from "../input/InputFormik";
import { Formik } from "formik";
import * as yup from "yup";
import RadioFormik from "../radio/RadioFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";
import DropdownFormik from "../dropdown/DropdownFormik";

const dropDownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
];

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        gender: "",
        job: "",
        terms: false,
      }}
      validationSchema={yup.object({
        userName: yup.string().required("Please enter your user name"),
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
        password: yup
          .string()
          .min(8, "Your password must be at least 8 characters or longer")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
              message:
                "Your password must have at least uppercase, 1 lowercase and 1 special characters",
            }
          )
          .required("Please enter your password"),
        gender: yup
          .string()
          .oneOf(["male", "female"], "You can only choose one gender")
          .required("Please choose your gender"),
        job: yup
          .string()
          .required("Please select your job")
          .oneOf(["teacher", "developer", "doctor"]),
        terms: yup
          .boolean()
          .required("Please accept terms and conditions.")
          .oneOf([true], "Please accept terms and conditions."),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 3000);
      }}
    >
      {(formik) => {
        const watchGender = formik.values.gender;
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-[300px] h-[50px] mx-auto my-10"
            autoComplete="off"
          >
            <InputFormik
              label="User name"
              name="userName"
              id="userName"
              placeholder="Enter your user name"
              type="text"
            ></InputFormik>
            <InputFormik
              label="Email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              type="email"
            ></InputFormik>
            <InputFormik
              label="Password"
              name="password"
              id="password"
              placeholder="Enter your password"
              type="password"
            ></InputFormik>
            <div className="flex flex-col gap-3 mb-5">
              <label className="cursor-pointer">Gender</label>
              <div className="flex items-center gap-5 ml-[5px]">
                <RadioFormik
                  name="gender"
                  value="male"
                  gender="Male"
                  checked={watchGender === "male"}
                ></RadioFormik>
                <RadioFormik
                  name="gender"
                  value="female"
                  gender="Female"
                  checked={watchGender === "female"}
                ></RadioFormik>
              </div>
              {<p className="text-red-500 text-sm">{formik.errors.gender}</p>}
            </div>
            <DropdownFormik
              labelText="Your job"
              data={dropDownData}
              name="job"
              setValue={formik.setFieldValue}
            ></DropdownFormik>
            <CheckboxFormik name="terms" id="terms">
              I accept the terms and conditions
            </CheckboxFormik>
            <button
              className="w-full p-5 bg-blue-500 text-white outline-none rounded-lg mt-5 font-semibold"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div
                  className={`w-6 h-6 rounded-full animate-spin border-2 border-white border-t-transparent m-auto ${
                    formik.isSubmitting ? "opacity-50" : ""
                  }`}
                ></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
