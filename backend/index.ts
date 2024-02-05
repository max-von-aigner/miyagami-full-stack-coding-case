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

// Public Photo Feed Endpoint
app.get("/api/images", async (req: Request, res: Response) => {
  const page = req.query.page || 1;
  const perPage = req.query.per_page || 10;
  try {
    const flickrFeedUrl =
      "https://www.flickr.com/services/feeds/photos_public.gne";
    const response = await axios.get(flickrFeedUrl, {
      params: {
        format: "json",
        nojsoncallback: 1, // Include this to get a pure JSON response
        page: page,
        per_page: perPage, // Add any other necessary query parameters here
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

//Photo search endpoint
app.get("/api/search", async (req, res) => {
  const { tags, tagmode = "any", page = 1, per_page = 21, text } = req.query;

  interface FlickrPhoto {
    id: string;
    title: string;
    server: string;
    secret: string;
  }

  // Construct the URL for the Flickr API call
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=YOUR_API_KEY&tags=${tags}&tag_mode=${tagmode}&text=${text}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Transform the data as needed before sending it to the frontend
    const images = data.photos.photo.map((photo: FlickrPhoto) => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`, // Example URL format, adjust if using different size
    }));

    res.json({ images, pages: data.photos.pages });
  } catch (error) {
    console.error("Error fetching images from Flickr:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
