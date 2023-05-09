export default async function handler(req, res) {
  try {
    const { query, type } = JSON.parse(req.body);

    const urlFragment =
      type === 'search'
        ? `?type=any&q=${query}`
        : type === 'recipe'
        ? `/${query}?type=public`
        : '';
    //
   
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2${urlFragment}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`
    );

    if (!response.ok) throw new Error('Request failed.');
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ status: 500, error: err.message });
  }
}
