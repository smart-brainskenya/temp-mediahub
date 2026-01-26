export default function ImageCard({ image, onClick }) {
  return (
    <div className="image-card" onClick={() => onClick(image)}>
      <img src={image.src} alt={image.alt} />
      <div className="card-body">
        <h3>{image.title}</h3>
        <span className="category-tag">{image.category}</span>
      </div>
    </div>
  );
}