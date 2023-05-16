export default function useUser() {
  const updateUser = async function (user) {
    try {

      const res = await fetch('/api/update-user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });

      if(!res.ok) throw new Error('Something went wrong.');


    } catch (err) {
      console.err(err.message);
    }
  };

  return { updateUser };
}
