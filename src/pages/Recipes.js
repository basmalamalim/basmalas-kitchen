import { useMemo } from "react";
import RecipeCard from "../components/RecipeCard";
import { CATEGORIES, PAGE_SIZE, totalMinutes } from "../utils/helpers";

export default function Recipes({ recipes, filters, setFilters }) {
  const { category, query, sort, shown } = filters;

  const update = (changes) => setFilters((f) => ({ ...f, ...changes }));

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = recipes.filter((r) => {
      const inCategory = category === "all" || r.categories.includes(category);
      const matches = !q || (r.name + " " + r.arabicName).toLowerCase().includes(q);
      return inCategory && matches;
    });
    result.sort(
      sort === "time"
        ? (a, b) => totalMinutes(a) - totalMinutes(b)
        : (a, b) => a.name.localeCompare(b.name)
    );
    return result;
  }, [recipes, category, query, sort]);

  return (
    <section className="view">
      <div className="page-head">
        <div className="container">
          <h1>Explore recipes</h1>
          <p>Search by name, filter by category and sort the results.</p>
        </div>
      </div>

      <div className="container wrap">
        <div className="controls">
          <div>
            <label htmlFor="search">Search by name</label>
            <input
              id="search"
              type="search"
              placeholder="e.g. koshari or كشري"
              value={query}
              onChange={(e) => update({ query: e.target.value, shown: PAGE_SIZE })}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => update({ category: e.target.value, shown: PAGE_SIZE })}
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => update({ sort: e.target.value })}>
              <option value="az">Name (A to Z)</option>
              <option value="time">Shortest time first</option>
            </select>
          </div>
          <button
            id="reset"
            className="btn btn-ghost"
            type="button"
            onClick={() => update({ query: "", category: "all", sort: "az", shown: PAGE_SIZE })}
          >
            Reset filters
          </button>
        </div>

        <p id="recipe-count" className="lead" aria-live="polite">
          {list.length} recipe{list.length === 1 ? "" : "s"} found
        </p>

        <div id="recipe-grid" className="grid">
          {list.slice(0, shown).map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>

        {list.length === 0 && (
          <div id="empty" className="notice">
            <p>No recipes match your search. Try a different name or reset the filters.</p>
          </div>
        )}

        {list.length > shown && (
          <p className="center">
            <button
              id="load-more"
              className="btn btn-ghost"
              type="button"
              onClick={() => update({ shown: shown + PAGE_SIZE })}
            >
              Load more
            </button>
          </p>
        )}
      </div>
    </section>
  );
}