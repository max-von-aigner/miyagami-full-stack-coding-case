import React from "react";
import { ListBulletIcon, GridIcon } from "@radix-ui/react-icons";
import MotionButton from "./MotionButton";

// Props definition for the GridViewToggle component
interface GridViewToggleProps {
  setLayoutMode: (mode: string) => void; // Function to update the layout mode state in the parent component
  layoutMode: string; // The current layout mode (either 'grid' or 'list')
}

// Component for toggling between grid and list view layouts
const GridViewToggle: React.FC<GridViewToggleProps> = ({
  setLayoutMode,
  layoutMode,
}) => {
  return (
    <div className="flex">
      {/* MotionButton is a wrapper around a button element to include animations */}
      <MotionButton
        // Toggle the layout mode between 'grid' and 'list' on button click
        onClick={() => setLayoutMode(layoutMode === "grid" ? "list" : "grid")}
        variant="outline"
        size="icon"
        // Animation properties for hover and tap interactions
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="bg-transparent border-transparent hover:bg-transparent"
      >
        {/* Conditional rendering based on the current layout mode */}
        {layoutMode === "grid" ? (
          // Display the list icon if the current mode is 'grid'
          <ListBulletIcon className="stroke-primary fill-black dark:fill-white" />
        ) : (
          // Display the grid icon if the current mode is 'list'
          <GridIcon className="stroke-primary fill-black dark:fill-white" />
        )}
      </MotionButton>
    </div>
  );
};

export default GridViewToggle;
