import { API_KEY, APP_ID } from "../../credentials";
export default async function useHttp() {

  try {
    const res = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=any&q=salad&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    if (!res.ok) throw new Error('Failed to fetch data :(');

    const data = await res.json();

    const recipesObj = {
      recipes: data.hits,
      pages: data._links,
    };

    return recipesObj;
  } catch (err) {
    return err;
  }
}
