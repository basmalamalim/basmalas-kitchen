import { useFavorites } from "../context/FavoritesContext";

export default function FavButton({ id }) {
  const { has, toggle } = useFavorites();
  const on = has(id);

  return (
    <button
      className={"fav" + (on ? " on" : "")}
      onClick={() => toggle(id)}
      aria-pressed={on}
      aria-label={on ? "Remove from favorites" : "Add to favorites"}
    >
      {on ? "♥" : "♡"}
    </button>
  );
}