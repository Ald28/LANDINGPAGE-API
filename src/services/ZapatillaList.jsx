import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getZapatillas } from '../api/api_zapatilla';
import { Heart } from 'lucide-react';

const ZapatillaList = ({ vistaGrid }) => {
    const [zapatillas, setZapatillas] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchZapatillas = async (currentPage) => {
        try {
            setLoading(true);
            const data = await getZapatillas(currentPage);

            if (data.zapatillas.length === 0) {
                setHasMore(false);
                return;
            }

            setZapatillas((prev) => {
    const nuevos = data.zapatillas.filter(
        (nuevo) => !prev.some((existente) => existente.id === nuevo.id)
    );
    return [...prev, ...nuevos];
});
        } catch (error) {
            console.error("Error fetching zapatillas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZapatillas(page);
    }, [page]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <section className={vistaGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {zapatillas.map((zapa) => (
                    <div
                        key={zapa.id}
                        className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all 
                            ${vistaGrid ? "" : "flex items-center gap-4 p-4"}`}
                    >
                        <img
                            src={zapa.imagen}
                            alt={zapa.modelo}
                            className={vistaGrid ? "w-full h-48 object-cover" : "w-32 h-32 object-cover rounded-lg"}
                        />
                        <div className={vistaGrid ? "p-4" : "flex-1"}>
                            <h3 className="text-lg font-bold text-gray-800">{zapa.marca} {zapa.modelo}</h3>
                            <p className="text-gray-600 mt-1">${zapa.precio}</p>
                            <div className="mt-4 flex justify-between items-center text-gray-400 text-sm">
                                <Heart className="hover:text-red-500 cursor-pointer" size={16} />
                                <button onClick={() => navigate(`/detalle/${zapa.id}`)}>Ver detalles</button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Cargar más"}
                    </button>
                </div>
            )}
        </>
    );
};

export default ZapatillaList;
