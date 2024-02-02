import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

// Define the props the ImageCard will accept
interface ImageCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card className="max-w-sm overflow-hidden shadow-2xl mx-auto my-8 bg-stone-50">
      <CardContent className="flex justify-center items-center h-96">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full transform transition duration-300 ease-in-out hover:scale-110 focus:scale-110" // Adding focus:scale-110 for keyboard navigation
            tabIndex={0} // Make the image focusable
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
