import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownHook = ({
  control,
  setValue,
  name,
  data,
  dropDownLabel = "Select your job",
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropDownValueWatch = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  const handleClickDropDownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropDownLabel);
  useEffect(() => {
    if (dropDownValueWatch === "") setLabel(dropDownLabel);
  }, [dropDownValueWatch]);
  return (
    <div className="relative" ref={nodeRef}>
      <div
        className="p-4 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer noSelect transition-all"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999999 1L4.16795 5.75193C4.56377 6.34566 5.43623 6.34566 5.83205 5.75192L9 1"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="0.2 0.2"
          />
        </svg>
      </div>
      <div
        className={`absolute top-full flex flex-col justify-center left-0 w-full rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            className="p-5 cursor-pointer hover:bg-green-100"
            onClick={handleClickDropDownItem}
            data-value={item.value}
            key={item.id}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownHook;
