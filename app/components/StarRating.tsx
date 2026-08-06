"use client";

import { useState } from "react";

export default function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex items-center gap-1 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="text-3xl"
        >
          {star <= rating ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
}