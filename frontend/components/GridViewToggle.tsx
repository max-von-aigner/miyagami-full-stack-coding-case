import React from "react";
import { ListBulletIcon, GridIcon } from "@radix-ui/react-icons";

interface GridViewToggleProps {
  setLayoutMode: (mode: string) => void; // Function to set layout mode in parent component
  layoutMode: string; // Current layout mode
}

const GridViewToggle = () => {
  return (
    <div>
      <button>
        <ListBulletIcon />
      </button>
    </div>
  );
};

export default GridViewToggle;
