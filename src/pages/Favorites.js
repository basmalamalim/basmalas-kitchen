import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites({ recipes }) {
  const { ids } = useFavorites();
  const list = recipes.filter((r) => ids.includes(r.id));

  return (
    <section className="view">
      <div className="page-head">
        <div className="container">
          <h1>Your favorites</h1>
          <p>Recipes you saved. They stay here after you close the browser.</p>
        </div>
      </div>
      <div className="container wrap">
        <div id="fav-grid" className="grid">
          {list.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
        {list.length === 0 && (
          <div id="fav-empty" className="notice">
            <p>You haven't saved any recipes yet. Tap the heart on a recipe to keep it here.</p>
            <Link className="btn" to="/recipes">Explore recipes</Link>
          </div>
        )}
      </div>
    </section>
  );
}