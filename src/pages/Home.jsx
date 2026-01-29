import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-hero-icon">🎨</div>
        
        <h1>What would you like to find today?</h1>
        <p>Explore our amazing collection of images and videos to use in your awesome coding projects!</p>
      </div>
      
      <div className="card-grid">
        <Link to="/images" className="card nav-card">
          <div className="nav-card-icon">🖼️</div>
          <h2>Image Gallery</h2>
          <p>Find the perfect pictures for your websites.</p>
          <span className="nav-card-action">Let's Go! →</span>
        </Link>
        
        <Link to="/videos" className="card nav-card">
          <div className="nav-card-icon">▶️</div>
          <h2>Video Library</h2>
          <p>Watch and learn with cool videos.</p>
          <span className="nav-card-action">Watch Now! →</span>
        </Link>
      </div>
    </div>
  );
}
