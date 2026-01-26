export default function VideoCard({ video, onClick }) {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <video controls poster={video.poster}>
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>Duration: {video.duration}</p>
      </div>
    </div>
  );
}