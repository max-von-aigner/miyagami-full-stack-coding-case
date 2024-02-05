import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ImageCardSkeleton from "./ImageCardSkeleton";
// Define the props the ImageCard will accept
interface ImageCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isLoading?: boolean; // Add a loading prop
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  imageUrl,
  isLoading = false, // Default loading to false
}) => {
  // Use the ternary operator directly inside the return statement
  return isLoading ? (
    <Card className="w-full sm:w-40 sm:h-48 md:w-80 md:h-96 overflow-hidden shadow-2xl dark-shadow-2xl mx-auto my-4 ">
      <CardContent className="w-full ml-0">
        <ImageCardSkeleton className="w-full sm:w-40 sm:h-48 md:w-80 md:h-96 overflow-hidden shadow-2xl dark-shadow-2xl mx-auto my-8 h-full">
          <ImageCardSkeleton />
        </ImageCardSkeleton>
      </CardContent>
    </Card>
  ) : (
    <Card className="w-full sm:w-40 sm:h-48 md:w-80 md:h-96 overflow-hidden shadow-2xl dark-shadow-2xl mx-auto dark:bg-gradient-to-b from-indigo-500 to-red-500 dark:bg-stone-900 dark:border-zinc-950">
      <CardContent className="flex justify-center items-center h-full m-3">
        <div className="flex overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={title}
            className="shrink transform transition duration-300 ease-in-out hover:scale-110 focus:scale-110" // Adding focus:scale-110 for keyboard navigation
            tabIndex={0} // Make the image focusable
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
