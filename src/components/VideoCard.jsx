export default function VideoCard({ video, onClick }) {
  // Use a smaller thumbnail for the grid view
  // video.poster is usually w_1280, we want w_400 for grid
  const thumbnailSrc = video.poster.replace("w_1280", "w_400");

  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="video-thumbnail-wrapper">
        <img 
          src={thumbnailSrc} 
          alt={video.title} 
          loading="lazy" 
          decoding="async"
        />
        <div className="play-overlay">
          <span className="play-icon">▶</span>
        </div>
      </div>
      <div className="video-info">
        <h3>{video.title}</h3>
        {video.duration && <p>Duration: {video.duration}</p>}
      </div>
    </div>
  );
}