import { useField } from "formik";
import React from "react";

const RadioFormik = (props) => {
  const [field] = useField(props);
  return (
    <div className="flex items-center gap-x-3">
      <label className="cursor-pointer custom-radio">
        <input
          {...field}
          type="radio"
          className="hidden"
          value={props.value}
          checked={props.checked}
        />
        <div className="bg-white w-full h-full rounded-full"></div>
      </label>
      <span>{props.gender}</span>
    </div>
  );
};

export default RadioFormik;
