// src/components/Sidebar.js
import Link from "next/link";
import React from "react";
import {
  MdOutlineProductionQuantityLimits,
  MdCategory,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";

const links = [
  { link: "/", name: "Acceuil", icon: <IoHomeOutline /> },
  {
    link: "/products",
    name: "Produits",
    icon: <MdOutlineProductionQuantityLimits />,
  },
  { link: "/categories", name: "Categories", icon: <MdCategory /> },
  { link: "/orders", name: "Commandes", icon: <MdOutlineShoppingBag /> },
  //   { link: "/suppliers", name: "Fournisseurs" ,icon:},
];

const Sidebar = () => {
  return (
    <div className="grid bg-slate-600 w-[13vw] h-[100vh] text-white">
      {links.map((e, i) => (
        <Link key={i} href={e.link} className="flex items-center gap-2 px-2">
          {e.icon}
          {e.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
