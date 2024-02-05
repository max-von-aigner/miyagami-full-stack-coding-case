import React from "react";
import { ListBulletIcon, GridIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import MotionButton from "./MotionButton";

interface GridViewToggleProps {
  setLayoutMode: (mode: string) => void; // Function to set layout mode in parent component
  layoutMode: string; // Current layout mode
}

const GridViewToggle: React.FC<GridViewToggleProps> = ({
  setLayoutMode,
  layoutMode,
}) => {
  return (
    <div className="flex">
      <MotionButton
        onClick={() => setLayoutMode(layoutMode === "grid" ? "list" : "list")}
        variant="outline"
        size="icon"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="bg-transparent border-transparent hover:bg-transparent"
      >
        <ListBulletIcon className="stroke-primary fill-black dark:fill-white" />
      </MotionButton>
      <MotionButton
        onClick={() => setLayoutMode(layoutMode === "list" ? "grid" : "grid")}
        variant="outline"
        size="icon"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="bg-transparent border-transparent hover:bg-transparent"
      >
        <GridIcon className="stroke-primary fill-black dark:fill-white" />
      </MotionButton>
    </div>
  );
};

export default GridViewToggle;
