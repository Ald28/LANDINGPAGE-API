import { useState } from "react";
import {
  Plus,
  Package,
  Camera,
} from "lucide-react";
import { addZapatilla } from "../../api/api_zapatilla";

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    color: "",
    precio: "",
    imagen: "",
    genero: "",
    edad: "",
    descripcion: "",
    tallas: []
  });

  const handleTallaChange = (talla) => {
    setFormData((prev) => {
      const exists = prev.tallas.includes(talla);
      return {
        ...prev,
        tallas: exists
          ? prev.tallas.filter((t) => t !== talla)
          : [...prev.tallas, talla]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("marca", formData.marca);
      formDataToSend.append("modelo", formData.modelo);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("precio", formData.precio);
      formDataToSend.append("genero", formData.genero);
      formDataToSend.append("edad", formData.edad);
      formDataToSend.append("descripcion", formData.descripcion);

      formData.tallas.forEach((talla, index) => {
        formDataToSend.append(`tallas[${index}]`, talla);
      });

      formDataToSend.append("imagen", formData.imagen);

      await addZapatilla(formDataToSend);
      alert("Producto agregado con éxito");

    } catch (error) {
      console.error("Error al agregar el producto", error);
      alert("Error al agregar el producto");
    }

  }

  const tallasDisponibles = ["38", "39", "40", "41", "42", "43", "44"];

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-8">
      {/* Fondo con gradiente y capa oscura */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce" />
      <div className="absolute bottom-32 right-16 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce delay-1000" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white border-opacity-20">

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse" />
              <div className="relative bg-white p-4 rounded-full shadow-lg">
                <Plus className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Agregar Zapatilla
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Sube tus zapatillas y encuentra el que más te guste 🥰
            </p>
          </div>

          {/* Formulario */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Marca */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Marca
              </label>
              <input
                type="text"
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              />
            </div>

            {/* Modelo */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Modelo
              </label>
              <input
                type="text"
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              />
            </div>

            {/* Color */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Color
              </label>
              <input
                type="text"
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Precio
              </label>
              <input
                type="text"
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
            </div>

            {/* Género (select) */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Género
              </label>
              <select
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>

            {/* Edad (select) */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Edad
              </label>
              <select
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="Adulto">Adulto</option>
                <option value="Niño">Niño</option>
              </select>
            </div>

            {/* Descripción */}
            <div className="md:col-span-2 flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Descripción
              </label>
              <textarea
                rows={3}
                className="rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm resize-none"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>

            {/* Tallas (checkboxes) */}
            <div className="md:col-span-2">
              <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package size={18} className="text-purple-600" />
                Tallas Disponibles
              </label>
              <div className="flex flex-wrap gap-4">
                {tallasDisponibles.map((talla) => (
                  <label key={talla} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={talla}
                      checked={formData.tallas.includes(talla)}
                      onChange={() => handleTallaChange(talla)}
                      className="accent-purple-600"
                    />
                    {talla}
                  </label>
                ))}
              </div>
            </div>

            {/* Imagen */}

            <div className="md:col-span-2 mt-2">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Camera size={18} className="text-purple-600" />
                Imagen del Producto
              </label>
              <input
                type="text"
                placeholder="O pega el enlace de la imagen aquí"
                className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              />
            </div>

            {/* Botón */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                Subir Producto
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            ¡Tu producto será visible para toda la comunidad de intercambios! 🌟
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
