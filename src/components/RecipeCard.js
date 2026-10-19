import { Link } from "react-router-dom";
import Media from "./Media";
import FavButton from "./FavButton";
import { timeText } from "../utils/helpers";

export default function RecipeCard({ recipe: r }) {
  return (
    <article className="card">
      <Link className="card-media" to={"/recipe/" + r.id} aria-label={"Open " + r.name}>
        <Media recipe={r} className="thumb" />
      </Link>
      <FavButton id={r.id} />
      <div className="card-body">
        <div className="meta">
          <span className="tag">{r.categories[0]}</span>
          <span className="time">{timeText(r)}</span>
        </div>
        <h3>
          <Link to={"/recipe/" + r.id}>{r.name}</Link>
        </h3>
        <p>{r.description}</p>
      </div>
    </article>
  );
}