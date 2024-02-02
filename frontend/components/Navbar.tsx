"use client";

import React, { useState, useEffect, ReactNode } from "react";

// Adding a type for props to explicitly include children of type ReactNode
type NavbarProps = {
  children?: ReactNode;
  className?: String;
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setHidden(true); // If scrolling down, hide the header
    } else {
      setHidden(false); // If scrolling up, show the header
    }
    setLastScrollY(window.scrollY); // Update the last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-16 bg-white/0 backdrop-blur-md p-5 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Render the children here */}
      {children}
    </div>
  );
};

export default Navbar;
