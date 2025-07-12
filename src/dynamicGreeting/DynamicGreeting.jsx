import { useEffect, useState } from "react";

function DynamicGreeting() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    fetchTime();

    () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{time}</div>;
}

export default DynamicGreeting;
