"use client";

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from "react";
import ImageSearch from "./ImageSearch"; // Adjust the import path as needed
import ImageCard from "./ImageCard"; // Assuming you have this component for displaying individual images
import Navbar from "./Navbar";

// Define the structure of the image data if not already defined
interface ImageData {
  id: string;
  title: string;
  description?: string;
  url: string; // Adjust according to the actual structure of your image data
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    // Initially fetch all images or display a default set
    fetchImages();
  }, []);

  const fetchImages = async (tags?: string, tagmode: string = "all") => {
    const apiUrl = tags
      ? `http://localhost:3001/api/search?tags=${tags}&tagmode=${tagmode}`
      : "http://localhost:3001/api/images";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      let formattedImages;
      if (tags) {
        // Processing search results
        formattedImages = data.items.map((item: any) => ({
          id: item.link, // Extract ID or use another unique identifier
          title: item.title,
          description: item.description,
          url: item.media.m,
        }));
      } else {
        // Processing initial load
        formattedImages = data.photos.map((photo: any) => ({
          id: photo.id,
          title: photo.title,
          description: photo.description,
          url: photo.url,
        }));
      }
      setImages(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSearch = (tags: string, tagmode: string) => {
    fetchImages(tags, tagmode);
  };

  return (
    <div>
      <Navbar className="flex">
        <ImageSearch onSearch={handleSearch} />
      </Navbar>

      <div>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            title={image.title}
            description={image.description}
            imageUrl={image.url} // Adjust the property name based on your API's response structure
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
