import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { ids } = useFavorites();

  return (
    <header className="site-header">
      <div className="container bar">
        <Link className="logo" to="/">
          <span className="logo-mark" lang="ar" aria-hidden="true">B</span>
          <span>Basmala's Kitchen</span>
        </Link>
        <nav aria-label="Main">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/recipes">Explore Recipes</NavLink></li>
            <li><NavLink to="/categories">Categories</NavLink></li>
            <li>
              <NavLink to="/favorites">
                Favorites <span id="fav-count" className="count">{ids.length}</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}