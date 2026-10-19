export const PAGE_SIZE = 6;

export const CATEGORIES = [
  "Breakfast",
  "Main Dishes",
  "Soups",
  "Vegetarian",
  "Desserts",
  "Traditional Favorites",
];

export const totalMinutes = (r) => (r.prepMinutes || 0) + (r.cookMinutes || 0);

export const timeText = (r) =>
  totalMinutes(r) ? totalMinutes(r) + " min" : "Time varies";

// Builds the correct URL for files inside the "public" folder
export const assetUrl = (path) => process.env.PUBLIC_URL + "/" + encodeURI(path);