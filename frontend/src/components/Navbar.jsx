import React from "react";
import { Search } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { logout, selectAuthState } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector(selectAuthState);
  const { pathname } = useLocation();
  const transparency = pathname === "/";
  const dispatch = useDispatch();

  return (
    <header
      className={`text-primary-light top-0 z-10 bg-${
        transparency ? "transparent" : "primary-dark"
      }`}
    >
      <section className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-semibold">
          🚘 Autousado
        </Link>
        <nav className="hidden lg:block space-x-8 text-l">
          <span className="hover:opacity-80 cursor-pointer">Vehiculos</span>
          <span className="hover:opacity-80 cursor-pointer">Quienes somos</span>
          <Link to="/contact" className="hover:opacity-80 cursor-pointer">
            Contacto
          </Link>
        </nav>
        <div className="hidden sm:flex items-center  text-primary-dark">
          <Search className="absolute ml-1" />
          <input
            className="bg-white focus:outline-red-700 focus:shadow-sm pl-8 rounded-lg p-1 inset-y-0 w-11/12"
            type="search"
            placeholder="Buscar..."
          />
        </div>
        <div className="hidden md:block text-l text-primary-dark">
          <Link
            to={`${token ? "" : "/login"}`}
            className={`p-2 border-2 border-solid border-white rounded-lg hover:border-red-700 text-${
              transparency ? "primary-dark" : "primary-light"
            }`}
          >
            {token ? "Mi perfil" : "Ingresar/Registrarse"}
          </Link>
          {token ? (
            <>
              <Link
                to=""
                className="p-2 ml-4 border-2 border-solid border-primary-dark bg-white rounded-lg hover:border-red-700"
              >
                Publicar
              </Link>
              <Link
                onClick={() => dispatch(logout())}
                to="/"
                className="p-2 ml-4 bg-white border-2 border-solid border-primary-dark rounded-lg hover:border-red-700"
              >
                Salir
              </Link>
            </>
          ) : null}
        </div>
        <div>
          <button className="text-3xl md:hidden focus:outline">&#9776;</button>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
