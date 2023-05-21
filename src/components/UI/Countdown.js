import { useEffect, useState } from 'react';

export default function Countdown({ time, countdownHandler }) {
  const [count, setCount] = useState(time);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) clearInterval(timer);

        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    count === 0 && countdownHandler();
  }, [count]);

  return count;
}
