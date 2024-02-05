import { Skeleton } from "@/components/ui/skeleton";

interface ImageCardSkeletonProps {
  className?: string; // Optional prop for additional custom class names
  children?: React.ReactNode; // Children prop to accept React elements or components
}

const ImageCardSkeleton: React.FC<ImageCardSkeletonProps> = ({ children }) => {
  return (
    <div>
      <Skeleton />

      {children}
    </div>
  );
};

export default ImageCardSkeleton;
