"use client";

import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";

// Define the structure of the image data
interface ImageData {
  id: string; // Use a unique identifier for the key prop
  title: string;
  description?: string;
  url: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    // Fetch images from the API
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/images");
        const data = await response.json();
        setImages(data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          // title={image.title}
          // description={image.description}
          imageUrl={image.url} // Adjust the property name based on API's response
        />
      ))}
    </div>
  );
};

export default ImageGallery;
