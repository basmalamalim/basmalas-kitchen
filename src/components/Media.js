import { useState } from "react";
import { assetUrl } from "../utils/helpers";

// Shows the recipe photo, or an Arabic-name placeholder if it is missing or fails to load
export default function Media({ recipe, className }) {
  const [failed, setFailed] = useState(false);

  if (!recipe.image || failed) {
    return (
      <div
        className={className + " ph"}
        role="img"
        aria-label={recipe.name + " (photo not available)"}
      >
        <span lang="ar">{recipe.arabicName}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={assetUrl(recipe.image)}
      alt={recipe.name + ", " + recipe.description}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}