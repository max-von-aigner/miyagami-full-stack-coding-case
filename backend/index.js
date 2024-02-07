"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)(); // Create an Express application
const port = 3001; // Define the port number to run the server on
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
// Retrieve the API key from environment variables or default to an empty string
const env = {
    FLICKR_API_KEY: process.env.FLICKR_API_KEY || "",
};
const FLICKR_EXTRAS = "url_z,o_dims,description,tags";
// Endpoint to fetch recent images from Flickr
app.get("/api/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract page and per_page query parameters or default them
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 21;
    try {
        // Construct the API URL for fetching recent photos
        const apiUrl = `https://api.flickr.com/services/rest/`;
        // Make a request to the Flickr API
        const response = yield axios_1.default.get(apiUrl, {
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
        const images = data.photos.photo.map((photo) => ({
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
    }
    catch (error) {
        console.error("Error fetching recent images from Flickr:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Endpoint to search for images based on tags
app.get("/api/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract query parameters including tags, tag mode, page, per_page, and text
    const { tags, tagmode = "any", page = 1, per_page = 21, text } = req.query;
    try {
        const apiUrl = `https://api.flickr.com/services/rest/`;
        // Make a request to the Flickr API for searching photos
        const response = yield axios_1.default.get(apiUrl, {
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
        const images = data.photos.photo.map((photo) => ({
            id: photo.id,
            title: photo.title,
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`, // Constructed image URL
        }));
        // Send the transformed data back to the client
        res.json({ images, pages: data.photos.pages });
    }
    catch (error) {
        console.error("Error fetching images from Flickr:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
