import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the props the ImageCard will accept
interface ImageCardProps {
  title: string;
  description?: string;
  imageUrl: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card>
      <CardContent>
        {/* Image */}
        <img src={imageUrl} alt={title} />
        {/* Title */}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {/* Description */}
        {description && (
          <CardDescription>
            <p>{description}</p>
          </CardDescription>
        )}
      </CardContent>
      <CardFooter>{/* You can add footer content here if needed */}</CardFooter>
    </Card>
  );
};

export default ImageCard;
