import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Importing card components for structured layout
import { Skeleton } from "./ui/skeleton"; // Importing Skeleton for loading placeholder
import Image from "next/image";

// Interface to define the types of props ImageCard component will accept
interface ImageCardProps {
  title?: string | undefined; // Optional title for the image
  description?: string; // Optional description for the image (not used in the component but defined)
  imageUrl?: string; // Optional URL for the image source
  isLoading?: boolean; // Boolean to determine if the image is in the loading state
  src?: string | undefined;
  width?: number;
  height?: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  imageUrl,
  isLoading = false, // Default loading state to false
}) => {
  // Conditional rendering based on isLoading prop
  return isLoading ? (
    // Render Skeleton component when the image is loading
    <div className="w-full mx-auto my-4 overflow-hidden shadow-2xl opacity-100 sm:w-40 sm:h-48 md:w-80 md:h-96 dark-shadow-2xl rounded-xl">
      <Skeleton className="flex items-center justify-center w-full h-full">
        <div className="z-30 bg-gray-200 sm:w-24 sm:h-32 md:w-48 md:h-52 animate-pulse" />
      </Skeleton>
    </div>
  ) : (
    // Render the actual image card when the image is loaded
    <Card className="w-full flex items-center justify-center h-full mx-auto  pt-8 pb-16 overflow-hidden shadow-2xl sm:w-40 sm:h-48 md:w-80 md:h-96 dark-shadow-2xl dark:bg-gradient-to-b from-indigo-500 to-red-500 dark:bg-stone-900 dark:border-zinc-950 rounded-xl">
      {/* <CardContent className="z-20 flex items-center justify-center h-full m-3"> */}

      <div className="relative bg-transparent flex items-start mx-8  justify-center w-full h-full  overflow-hidden align-middle">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title || ""}
            // width={width || 200} // Use the original width or fallback to auto if not provided
            // height={height || 200} // Use the original height or fallback to auto if not provided
            layout="fill"
            objectFit="contain"
            quality={100}
            className="items-center transition duration-300 ease-in-out transform shrink hover:scale-110 focus:scale-110 shadow-lg"
          />
        )}
      </div>
      {/* </CardContent> */}
    </Card>
  );
};

export default ImageCard;
