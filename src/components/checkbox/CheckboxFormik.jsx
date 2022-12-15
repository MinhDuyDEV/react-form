import { useField } from "formik";
import React from "react";

const CheckboxFormik = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3">
      <label className="cursor-pointer custom-checkbox">
        <input
          type="checkbox"
          id={props.name}
          checked={field.value}
          className="hidden"
          {...field}
          {...props}
        />
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-full h-full rounded-[4px] flex items-center justify-center transition-all custom-checkbox-square">
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7453 1.89733L3.93178 9.71087L0.254822 6.03391L1.17132 5.11741L3.93178 7.87137L10.8288 0.980835L11.7453 1.89733Z"
                fill="white"
              />
            </svg>
          </div>
          <label
            htmlFor={props.name}
            className="text-sm cursor-pointer noSelect"
          >
            {children}
          </label>
        </div>
      </label>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default CheckboxFormik;
