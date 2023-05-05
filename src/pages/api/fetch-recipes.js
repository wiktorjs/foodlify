export default async function handler(req, res) {
  try {
    const query = req.body

    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`
    );

    if (!response.ok)
      throw new Error('Request failed.');
    const data = await response.json();

    res.status(200).send(data);

  } catch (err) {
    res.status(500).send({status: 500, error: err.message });
  }
}
