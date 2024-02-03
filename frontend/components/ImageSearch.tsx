"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageSearchProps {
  onSearch: (tags: string, tagmode: string) => void; // Updated to expect two parameters
}

const ImageSearch: React.FC<ImageSearchProps> = ({ onSearch }) => {
  const [tags, setTags] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(tags, "all"); // Example of calling onSearch with both parameters
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center">
      <Input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Search"
        className=" rounded-full bg-stone-50 hover:bg-slate-100 "
      />
      {/* <Button type="submit" className="bg-white/0 text-black">
        Search
      </Button> */}
      <Button type="submit" className="bg-white/0 text-black w-8 p-0">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </Button>
    </form>
  );
};

export default ImageSearch;
