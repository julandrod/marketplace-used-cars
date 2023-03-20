import React from "react";
import { brands } from "../dummy-brands";

const CarBrands = () => {
  return (
    <section className="max-w-5xl mx-auto mb-20">
      <div>
        <h2 className="text-center text-4xl text-[#17181C] font-semibold mb-6 p-4">
          Puedes elegir la marca que mas te guste
        </h2>
      </div>
      <div className="grid grid-flow-row md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="border rounded-2xl flex flex-col items-center bg-slate-200 p-4 hover:border-2 hover:border-slate-700"
          >
            <img className="h-24 w-30" src={brand.logo} alt={brand.brand} />
            <span className="text-[#17181C] font-medium mt-2">
              {brand.brand.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarBrands;
