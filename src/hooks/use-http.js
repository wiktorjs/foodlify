import { useState } from 'react';
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async function (query, nextPage = null) {
    try {
      setError(null);
      setIsLoading(true);

      if (!nextPage) {
        const res = await fetch('/api/fetch-recipes', {
          method: 'POST',
          body: query,
        });
        const data = await res.json();

        // | If there is no data.count or it's empty throw an error stating that there were no recipes found
        if (!data.count || data.count === 0)
          throw new Error(
            'No recipes found. Try searching for something else!'
          );

        // | Make it so the pagination has only up to 10 pages
        const recipesCount = data.count <= 60 ? data.count : 60;

        const recipesObj = {
          recipesCount,
          recipes: data.hits,
          pages: data._links,
        };

        return recipesObj;
      }

      const res = await fetch(nextPage);
      if (!res.ok)
        throw new Error('Something went wrong :(. Please try again later!');

      const data = await res.json();

      const recipesObj = {
        recipes: data.hits,
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
