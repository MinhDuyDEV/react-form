import React from "react";

const Button = () => {
  return (
    <button
      className="w-full p-5 bg-blue-500 text-white outline-none rounded-lg mt-5 font-semibold"
      type="submit"
    >
      {formik.isSubmitting ? (
        <div
          className={`w-6 h-6 rounded-full animate-spin border-2 border-white border-t-transparent m-auto ${
            formik.isSubmitting ? "opacity-50" : ""
          }`}
          disabled={formik.isSubmitting}
        ></div>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default Button;
