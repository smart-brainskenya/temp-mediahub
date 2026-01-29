import { useState, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../data/images";
import ImageCard from "../components/ImageCard";
import ImagePreviewModal from "../components/ImagePreviewModal";
import SearchBar from "../components/SearchBar";
import RequestAssetModal from "../components/RequestAssetModal";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return [...new Set(images.map(img => img.category))].sort();
  }, []);

  const filteredImages = useMemo(() => {
    return images.filter(img => {
      const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           img.alt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "" || img.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <div className="gallery-title-section">
          <h1>Image Gallery</h1>
          <p>Discover a world of amazing images for your projects!</p>
        </div>
        <button className="btn-cross-nav" onClick={() => navigate("/videos")}>
          <span>▶</span> Explore Videos
        </button>
      </div>

      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        placeholder="What are you looking for?"
      />
      
      <div className="image-grid">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <ImageCard key={img.id} image={img} onClick={setSelectedImage} />
          ))
        ) : (
          <div className="no-results">
            <p>No images found matching your search.</p>
            <button 
              className="btn-secondary"
              onClick={() => setIsRequestModalOpen(true)}
              style={{ marginTop: '1rem' }}
            >
              Didn't find what you're looking for? Request it.
            </button>
          </div>
        )}
      </div>

      {selectedImage && (
        <ImagePreviewModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {isRequestModalOpen && (
        <RequestAssetModal 
          initialQuery={searchQuery}
          initialType="image"
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}
    </div>
  );
}
