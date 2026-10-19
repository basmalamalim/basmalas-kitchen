import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { loadRecipes } from "./api/api";
import { PAGE_SIZE } from "./utils/helpers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import RecipeDetail from "./pages/RecipeDetail";

// Scrolls to the top and resets the title whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!pathname.startsWith("/recipe/")) {
      document.title = "Masry Kitchen | Egyptian Recipes";
    }
  }, [pathname]);
  return null;
}

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState({ type: "loading", message: "" });
  const [filters, setFilters] = useState({
    category: "all",
    query: "",
    sort: "az",
    shown: PAGE_SIZE,
  });

  const load = useCallback(async () => {
    setStatus({ type: "loading", message: "" });
    try {
      const data = await loadRecipes();
      setRecipes(data);
      setStatus({ type: "ready", message: "" });
    } catch (error) {
      console.error(error);
      const offline = error instanceof TypeError;
      setStatus({
        type: "error",
        message: offline
          ? "We could not reach the recipe data. Check your connection and try again."
          : error.message,
      });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <ScrollToTop />
      <Header />

      {status.type === "loading" && (
        <div className="container status" role="status">
          <div className="spinner" aria-hidden="true"></div>
          <p>Loading recipes...</p>
        </div>
      )}

      {status.type === "error" && (
        <div className="container status" role="status">
          <div className="notice error">
            <p>{status.message}</p>
            <button className="btn" type="button" onClick={load}>Try again</button>
          </div>
        </div>
      )}

      {status.type === "ready" && (
        <main id="main" tabIndex="-1">
          <Routes>
            <Route path="/" element={<Home recipes={recipes} setFilters={setFilters} />} />
            <Route
              path="/recipes"
              element={<Recipes recipes={recipes} filters={filters} setFilters={setFilters} />}
            />
            <Route
              path="/categories"
              element={<Categories recipes={recipes} setFilters={setFilters} />}
            />
            <Route path="/favorites" element={<Favorites recipes={recipes} />} />
            <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
            <Route path="*" element={<Home recipes={recipes} setFilters={setFilters} />} />
          </Routes>
        </main>
      )}

      <Footer />
    </>
  );
}