
export default async function handler(req, res) {
  try {
    const user = req.body;
    const updates = {
        bookmarks: user.newBookmarks,
        cart: user.newCart
    }

    const response = await fetch(`${process.env.DB_URI}/users/${user.uID}.json`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: { 'Content-Type': 'application/json' },
    });

    if(!response.ok) throw new Error('Something went wrong. Please try again later.');
    
    res.status(200).json({status: 200, message: 'Account updated successfully'});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
}
