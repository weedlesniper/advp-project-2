import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,                             // layout
    children: [
      { index: true, element: <Home /> },          // "/"
      { path: "videos/:id", element: <VideoPlayer /> }, //path for a specific video selected
      { path: "about", element: <About /> },       // "/about"
      { path: "*", element: <h1>404 Not Found</h1> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
