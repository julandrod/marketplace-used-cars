import React from "react";

const CarTypeCard = ({image, title}) => {
  return (
    <div className="w-1/5 flex flex-col justify-center items-center p-2 md:p-8">
      <div className="flex justify-center items-center rounded-full bg-white h-32 w-32 hover:border-2 hover:border-slate-700">
        <img className=" h-20 w-20" src={image} alt={title} />
      </div>
      <span className="mt-4 font-medium text-primary-dark">{title}</span>
    </div>
  );
};

export default CarTypeCard;
