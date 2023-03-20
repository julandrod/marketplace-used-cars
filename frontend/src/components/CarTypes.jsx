import React from "react";
import { fourByFour, coupe, hatchback, sedan, suv } from "../assets/types";
import CarTypeCard from "./CarTypeCard";

const CarTypes = () => {
  return (
    <section className="flex flex-col min-h-fit justify-between bg-white p-6 mb-8">
      <h2 className="text-center text-4xl text-primary-dark font-semibold mb-6 p-4">
        Encuentra el tipo de vehiculo que quieres
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col flex-wrap items-center w-full lg:flex-row lg:max-w-6xl lg:justify-between  bg-slate-200 rounded-xl">
        <CarTypeCard image={fourByFour} title="Camioneta" />
        <CarTypeCard image={suv} title="SUV" />
        <CarTypeCard image={coupe} title="Coupe" />
        <CarTypeCard image={hatchback} title="Compacto" />
        <CarTypeCard image={sedan} title="Sedan" />
      </div>
    </section>
  );
};

export default CarTypes;
