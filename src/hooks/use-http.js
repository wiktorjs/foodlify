import { useState } from 'react';
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateRequestLimit = function () {
    // | Limiting request to one per 30s
    const timeBetweenRequests = 15 * 1000;
    const currentTime = Date.now();
    const lastRequestTime = localStorage.getItem('lastRequestTime') || 0;

    if (currentTime - +lastRequestTime < timeBetweenRequests)
      throw new Error(
        JSON.stringify({status: 403, message: 'Due to API limitations you may send only one request per 15 seconds. Your request will be sent automatically in:'})
      );
    //

    localStorage.setItem('lastRequestTime', currentTime);
  };

  const fetchData = async function (query, nextPage = null) {
    try {
      setError(null);
      setIsLoading(true);
      validateRequestLimit();

      const fetchQuery = {
        url: nextPage ? nextPage : '/api/fetch-recipes',
        data: nextPage
          ? {}
          : {
              method: 'POST',
              body: JSON.stringify(query),
            },
      };

      const res = await fetch(fetchQuery.url, fetchQuery.data);

      if (!res.ok)
        throw new Error(
            JSON.stringify({status: 500, message: `Failed to fetch data :(. Please try again later.`})
        );
      const data = await res.json();

      // | Fetching one recipe case
      if (query?.type === 'recipe') return data;

      //  If there is no data.count or it's empty throw an error stating that there were no recipes found
      if (!data.count || data.count === 0)
        throw new Error(JSON.stringify({status: 404, message: 'No recipes found. Try searching for something else!'}));

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
      setError(JSON.parse(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, error };
}
