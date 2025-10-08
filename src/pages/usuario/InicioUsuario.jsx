import { useState } from "react";
import ZapatillaList from "../../services/ZapatillaList";
import {
    Search,
    Filter,
    Heart,
    MessageCircle,
    Star,
    ArrowRightLeft,
    Plus,
    User,
    ShoppingBag,
    Menu,
    Bell,
    Grid,
    List,
    MapPin,
    Eye,
    TrendingUp
} from "lucide-react";

const InicioUsuario = () => {

    const [vistaGrid, setVistaGrid] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <main className="container mx-auto px-4 py-10">

                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-3xl font-bold mb-1">Explora productos disponibles para intercambiar hoy</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-md">
                        <button
                            onClick={() => setVistaGrid(true)}
                            className={`p-2 rounded-md ${vistaGrid ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-500 hover:text-purple-600"
                                }`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setVistaGrid(false)}
                            className={`p-2 rounded-md ${!vistaGrid ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-500 hover:text-purple-600"
                                }`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Métricas destacadas */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <ShoppingBag className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-800">6</p>
                                <p className="text-sm text-gray-500">Cantidad de productos para hombres</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <ArrowRightLeft className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-800">127</p>
                                <p className="text-sm text-gray-500">Cantidad de productos para mujeres</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <User className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-800">1,234</p>
                                <p className="text-sm text-gray-500">Cantidad de productos para niñoz</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CARDS DE PRODUCTOS */}
                <ZapatillaList vistaGrid={vistaGrid}/>
            </main>
        </div>
    );

};

export default InicioUsuario;