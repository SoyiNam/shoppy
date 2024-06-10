import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className=" bg-brand px-2 py-1 box-border rounded-sm text-white flex items-center justify-center tracking-wider"
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}
