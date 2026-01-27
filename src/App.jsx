import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ImageGallery from "./pages/ImageGallery";
import VideoLibrary from "./pages/VideoLibrary";
import "./App.css";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="images" element={<ImageGallery />} />
          <Route path="videos" element={<VideoLibrary />} />
        </Route>
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;