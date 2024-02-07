"use client";

import React, { useState, useEffect, ReactNode, useCallback } from "react";

// Adding a type for props to explicitly include children of type ReactNode
type NavbarProps = {
  logo?: ReactNode;
  children?: ReactNode;
  className?: string; // Use lowercase "string" for the className type
};

const Navbar: React.FC<NavbarProps> = ({ logo, children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setHidden(true); // If scrolling down, hide the header
    } else {
      setHidden(false); // If scrolling up, show the header
    }
    setLastScrollY(window.scrollY); // Update the last scroll position
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-20 bg-white/0 backdrop-blur-md  z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Navbar;
