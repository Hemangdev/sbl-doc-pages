import React, { useEffect, useState } from "react";

const CounterDown = () => {
  const startDate = new Date('August 13, 2024 00:00:00');
  const endDate = new Date('August 13, 2024 23:59:59');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const currentDate = new Date();
  const shouldDisplayCounter = currentDate >= startDate && currentDate <= endDate;

  return (
    <>
      {shouldDisplayCounter && (
        <section className="counter-section">
          <div className="container">
            <div className="row">
              <p className="blink-soft">HURRY! SALE ENDS IN</p>
              <div className="col-lg-12">
                <div className="counter-col">
                  <span>{String(timeLeft.hours).padStart(2, '0')}
                    <br /> HOURS</span>:<span>{String(timeLeft.minutes).padStart(2, '0')}
                    <br /> MINUTES</span>:<span>{String(timeLeft.seconds).padStart(2, '0')}
                    <br /> SECONDS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CounterDown;