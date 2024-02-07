# Flickr Feed Viewer and Search - "shutter stream"

This project is a full-stack web application that interfaces with Flickr's public feeds to display images and allows users to search for images by tags. It's built with a backend in NodeJS, ExpressJS, and TypeScript, and a frontend using Next.js.

## Purpose

The purpose of this project is to demonstrate coding abilities, technical experience, and design solutions for a Full-Stack Engineer role at Miyagami.

## Project Structure

- `backend/`: Contains the ExpressJS server setup, API routes, and Flickr API integration.
- `frontend/`: Contains the Next.js application including app, components, and styling.

## Technologies Used

- TypeScript
- NodeJS
- ExpressJS
- Next.js
- Tailwind CSS
- Shadcn UI library
- Framer Motion animation library

## Features

- On page load, the application loads images from Flickr's public feed in a grid or list view.
- Users can search for images by tags using a search box.
- Responsive design for a seamless experience across devices.
- Dark mode support for reduced eye strain and improved accessibility.
- Ability to toggle between grid and list view modes for displaying images.
- Framer Motion animations enhance the user experience by providing smooth and engaging visual feedback.
- The Navbar hides automatically, when the user scrolls the page contend.

## Notes

-Despite the search button being initially considered a necessary feature, I opted not to implement a separate button, finding that the user experience remains intuitive and streamlined when triggering searches via the enter key.

-I also decided against incorporating the public feed due to the prevalence of graphic images, including nudity and explicit content. Although Flickr's safe search filter is activated by default, an excessive amount of not-safe-for-work (NSFW) content was still filtering through the API, making it unsuitable for public deployment. Instead, I access photos through the endpoint using the getRecent method, with results sorted by "interestingness descending." This approach enhances content quality and enriches the overall user experience.

## Live Demo and Source Code

- Live App: https://shutter-stream.vercel.app/
- Source Code: [GitHub Repository](https://github.com/max-von-aigner/miyagami-full-stack-coding-case)

## Setup and Installation

1. **Clone the repository:**

git clone https://github.com/max-von-aigner/miyagami-full-stack-coding-case.git

cd backend
npm install

3. **Start the backend server:**
   npm start

4. **Navigate to the frontend directory in a new terminal window and install dependencies:**
   cd frontend
   npm install

5. **Start the Next.js development server:**
   npm run dev

6. **Open your browser and go to `http://localhost:3000` to run the app locally.**
