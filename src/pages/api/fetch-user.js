export default async function handler(req, res) {
  try {
    let response;
    const credentials = req.body;

    if (req.method === 'POST') {
      response = await fetch(`${process.env.DB_URI}/users.json`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok)
      throw new Error(
        'There were troubles connecting with database. Please try again later.'
      );

      res.status(201).send('Account created successfully.');

    } else {
      response = await fetch(`${process.env.DB_URI}/users.json`);

      if (!response.ok)
      throw new Error(
        'There were troubles connecting with database. Please try again later.'
      );

      const users = await response.json();

      res.status(200).json(users);
    }


    //
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
}
