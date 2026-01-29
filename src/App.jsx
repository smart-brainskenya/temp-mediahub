import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css";
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load the gallery pages to reduce initial bundle size
const ImageGallery = lazy(() => import("./pages/ImageGallery"));
const VideoLibrary = lazy(() => import("./pages/VideoLibrary"));

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    color: 'var(--text-light)' 
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="images" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ImageGallery />
              </Suspense>
            } 
          />
          <Route 
            path="videos" 
            element={
              <Suspense fallback={<PageLoader />}>
                <VideoLibrary />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;