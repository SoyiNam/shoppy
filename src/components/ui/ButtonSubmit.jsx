import React from "react";

export default function ButtonSubmit({ text, onSubmit }) {
  return (
    <button
      className="w-full h-12 bg-brand px-2 text-white font-semibold"
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
}
