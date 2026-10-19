import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container foot">
        <div>
          <strong>Basmala's Kitchen</strong>
          <p>
            A small collection of Egyptian home recipes. Times and quantities are typical
            estimates, so adjust to your taste and kitchen.
          </p>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Explore Recipes</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </div>
    </footer>
  );
}