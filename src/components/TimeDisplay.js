"use client";

import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Initial time set
    updateTime();

    // Update time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    // Create date object for current time
    const now = new Date();

    const formattedTime = now.toLocaleTimeString("en-US", {
      timeZone: "America/Fortaleza",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setCurrentTime(formattedTime);
  };

  return <span className="text-2xl font-semibold">{currentTime}</span>;
}
