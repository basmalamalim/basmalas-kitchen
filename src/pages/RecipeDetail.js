import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Media from "../components/Media";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const { has, toggle } = useFavorites();
  const r = recipes.find((x) => x.id === Number(id));

  useEffect(() => {
    document.title = r ? r.name + " | Masry Kitchen" : "Masry Kitchen | Egyptian Recipes";
  }, [r]);

  if (!r) {
    return (
      <section className="view">
        <div className="container wrap">
          <div id="detail">
            <div className="notice">
              <p>We could not find that recipe.</p>
              <Link className="btn" to="/recipes">Back to recipes</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const on = has(r.id);
  const related = recipes
    .filter((x) => x.id !== r.id && x.categories.some((c) => r.categories.includes(c)))
    .slice(0, 3);

  return (
    <section className="view">
      <div className="container wrap">
        <div id="detail">
          <Link to="/recipes">&larr; Back to recipes</Link>

          <div className="detail-top">
            <Media key={r.id} recipe={r} className="thumb" />
            <div>
              <p className="ar-name" lang="ar">{r.arabicName}</p>
              <h1>{r.name}</h1>
              <p>{r.description}</p>
              <ul className="facts">
                <li>{r.categories.join(", ")}</li>
                <li>Prep: {r.prepMinutes ? r.prepMinutes + " min" : "varies"}</li>
                <li>Cook: {r.cookMinutes ? r.cookMinutes + " min" : "varies"}</li>
                <li>Serves: {r.servings || "varies"}</li>
              </ul>
              <button
                className={"btn" + (on ? "" : " btn-ghost")}
                aria-pressed={on}
                onClick={() => toggle(r.id)}
              >
                {on ? "♥ Saved to favorites" : "♡ Add to favorites"}
              </button>
            </div>
          </div>

          <div className="detail-body">
            <div className="panel">
              <h2>Ingredients</h2>
              <ul>
                {(r.ingredients || []).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h2>Instructions</h2>
              <ol>
                {(r.steps || []).map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ol>
            </div>
          </div>

          <p className="detail-note">
            Times and quantities are typical estimates. Egyptian families cook these dishes in
            many regional variations.
          </p>

          {related.length > 0 && (
            <>
              <h2 className="related">You might also like</h2>
              <div className="grid">
                {related.map((x) => (
                  <RecipeCard key={x.id} recipe={x} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}