import { useState } from 'react';
import { API_KEY, APP_ID } from '../../credentials';
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ present: false, message: '' });

  const fetchData = async function (query) {
    try {
      setError({present: false, message: ''})
      setIsLoading(true);  

      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
      );
      if (!res.ok) throw new Error('Failed to fetch data :(');

      const data = await res.json();

      const recipesObj = {
        recipes: data.hits,
        pages: data._links,
      };

      return recipesObj;
    } catch (err) {
      setError({ present: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, error };
}
