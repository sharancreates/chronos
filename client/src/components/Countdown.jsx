import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Function to calculate time remaining
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        return "UNLOCKED"; // Signal to parent component could go here
      }

      // Math to get days, hours, minutes, seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format string
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    // Run immediately, then every second
    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    // Cleanup interval when component is removed
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{ fontFamily: 'monospace', color: '#d4af37', fontSize: '1.2rem', marginTop: '10px' }}>
      ⏳ {timeLeft}
    </div>
  );
};

export default Countdown;