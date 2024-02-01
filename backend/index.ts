import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS

// Define an interface for the environment variables
interface Env {
  FLICKR_API_KEY: string;
}

// API KEY
const env: Env = {
  FLICKR_API_KEY: process.env.FLICKR_API_KEY || "",
};

console.log("Flickr API Key:", env.FLICKR_API_KEY);

// Public Photo Feed Endpoint
app.get("/api/images", async (req: Request, res: Response) => {
  try {
    const flickrFeedUrl =
      "https://www.flickr.com/services/feeds/photos_public.gne";
    const response = await axios.get(flickrFeedUrl, {
      params: {
        format: "json",
        nojsoncallback: 1, // Include this to get a pure JSON response
        // Add any other necessary query parameters here
      },
    });

    // Extract and transform the data to match your frontend structure
    const images = response.data.items.map((item: any) => ({
      id: item.link.match(/\/(\d+)\//)[1], // Extract the photo ID from the link
      title: item.title,
      description: item.description,
      url: item.media.m, // Adjust based on the available image URLs
    }));

    res.json({ photos: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "An error occurred while fetching images" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
