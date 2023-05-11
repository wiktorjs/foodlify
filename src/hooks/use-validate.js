import bcrypt from 'bcryptjs';

export default function useValidate() {
  const validateUser = async function ({ username, password, query }) {
    try {
      const getRes = await fetch('/api/fetch-user');
      const users = await getRes.json();

      // Find user in database
      const foundUser = Object.values(users).find(
        (user) => user.username === username
      );

      // ! Sign up case
      if (query.type === 'sign-up') {
        if (foundUser) throw new Error('Username already exists.');

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const credentials = {
          username,
          hashedPassword,
          salt,
        };

        const postRes = await fetch('/api/fetch-user', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Account created !');

      }

      // ! Sign in case
      if (query.type === 'sign-in') {
        if (!foundUser) throw new Error('Username not found.');

        // Hash entered password with salt that was generated upon account creation
        const enteredHashedPassword = bcrypt.hashSync(password, foundUser.salt);

        // Check if it's valid
        const passwordIsValid =
          enteredHashedPassword === foundUser.hashedPassword;
        //

        if (!passwordIsValid) throw new Error('Invalid password.');

        console.log('Logged in!');
      }

    } catch (err) {
      console.log(err.message);
    }

  };

  return { validateUser };
}
