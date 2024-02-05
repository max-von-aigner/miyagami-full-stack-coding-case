"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import MotionButton from "./MotionButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ModeToggle = () => {
  // Destructure setTheme function from useTheme hook to change the theme
  const { setTheme } = useTheme();

  // Render the component
  return (
    <DropdownMenu>
      {/* Trigger button for the dropdown menu */}
      <DropdownMenuTrigger asChild>
        <MotionButton
          variant="outline" // Button style variant
          size="icon" // Button size
          whileHover={{ scale: 1.2 }} // Enlarge on hover
          whileTap={{ scale: 0.9 }} // Shrink on tap
          transition={{ type: "spring", stiffness: 400, damping: 17 }} // Spring animation
          className="ml-0 bg-transparent border-transparent hover:bg-transparent" // Styling for the button
        >
          {/* Icons change based on the current theme mode */}
          <SunIcon className="transition-all scale-100 rotate-0 stroke-primary fill-black dark:-rotate-90 dark:scale-0" />{" "}
          {/* Visible in light mode */}
          <MoonIcon className="absolute transition-all scale-0 rotate-90 dark:fill-white dark:rotate-0 dark:scale-100" />{" "}
          {/* Visible in dark mode */}
        </MotionButton>
      </DropdownMenuTrigger>
      {/* Dropdown menu content */}
      <DropdownMenuContent
        align="end" // Align the dropdown menu
        className="bg-orange-200/80 dark:bg-slate-800/60" // Styling for light and dark themes
      >
        {/* Menu items to select theme */}
        <DropdownMenuItem
          onClick={() => setTheme("light")} // Set theme to light mode
          className="hover:bg-orange-400/20 dark:hover:bg-slate-950" // Hover effect
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")} // Set theme to dark mode
          className="hover:bg-orange-400/20 dark:hover:bg-slate-950" // Hover effect
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")} // Set theme based on system preference
          className="hover:bg-orange-400/20 dark:hover:bg-slate-950" // Hover effect
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
