import { CATEGORIES } from "../utils/helpers";

export default function CategoryTiles({ recipes, onPick, id }) {
  return (
    <div id={id} className="tiles">
      {CATEGORIES.map((c) => {
        const n = recipes.filter((r) => r.categories.includes(c)).length;
        return (
          <button key={c} className="tile" onClick={() => onPick(c)}>
            <strong>{c}</strong>
            <span>
              {n} recipe{n === 1 ? "" : "s"}
            </span>
          </button>
        );
      })}
    </div>
  );
}