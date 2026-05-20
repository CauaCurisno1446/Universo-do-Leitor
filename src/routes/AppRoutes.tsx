import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Produtos from "../pages/Produtos";
import Sacola from "../pages/Sacola";
import ProdutoDesc from "../pages/ProdutoDesc";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";

import LoginAdmin from "../pages/admin/LoginAdmin";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProdutosAdmin from "../pages/admin/ProdutosAdmin";
import Pedidos from "../pages/admin/Pedidos";
import PerfilAdmin from "../pages/admin/PerfilAdmin";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas do cliente */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<ProdutoDesc />} />
        <Route path="/sacola" element={<Sacola />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas do admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<ProdutosAdmin />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="perfil" element={<PerfilAdmin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
