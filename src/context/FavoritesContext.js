import { createContext, useContext, useEffect, useState } from "react";

const KEY = "masry-favorites";
const FavoritesContext = createContext(null);

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore storage errors */
    }
  }, [ids]);

  const has = (id) => ids.includes(id);
  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <FavoritesContext.Provider value={{ ids, has, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);