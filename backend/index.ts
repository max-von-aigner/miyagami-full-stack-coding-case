import express, { Request, Response, response } from "express";
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
  try {
    const flickrApiUrl = "https://api.flickr.com/services/rest";
    const method = "flickr.photos.getRecent";
    const extras = "url_s,url_m,url_l";
    const perPage = req.query.per_page || "100";
    const page = req.query.page || "1";

    // Make an Axios GET request to the Flickr API with necessary parameters
    const response = await axios.get(flickrApiUrl, {
      params: {
        method: method,
        api_key: env.FLICKR_API_KEY,
        extras: extras,
        per_page: perPage,
        page: page,
        format: "json",
        nojsoncallback: 1,
      },
    });

    // Send the Flickr API response data to the client
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "An error occurred while fetching images" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
