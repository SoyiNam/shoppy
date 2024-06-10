import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, title, price, image, category, options },
}) {
  const navigate = useNavigate();
  const productOptions = options || ["free size"];

  return (
    <li
      className=" flex-col my-2 bg-white drop-shadow-lg overflow-hidden cursor-pointer px-2 transition-all hover:scale-105 "
      onClick={() => {
        navigate(`/${id}`, {
          state: {
            product: {
              id,
              title,
              price,
              image,
              category,
              options: productOptions,
            },
          },
        });
      }}
    >
      <img
        className="rounded w-full h-card object-cover mb-1"
        src={image}
        alt=""
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-ellipsis whitespace-nowrap overflow-hidden font-bold">
          {title}
        </p>
        <p>{price}</p>
      </div>
      <p className="mb-2">{category}</p>
    </li>
  );
}
