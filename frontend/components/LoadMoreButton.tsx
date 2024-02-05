// LoadMoreButton.tsx

import React from "react";
import MotionButton from "./MotionButton";

interface LoadMoreButtonProps {
  onClick: () => void; // Function to be called when button is clicked
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <MotionButton className="" onClick={onClick}>
      More
    </MotionButton>
  );
};

export default LoadMoreButton;
