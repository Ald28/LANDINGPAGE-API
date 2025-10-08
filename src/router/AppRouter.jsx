import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgregarProducto from "../pages/usuario/AgregarProducto";
import UserLayout from "../components/layout/usuario/UserLayout";
import InicioUsuario from "../pages/usuario/InicioUsuario";
import MujerUsuario from "../components/layout/usuario/mujer";
import NiñozUsuario from "../components/layout/usuario/Niñoz";
import Carrito from "../components/layout/Carrito";
import Detalles from "../components/layout/usuario/Detalles";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<UserLayout />}>
          <Route path="/agregar" element={<AgregarProducto />} />
          <Route path="/" element={<InicioUsuario />} />
          <Route path="/mujeres" element={<MujerUsuario />} />
          <Route path="/niñoz" element={<NiñozUsuario />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/detalle/:id" element={<Detalles />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;