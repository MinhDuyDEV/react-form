import React from "react";
import { useForm } from "react-hook-form";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
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
    job: yup.string().required("Please select your job"),
    terms: yup
      .boolean()
      .required("Please accept terms and conditions.")
      .oneOf([true], "Please accept terms and conditions."),
  })
  .required();

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

const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    setValue,
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    modes: "onchange",
    defaultValues: {
      gender: "",
    },
  });
  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(values);
        reset({
          userName: "",
          email: "",
          password: "",
          gender: "",
          job: "",
          terms: false,
        });
      }, 3000);
    });
  };
  const watchGender = watch("gender");
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-[300px] h-[50px] mx-auto my-10"
      autoComplete="off"
    >
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="userName" className="cursor-pointer font-medium">
          User name
        </label>
        <InputHook
          name="userName"
          placeholder="Enter your user name"
          id="userName"
          control={control}
          type="text"
        ></InputHook>
        {<p className="text-red-500 text-sm">{errors?.userName?.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer font-medium">
          Email address
        </label>
        <InputHook
          name="email"
          placeholder="Enter your email address"
          id="email"
          control={control}
          type="email"
        ></InputHook>
        {<p className="text-red-500 text-sm">{errors?.email?.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer font-medium">
          Password
        </label>
        <InputHook
          name="password"
          placeholder="Enter your password"
          id="password"
          control={control}
          type="password"
        ></InputHook>
        {<p className="text-red-500 text-sm">{errors?.password?.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5 ml-[5px]">
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="male"
              checked={watchGender === "male"}
            ></RadioHook>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="female"
              checked={watchGender === "female"}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {<p className="text-red-500 text-sm">{errors?.gender?.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="">Are you</label>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          data={dropDownData}
          dropDownLabel="Select your job"
        ></DropdownHook>
        {<p className="text-red-500 text-sm">{errors?.job?.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <CheckboxHook
          control={control}
          name="terms"
          text="I accept terms and conditions"
        ></CheckboxHook>
        {<p className="text-red-500 text-sm">{errors?.terms?.message}</p>}
      </div>
      <button className="w-full p-5 bg-blue-500 text-white outline-none rounded-lg mt-5 font-semibold">
        {isSubmitting ? (
          <div
            className={`w-6 h-6 rounded-full animate-spin border-2 border-white border-t-transparent m-auto ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          ></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
