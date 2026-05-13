import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Produtos from "../pages/Produtos";
import Sacola from "../pages/Sacola";
import ProdutoDesc from "../pages/ProdutoDesc";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<ProdutoDesc />} />
        <Route path="/sacola" element={<Sacola />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default AppRoutes;
