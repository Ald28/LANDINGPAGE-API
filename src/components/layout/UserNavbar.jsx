import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { GiRunningShoe } from "react-icons/gi";
import { FaChild, FaFemale } from "react-icons/fa";
import zpLogo from "../../images/zp.svg";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">
          <Link to="/">
            <img src={zpLogo} alt="ZP Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-600 transition">
            <HiOutlineUser className="text-lg" />
            Hombres
          </Link>
          <Link to="/mujeres" className="flex items-center gap-1 hover:text-indigo-600 transition">
            <FaFemale className="text-lg" />
            Mujeres
          </Link>
          <Link to="/niñoz" className="flex items-center gap-1 hover:text-indigo-600 transition">
            <FaChild className="text-lg" />
            Niñoz
          </Link>
          <Link to="/agregar" className="flex items-center gap-1 hover:text-indigo-600 transition">
            <GiRunningShoe className="text-lg" />
            Agregar zapatillas
          </Link>
          <Link to="/carrito" className="flex items-center gap-1 hover:text-indigo-600 transition">
            <HiOutlineShoppingCart className="text-lg" />
            Carrito
          </Link>
        </div>

        {/* Botón para menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 text-gray-700">
          <Link to="/" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Hombres
          </Link>
          <Link to="/mujeres" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Mujeres
          </Link>
          <Link to="/niñoz" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Niñoz
          </Link>
          <Link to="/agregar" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Agregar zapatillas
          </Link>
          <Link to="/carrito" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Carrito
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
