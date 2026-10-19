import { useNavigate } from "react-router-dom";
import CategoryTiles from "../components/CategoryTiles";
import { PAGE_SIZE } from "../utils/helpers";

export default function Categories({ recipes, setFilters }) {
  const navigate = useNavigate();

  const pickCategory = (category) => {
    setFilters((f) => ({ ...f, category, query: "", shown: PAGE_SIZE }));
    navigate("/recipes");
  };

  return (
    <section className="view">
      <div className="page-head">
        <div className="container">
          <h1>Categories</h1>
          <p>Pick a category to see its recipes.</p>
        </div>
      </div>
      <div className="container wrap">
        <CategoryTiles id="cat-tiles" recipes={recipes} onPick={pickCategory} />
      </div>
    </section>
  );
}