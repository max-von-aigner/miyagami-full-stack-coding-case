"use client";

import React, { useState, useEffect } from "react";
import ImageSearch from "./ImageSearch"; // Adjust the import path as needed
import ImageCard from "./ImageCard"; // Adjust the import path as needed
import LoadMoreButton from "./LoadMoreButton"; // Adjust the import path as needed
import Navbar from "./Navbar"; // Adjust the import path as needed
import ModeToggle from "./ModeToggle"; // Adjust the import path as needed
import GridViewToggle from "./GridViewToggle"; // Adjust the import path as needed
import Logo from "./Logo"; // Adjust the import path as needed

interface ImageData {
  id: string;
  title: string;
  description?: string;
  url: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [layoutMode, setLayoutMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTags, setCurrentTags] = useState<string | undefined>(undefined);
  const [tagmode, setTagmode] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (
    tags?: string,
    tagmode: string = "all",
    page: number = 1
  ) => {
    setIsLoading(true); // Start loading
    // Simulate fetching images with a delay
    setTimeout(async () => {
      const perPage = 21; // Number of images per page, adjust as needed
      const apiUrl = tags
        ? `http://localhost:3001/api/search?tags=${tags}&tagmode=${tagmode}&page=${page}`
        : `http://localhost:3001/api/images?page=${page}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const newImages = (tags ? data.items : data.photos).map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.media ? item.media.m : item.url,
          })
        );

        if (page === 1) {
          setImages(newImages);
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false); // Stop loading after the images have been fetched
      }
    }, 3000); // Delay of 3 seconds
  };

  const handleSearch = (tags: string, tagmode: string = "all") => {
    setCurrentPage(1); // Reset page number for new search
    setCurrentTags(tags); // Update current tags for potential "load more" functionality
    setTagmode(tagmode); // Update tagmode
    fetchImages(tags, tagmode, 1); // Fetch with new search parameters
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchImages(currentTags, tagmode, nextPage);
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <Navbar logo={<Logo />} className="flex">
        <ImageSearch onSearch={handleSearch} />
        <GridViewToggle setLayoutMode={setLayoutMode} layoutMode={layoutMode} />
        <ModeToggle />
      </Navbar>

      <div
        className={
          layoutMode === "grid"
            ? "grid grid-cols-3 gap-16"
            : "flex flex-col gap-16"
        }
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            title={image.title}
            description={image.description}
            imageUrl={image.url}
            isLoading={isLoading}
          />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <LoadMoreButton onClick={handleLoadMore} />
      </div>
    </div>
  );
};

export default ImageGallery;

//----------------
