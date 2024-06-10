import React from "react";
import { CgMathPlus } from "react-icons/cg";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";
import useCart from "../hooks/useCart";

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";

export default function CartItem({
  cart,
  cart: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...cart, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...cart, quantity: quantity + 1 });
  };

  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className="flex justify-between my-2 items-center">
      <img src={image} alt={title} className="w-24 md:w-48  rounded-lg" />
      <div className="flex-1 justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl front-bold text-brand">{option}</p>
          <p>{price}</p>
        </div>
      </div>
      <div className="text-2xl flex items-center">
        <CgMathMinus className={ICON_CLASS} onClick={handleMinus} />
        <span>{quantity}</span>
        <CgMathPlus className={ICON_CLASS} onClick={handlePlus} />
        <BsFillTrash3Fill className={ICON_CLASS} onClick={handleDelete} />
      </div>
    </li>
  );
}
