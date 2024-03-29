"use client";

import React, { useState, useEffect } from "react";
import ImageSearch from "./ImageSearch";
import ImageCard from "./ImageCard";
import LoadMoreButton from "./LoadMoreButton";
import Navbar from "./Navbar";
import ModeToggle from "./ModeToggle";
import GridViewToggle from "./GridViewToggle";
import Logo from "./Logo";

// Interface for typing the structure of image data
interface ImageData {
  id: string; // Unique identifier for each image
  title: string; // Title of the image
  url: string; // URL of the image source
  // width?: number;
  // height?: number;
}

const ImageGallery: React.FC = () => {
  // State management for images, layout mode, pagination, and loading state
  const [images, setImages] = useState<ImageData[]>([]);
  const [layoutMode, setLayoutMode] = useState("list"); // "grid" or "list" layout mode
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [currentTags, setCurrentTags] = useState<string | undefined>(undefined); // Tags for filtering images
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for asynchronous operations

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Async function to fetch images from the API
  const fetchImages = async (tags?: string, page: number = 1) => {
    setIsLoading(true); // Start loading process
    const perPage = 21; // Define number of images to fetch per page

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    // Determine API URL based on whether tags are provided for search or fetching general images
    console.log("API BASE URL: ", API_BASE_URL);
    const apiUrl = tags
      ? `${API_BASE_URL}/api/search?tags=${tags}&page=${page}&per_page=${perPage}`
      : `${API_BASE_URL}/api/images?page=${page}&per_page=${perPage}`;
    try {
      const response = await fetch(apiUrl); // Fetch data from API
      const data = await response.json(); // Parse JSON response
      console.log("API response", data); // Log API response for debugging
      // Map data to ImageData format
      const newImages = data.images.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        // width: parseInt(item.width_o), // Assuming 'width_o' is the property name provided by the API for the original width
        // height: parseInt(item.height_o),
      }));

      console.log("New images array:", newImages); // Log new images array for debugging

      // Update state with new images, either setting them directly or appending to existing images
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error("Error fetching images:", error); // Log any errors
    } finally {
      setIsLoading(false); // End loading process
    }
  };

  // Function to handle search action
  const handleSearch = (tags: string) => {
    setCurrentPage(1); // Reset to first page for new search results
    setCurrentTags(tags); // Update tags for filtering
    fetchImages(tags, 1); // Fetch images based on search tags
  };

  // Function to load more images (pagination)
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1; // Increment page number
    fetchImages(currentTags, nextPage); // Fetch next page of images
    setCurrentPage(nextPage); // Update current page state
  };

  // Render the component
  return (
    <div>
      <Navbar className="items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full py-4 px-5">
          <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
            <Logo />
          </div>
          <div className="flex justify-center md:justify-end items-center w-full md:w-auto  md:mt-0 space-x-2">
            <ImageSearch onSearch={handleSearch} />
            <GridViewToggle
              setLayoutMode={setLayoutMode}
              layoutMode={layoutMode}
            />
            <ModeToggle />
          </div>
        </div>
      </Navbar>

      {/* Display images in either grid or list layout based on layoutMode state */}
      <div
        className={
          layoutMode === "grid"
            ? "grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-2 sm:gap-16 grid-breakpoint:grid-cols-3 xl-grid-breakpoint:grid-cols-4"
            : "flex flex-col gap-8 md:gap-16"
        }
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            title={image.title}
            imageUrl={image.url}
            isLoading={isLoading}
          />
        ))}
      </div>
      {/* Conditionally render LoadMoreButton if not in loading state */}
      {!isLoading && (
        <div className="flex justify-center my-8">
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
