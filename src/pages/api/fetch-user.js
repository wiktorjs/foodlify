export default async function handler(req, res) {
  try {
    const credentials = req.body;

    const response = await fetch(
      `${process.env.DB_URI}/users.json`,
      req.method === 'POST'
        ? {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        : {}
    );

    if (!response.ok)
      throw new Error(
        'There were troubles connecting with database. Please try again later.'
      );

    if (req.method !== 'POST') {
      const users = await response.json();

      res.status(200).json(users);

      return;
    }


    res.status(201).json('Account created successfully.');

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
}
