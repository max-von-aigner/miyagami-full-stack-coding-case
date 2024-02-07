import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const port = process.env.PORT || 3001; // Define the port number to run the server on

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Define an interface for the environment variables to ensure type safety
interface Env {
  FLICKR_API_KEY: string; // Flickr API Key
}

// Retrieve the API key from environment variables or default to an empty string
const env: Env = {
  FLICKR_API_KEY: process.env.FLICKR_API_KEY || "",
};

const FLICKR_EXTRAS = "url_z,o_dims,description,tags";

// Endpoint to fetch recent images from Flickr
app.get("/api/images", async (req: Request, res: Response) => {
  // Extract page and per_page query parameters or default them
  const page = req.query.page || 1;
  const perPage = req.query.per_page || 21;

  try {
    // Construct the API URL for fetching recent photos
    const apiUrl = `https://api.flickr.com/services/rest/`;
    // Make a request to the Flickr API
    const response = await axios.get(apiUrl, {
      params: {
        method: "flickr.photos.getRecent",
        api_key: env.FLICKR_API_KEY,
        sort: "interestingness-desc", // Sort by interestingness
        extras: FLICKR_EXTRAS,
        per_page: perPage,
        page: page,
        format: "json",
        nojsoncallback: 1,
      },
    });

    // Transform the API response to the desired format
    const data = response.data;
    const images = data.photos.photo.map((photo: any) => ({
      id: photo.id,
      title: photo.title,
      description: photo.description._content,
      tags: photo.tags,
      url: photo.url_z, // URL of the photo
      width: photo.width_o, // Get image size to retain original aspect ratio when rendering
      height: photo.height_o,
    }));

    // Send the transformed data back to the client
    res.json({ images, pages: data.photos.pages });
  } catch (error) {
    console.error("Error fetching recent images from Flickr:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to search for images based on tags
app.get("/api/search", async (req, res) => {
  // Extract query parameters including tags, tag mode, page, per_page, and text
  const { tags, tagmode = "any", page = 1, per_page = 21, text } = req.query;

  interface FlickrPhoto {
    id: string;
    title: string;
    server: string;
    secret: string;
  }

  try {
    const apiUrl = `https://api.flickr.com/services/rest/`;
    // Make a request to the Flickr API for searching photos
    const response = await axios.get(apiUrl, {
      params: {
        method: "flickr.photos.search",
        api_key: env.FLICKR_API_KEY,
        tags: tags,
        tag_mode: tagmode,

        sort: "interestingness-desc", // Sort by interestingness to address safe search issue and improve quality of images displayed
        safe_search: 1, // Enforce safe search to filter out inappropriate content
        extras: FLICKR_EXTRAS, // Include extras
        per_page: per_page,
        page: page,
        format: "json",
        nojsoncallback: 1,
      },
    });

    // Transform the API response to the desired format
    const data = response.data;
    const images = data.photos.photo.map((photo: FlickrPhoto) => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`, // Constructed image URL
    }));

    // Send the transformed data back to the client
    res.json({ images, pages: data.photos.pages });
  } catch (error) {
    console.error("Error fetching images from Flickr:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
