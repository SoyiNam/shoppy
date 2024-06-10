import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex gap-1 items-center">
      <img
        className="min-w-10 h-10 rounded-full mr-2"
        src={photoURL}
        alt={displayName}
      />
      <p className="hidden md:block">{displayName}</p>
    </div>
  );
}
