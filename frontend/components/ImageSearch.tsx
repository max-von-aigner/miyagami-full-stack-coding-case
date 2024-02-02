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
        className=" rounded-full"
      />
      <Button type="submit" className="bg-stone-50 text-black">
        Search
      </Button>
    </form>
  );
};

export default ImageSearch;
