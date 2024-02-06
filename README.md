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
- Animated Navbar for a modern experience.

## Notes

- Despite the search button being a required feauture, I decided against implementing a seaparate button, as the UX is good with triggering the search via the enyer key
- I decided to not implement the public feed, as it contained a lot of graphic imapges, such as nudity and porn. Flickr's safe search filter is enabled by default, but there was just to much NSFW-content coming through the API, to deploy this publicly. I acces the photos via the photos endpoint with the getRecent methond and then the results are sorted by "interesteingness descending" to improve the content quality and overall experience.

## Live Demo and Source Code

- Live Demo: [Link to live demo](#)
- Source Code: [GitHub Repository](https://github.com/<username>/<repository>)

## Setup and Installation

1. **Clone the repository:**

git clone https://github.com/<username>/<repository>.git

cd backend
npm install

3. **Start the backend server:**
   npm start

4. **Navigate to the frontend directory in a new terminal window and install dependencies:**
   cd frontend
   npm install

5. **Start the Next.js development server:**
   npm run dev

6. **Open your browser and go to `http://localhost:3000` to view the app.**
