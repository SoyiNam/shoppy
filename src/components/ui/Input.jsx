import React from "react";

export default function Input({ id, type, placeholder, accept, onChange }) {
  return (
    <label id={id}>
      <input
        id={id}
        type={type}
        accept={accept} // input type(file)
        required
        placeholder={placeholder}
        className="p-4 w-full h-16 border border-gray-300 outline-none"
        onChange={onChange}
      />
    </label>
  );
}
