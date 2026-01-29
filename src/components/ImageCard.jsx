export default function ImageCard({ image, onClick }) {
  // Inject w_400 resizing parameter into the URL
  // Original: .../file/MediaHub/...
  // New: .../file/w_400/MediaHub/...
  const thumbnailSrc = image.src.replace("/file/MediaHub/", "/file/w_400/MediaHub/");

  return (
    <div className="image-card" onClick={() => onClick(image)}>
      <img 
        src={thumbnailSrc} 
        alt={image.alt} 
        loading="lazy"
        decoding="async"
      />
      <div className="card-body">
        <h3>{image.title}</h3>
        <span className="category-tag">{image.category}</span>
      </div>
    </div>
  );
}