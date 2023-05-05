import generateRandomId from '@/utils/generate-id';
import { useState } from 'react';
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async function (query, nextPage = null) {
    try {
      setError(null);
      setIsLoading(true);

      const fetchQuery = nextPage
        ? [nextPage, {}]
        : [
            '/api/fetch-recipes',
            {
              method: 'POST',
              body: query,
            },
          ];

      const res = await fetch(fetchQuery[0], fetchQuery[1]);

      if (!res.ok) throw new Error(`Failed to fetch data :(. Please try again later! (${res.status})`); 
      const data = await res.json();

      //  If there is no data.count or it's empty throw an error stating that there were no recipes found
      if (!data.count || data.count === 0)
        throw new Error('No recipes found. Try searching for something else!');

      //  Make it so the pagination has only up to 10 pages
      const recipesCount = data.count <= 60 ? data.count : 60;

      //  Generate custom id for each recipe
      const recipes = data.hits.map((recipe) => ({
        ...recipe,
        id: recipe.recipe.uri.split('_')[1],
      }));

      const recipesObj = {
        recipesCount,
        recipes,
        pages: data._links,
      };

      return recipesObj;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, error };
}
