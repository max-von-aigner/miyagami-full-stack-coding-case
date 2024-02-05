"use client";

import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import MotionButton from "./MotionButton";
import MotionInput from "./MotionInput";
import { AnimatePresence } from "framer-motion";

// Define props interface to type the props passed to the component
interface ImageSearchProps {
  onSearch: (tags: string) => void; // Function to be called on search submission
}

// Define the ImageSearch functional component
const ImageSearch: React.FC<ImageSearchProps> = ({ onSearch }) => {
  // State hooks for managing search tags and visibility of the search bar
  const [tags, setTags] = useState<string>(""); // Holds the current search query
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false); // Controls the visibility of the search bar
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the search input for focus management

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submitting search with tags:", tags); // Optional: log for debugging
    onSearch(tags); // Call the passed onSearch function with current tags
  };

  // Toggle search bar visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle visibility state
    if (!isSearchVisible) {
      // If making search visible, focus the input after it is visible
      setTimeout(() => {
        inputRef.current?.focus(); // Focus the search input
      }, 0); // Timeout ensures the input is visible and mounted before focusing
    }
  };

  // Render the component
  return (
    <div className="flex">
      {/* Search toggle button with motion effects */}
      <MotionButton
        variant="outline"
        size="icon"
        className="bg-transparent border-transparent hover:bg-transparent"
        onClick={toggleSearchVisibility} // Toggle search bar on click
        whileHover={{ scale: 1.2 }} // Enlarge on hover
        whileTap={{ scale: 0.9 }} // Shrink on click
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <MagnifyingGlassIcon className="scale-125 stroke-primary" />
      </MotionButton>
      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center order-first max-w-sm"
      >
        {/* AnimatePresence for exit animation of the search input */}
        <AnimatePresence>
          {isSearchVisible && (
            // Animated search input
            <MotionInput
              ref={inputRef}
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)} // Update tags on change
              placeholder="Search" // Placeholder text
              className="h-8 border-transparent rounded-full outline-none max-w-36 dark:bg-slate-800/60 bg-orange-200/80 hover:bg-orange-200/95 dark:hover:bg-slate-950 hover:text-accent-foreground"
              initial={{ scale: 0.8 }} // Initial animation state
              animate={{ scale: 1 }} // Animate to normal size
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }} // Exit animation
              key="searchBar" // Key for AnimatePresence
              transition={{ duration: 0.5, ease: "easeOut", type: "spring" }} // Animation transition settings
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default ImageSearch;
