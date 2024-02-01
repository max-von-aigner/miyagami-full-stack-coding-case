import Image from "next/image";
import React from "react";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImageGallery />
      <p>Hello</p>
    </main>
  );
}
