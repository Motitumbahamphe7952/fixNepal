
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FlexRow } from "../common";
import type { classProp } from "@/types/interface";

const navLinks = [
  { path: "/", label: "Mission" },
  { path: "/about", label: "How it Works" },
  { path: "/issue", label: "Issue" },
  { path: "/feedback", label: "Feedback" },
];

const NavBar = ({ className }: classProp) => {
  const location = useLocation();

  return (
    <nav
      className={`w-full py-4 flex justify-between items-center z-50 relative px-8 ${className}`}
    >
      <FlexRow className="flex items-center gap-4">
        <NavLink to="/" className="text-2xl font-bold tracking-tighter">
          FixNepal
        </NavLink>
      </FlexRow>

      <FlexRow className="relative items-center justify-center gap-2 text-gray-800 text-sm font-medium rounded-full border-2 p-1 bg-white/50 backdrop-blur-md">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`relative px-6 py-2 transition-colors duration-300 ${
                isActive ? "text-white" : "hover:text-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </NavLink>
          );
        })}
      </FlexRow>

      <FlexRow className="flex items-center gap-6 font-medium text-sm">
        <NavLink to="/register" className="hover:opacity-70 transition-opacity">
          New Account
        </NavLink>
        <NavLink
          to="/login"
          className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Login
        </NavLink>
      </FlexRow>
    </nav>
  );
};

export default NavBar;
