import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import CategoryTiles from "../components/CategoryTiles";
import Media from "../components/Media";
import { PAGE_SIZE, totalMinutes, timeText } from "../utils/helpers";

export default function Home({ recipes, setFilters }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const featured = recipes[new Date().getDate() % recipes.length];
  const popular = recipes.filter((r) => r.popular).slice(0, 4);
  const classics = recipes.filter((r) => r.categories.includes("Traditional Favorites")).slice(0, 3);
  const quick = recipes.filter((r) => totalMinutes(r) && totalMinutes(r) <= 40).slice(0, 4);

  const pickCategory = (category) => {
    setFilters((f) => ({ ...f, category, query: "", shown: PAGE_SIZE }));
    navigate("/recipes");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((f) => ({ ...f, query: text, category: "all", shown: PAGE_SIZE }));
    navigate("/recipes");
  };

  return (
    <section className="view">
      <div className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Cook the dishes Egypt eats every day</h1>
            <p className="hero-sub">
              From a street-corner koshari to a Friday fattah. Find a recipe, follow the steps
              and save your favorites.
            </p>
            <form className="search-form" role="search" onSubmit={handleSearch}>
              <label htmlFor="hero-input" className="sr">Search recipes by name</label>
              <input
                id="hero-input"
                type="search"
                placeholder="Try koshari, molokhia, basbousa..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="btn btn-accent" type="submit">Search</button>
            </form>
            <div className="chips">
              <span>Start with:</span>
              <button className="chip" type="button" onClick={() => pickCategory("Breakfast")}>Breakfast</button>
              <button className="chip" type="button" onClick={() => pickCategory("Soups")}>Soups</button>
              <button className="chip" type="button" onClick={() => pickCategory("Desserts")}>Desserts</button>
            </div>
          </div>

          <div id="featured" className="hero-visual">
            {featured && (
              <Link
                className="plate-link"
                to={"/recipe/" + featured.id}
                aria-label={"Open featured recipe: " + featured.name}
              >
                <div className="plate">
                  <Media key={featured.id} recipe={featured} className="plate-media" />
                </div>
                <div className="plate-caption">
                  <span className="label">Featured today</span>
                  <strong>{featured.name}</strong>
                  <span className="time">
                    {timeText(featured)} · serves {featured.servings || "varies"}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container wrap">
        <div className="section-head">
          <h2>Popular Egyptian recipes</h2>
          <Link to="/recipes">View all recipes</Link>
        </div>
        <div id="popular" className="grid">
          {popular.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>

        <div className="section-head">
          <h2>Browse by category</h2>
          <Link to="/categories">All categories</Link>
        </div>
        <CategoryTiles id="cat-tiles-home" recipes={recipes} onPick={pickCategory} />

        <div className="section-head"><h2>Discover Egyptian classics</h2></div>
        <div id="classics" className="grid">
          {classics.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>

        <div className="section-head">
          <h2>Quick and easy meals</h2>
          <span className="lead">About 40 minutes or less</span>
        </div>
        <div id="quick" className="grid">
          {quick.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </section>
  );
}