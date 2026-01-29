import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";
import VideoPreviewModal from "../components/VideoPreviewModal";
import SearchBar from "../components/SearchBar";
import RequestAssetModal from "../components/RequestAssetModal";

export default function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return [...new Set(videos.map(vid => vid.category))].sort();
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter(vid => {
      const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "" || vid.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="library-container">
      <div className="library-header">
        <div className="library-title-section">
          <h1>Video Library</h1>
          <p>Watch and learn with our engaging videos!</p>
        </div>
        <button className="btn-cross-nav" onClick={() => navigate("/images")}>
          <span>🖼</span> Explore Images
        </button>
      </div>

      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        placeholder="Find a video to watch..."
      />
      
      <div className="video-grid">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
          ))
        ) : (
          <div className="no-results">
            <p>No videos found matching your search.</p>
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

      {selectedVideo && (
        <VideoPreviewModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      {isRequestModalOpen && (
        <RequestAssetModal 
          initialQuery={searchQuery}
          initialType="video"
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}
    </div>
  );
}
