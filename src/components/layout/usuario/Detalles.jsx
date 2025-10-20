import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getZapatillasId, deleteZapatilla } from '../../../api/api_zapatilla';
import { ArrowLeft } from 'lucide-react';

const Detalles = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const data = await getZapatillasId(id);
                console.log('Producto cargado:', data);
                setProducto(data);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    const handleEliminar = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await deleteZapatilla(id);
                console.log("Producto eliminado con éxito");
                navigate('/');
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Hubo un error al eliminar el producto.");
            }
        }
    };

    if (loading)
        return <div className="text-center text-gray-500 mt-10">Cargando detalles...</div>;

    if (!producto)
        return <div className="text-center text-red-500 mt-10">Producto no encontrado.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ArrowLeft className="mr-2" size={20} />
                    Volver a productos
                </button>

                <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <img
                        src={producto.imagen}
                        alt={producto.modelo}
                        className="w-full h-80 object-cover rounded-xl border"
                    />

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {producto.marca} {producto.modelo}
                        </h2>
                        <p className="text-gray-600 text-lg mb-2">
                            <span className="font-semibold text-gray-700">Precio:</span> ${producto.precio}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-semibold">Color:</span> {producto.color}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-semibold">Tallas:</span> {String(producto.tallas).split('')}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-semibold">Género:</span> {producto.genero}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-semibold">Edad recomendada:</span> {producto.edad}
                        </p>
                        <p className="text-gray-600 mt-4">
                            <span className="font-semibold">Descripción:</span>
                            <br />
                            {producto.descripcion}
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        onClick={handleEliminar}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Eliminar producto
                    </button>

                    <button
                        onClick={() => navigate(`/zapatillas/${id}/editar`)}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Editar producto
                    </button>

                    <button
                        // onClick={}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Agregar al carrito
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Detalles;
