"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import MotionButton from "./MotionButton";
import MotionInput from "./MotionInput";

interface ImageSearchProps {
  onSearch: (tags: string, tagmode: string) => void; // Updated to expect two parameters
}

const ImageSearch: React.FC<ImageSearchProps> = ({ onSearch }) => {
  const [tags, setTags] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false); // State to control visibility
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(tags, "all"); // Example of calling onSearch with both parameters
  };

  // const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible); // Function to toggle visibility

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
    // Additional logic to focus only when showing the search bar
    if (!isSearchVisible) {
      // setTimeout ensures focus logic is pushed to the end of the event queue,
      // allowing the input to be mounted before attempting to focus.
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="flex">
      <MotionButton
        variant="outline"
        size="icon"
        className="bg-transparent border-transparent hover:bg-transparent"
        onClick={toggleSearchVisibility} // Use the button to toggle the search bar visibility
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <MagnifyingGlassIcon className="scale-125 stroke-primary" />
      </MotionButton>
      {isSearchVisible && ( // Conditionally render the Input based on isSearchVisible state
        <form
          onSubmit={handleSubmit}
          className="flex max-w-sm items-center order-first"
        >
          <MotionInput
            ref={inputRef}
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Search"
            className=" max-w-36 rounded-full  outline-none dark:bg-slate-800/60 border-transparent bg-orange-200/80 hover:bg-orange-200/95 dark:hover:bg-accent hover:text-accent-foreground"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              type: "spring",
            }}
          />
        </form>
      )}
    </div>
  );
};

export default ImageSearch;
