import React from "react";

const InputHero = ({ title, type, placeholder }) => {
  return (
    <div className="min-w-full">
      <label>{title}</label>
      <input
        className="rounded-md p-2 mt-2 mb-3 text-primary-dark w-11/12"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputHero;
