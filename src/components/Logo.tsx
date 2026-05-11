"use client";

import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <h1 className="text-[var(--marrom)] select-none" id="logo">
        Universo do Leitor
      </h1>
    </NavLink>
  );
}

export default Logo;
