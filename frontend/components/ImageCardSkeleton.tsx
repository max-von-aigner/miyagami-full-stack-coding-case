import { Skeleton } from "@/components/ui/skeleton";

interface ImageCardSkeletonProps {
  className?: string; // Optional prop for additional custom class names
  children?: React.ReactNode; // Define children prop to accept React elements or components
}

const ImageCardSkeleton: React.FC<ImageCardSkeletonProps> = ({ children }) => {
  return (
    <div>
      <Skeleton className="w-full sm:w-40 sm:h-48 md:w-80 md:h-96 rounded-md" />
      {children}
    </div>
  );
};

export default ImageCardSkeleton;
