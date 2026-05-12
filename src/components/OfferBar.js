import React, { useState, useEffect } from "react";

export default function OfferBar({ offers }) {

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(offers[0]?.time || 0);

  // change offer every 4 sec
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(slider);
  }, [offers]);

  // countdown
  useEffect(() => {
    setTime(offers[index]?.time || 0);

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [index, offers]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (offers.length === 0) return null;

  return (
    <div className="offer-bar">
      <span>{offers[index].text}</span>
      <span className="timer"> ⏳ {formatTime(time)}</span>
    </div>
  );
}