import React from "react";
import MotionButton from "./MotionButton";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface LoadMoreButtonProps {
  onClick: () => void; // Function to be called when button is clicked
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <MotionButton
      className="ml-0 bg-transparent border-transparent hover:bg-transparent"
      onClick={onClick}
      variant="outline"
      size="icon"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ChevronDownIcon className="shadow-xl stroke-primary fill-black dark:fill-white" />
    </MotionButton>
  );
};

export default LoadMoreButton;
