import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getZapatillasId, putZapatilla } from "../../api/api_zapatilla";

const EditarZapatilla = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        precio: '',
        color: '',
        imagen: '',
        tallas: ''
    });

    useEffect(() => {
        const formData = async () => {
            try {
                const data = await getZapatillasId(id);
                console.log('Producto cargado:', data);
                setFormData({
                    ...data,
                    tallas: Array.isArray(data.tallas) ? data.tallas.join(',') : ''
                });
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        formData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                tallas: formData.tallas
                    .split(',')
                    .map(t => Number(t.trim()))
                    .filter(n => !isNaN(n))
            };

            await putZapatilla(id, dataToSend);
            alert("Producto actualizado con éxito");
            navigate('/');
        } catch (error) {
            console.error("Error al actualizar zapatilla:", error);
            alert("Hubo un error al actualizar");
        }
    };

    if (loading)
        return <div className="text-center text-gray-500 mt-10">Cargando detalles...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Editar Zapatilla</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" className="border p-2 rounded" />
                <input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" className="border p-2 rounded" />
                <input name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" type="number" className="border p-2 rounded" />
                <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" className="border p-2 rounded" />
                <input name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de imagen" className="border p-2 rounded" />
                <input name="tallas" value={formData.tallas} onChange={handleChange} placeholder="Tallas (separadas por coma)" className="border p-2 rounded" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar cambios</button>
            </form>
        </div>
    );
};

export default EditarZapatilla;
