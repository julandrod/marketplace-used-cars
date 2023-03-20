import React from "react";
import InputHero from "./InputHero";

const Hero = () => {
  return (
    <section className="bg-[url('/src/assets/car-bg.jpg')] min-h-fit bg-cover md:min-h-screen -mt-[4.5rem] p-6 pt-20 my-12 scroll-mt-20 widescreen:section-min-height tallscreen:section-min-height ">
      <div className="sm:flex sm:flex-col lg:flex-row pt-24 max-w-screen-sm md:max-w-6xl mx-auto text-primary-light">
        <div className="w-fit md:w-1/2 mx-auto p-6">
          <h2 className="text-2xl md:text-4xl leading-10 font-bold text-center sm:text-5xl mb-6 text-white ">
            Encuentra el vehiculo de tus sueños con unos kms de mas
          </h2>
        </div>
        <div className="hidden sm:block sm:w-fit w-1/2 mx-auto p-8 bg-primary-dark bg-opacity-70 rounded-md text-white">
          <div className="opacity-90 mb-3">
            <h3 className="text-xl">Buscar entre 141 vehiculos usados</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputHero title="Marca" type="search" placeholder="marca..." />
            <InputHero title="Modelo" type="search" placeholder="modelo..." />
            <InputHero
              title="Precio minimo"
              type="number"
              placeholder="precio minimo..."
            />
            <InputHero
              title="Precio maximo"
              type="number"
              placeholder="precio maximo..."
            />
            <div className="mt-2">
              <button className="bg-red-800 p-3 rounded-xl hover:opacity-70">
                Bucar vehiculos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
