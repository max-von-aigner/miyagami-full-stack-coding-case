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
    // Determine API URL based on whether tags are provided for search or fetching general images
    const apiUrl = tags
      ? `http://localhost:3001/api/search?tags=${tags}&page=${page}&per_page=${perPage}`
      : `http://localhost:3001/api/images?page=${page}&per_page=${perPage}`;
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
      <Navbar logo={<Logo />} className="flex">
        <ImageSearch onSearch={handleSearch} />
        <GridViewToggle
          setLayoutMode={setLayoutMode}
          layoutMode={layoutMode}
        />{" "}
        <ModeToggle />
      </Navbar>

      {/* Display images in either grid or list layout based on layoutMode state */}
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
            imageUrl={image.url}
            isLoading={isLoading}
            // width={image.width}
            // height={image.height}
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
