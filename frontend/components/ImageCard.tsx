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
        <img
          className="max-h-60 w-auto object-cover object-center p-4"
          src={imageUrl}
          alt={title}
        />
      </CardContent>
    </Card>
  );
};

export default ImageCard;
