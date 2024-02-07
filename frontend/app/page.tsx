import React from "react";
import ImageGallery from "@/components/ImageGallery";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  xxs:px-3 xxs:pt-24 xxs:pb-20 xs:p-24 bg-orange-100 dark:bg-gray-900">
      <Navbar />
      <ImageGallery />
    </main>
  );
}
