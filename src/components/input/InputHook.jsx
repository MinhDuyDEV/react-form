import React from "react";
import { useController } from "react-hook-form";

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className="p-4 rounded-lg outline-none border border-gray-100 bg-white transition-all focus:border-blue-500"
      {...field}
      {...props}
    />
  );
};

export default InputHook;
