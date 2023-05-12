import bcrypt from 'bcryptjs';
import { useState } from 'react';

export default function useValidate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateUser = async function ({ username, password, query }) {
    try {
      setError(null);
      setIsLoading(true);
   
      const getRes = await fetch('/api/fetch-user');
      if (!getRes.ok)
        throw new Error(
          'There were troubles connecting with database. Please try again later.'
        );

      const users = await getRes.json();

      // Find user in database
      const foundUser =
        users &&
        Object.values(users).find((user) => user.username.toLowerCase() === username.toLowerCase());

      // ! Sign up case
      if (query.type === 'sign-up') {
        if (foundUser) throw new Error('Username already exists. Sign in to continue.');

        // Generate salt and hash entered password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const credentials = {
          username,
          hashedPassword,
          salt,
        };

        // Forward data to API route
        const postRes = await fetch('/api/fetch-user', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!postRes.ok)
          throw new Error(
            'There were trouble accessing the database. Please try again later.'
          );

        // Log user in
        const message = await postRes.json();
        console.log(message);
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

        // Display error if not
        if (!passwordIsValid) throw new Error('Invalid password.');

        // Log user in
        return {
          user: foundUser.username,
          bookmarks: foundUser.bookmarks || ['test bookmark'],
          cart: foundUser.cart || ['test cart'],
        }

      }
    } catch (err) {
      setError(err.message);

    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validateUser };
}
