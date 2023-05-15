export default async function handler(req, res) {
  try {
    const user = req.body;
    console.log(user)
    return
    const response = await fetch(`${process.env.DB_URI}/users.json`, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.log(err);
  }
}
