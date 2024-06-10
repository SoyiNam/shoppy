import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const [addBasket, setAddBasket] = useState(false);
  const {
    state: {
      product: { id, title, price, image, category, options },
    },
  } = useLocation();
  // 데이터 초기화

  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product);
    setAddBasket(true);
    setTimeout(() => {
      setAddBasket(false);
    }, 3000);
  };

  return (
    <>
      <p className="p-4 text-2xl font-bold py-2  border-b border-gray-400">
        {category}
      </p>
      <section className="flex flex-col justify-center min-h-screen md:flex-row p-4 sm:flex-row">
        <div className="w-full px-4 basis-4/12 sm:w-3/5">
          <img src={image} alt="{title}" className="w-full" />
        </div>
        <div className="w-full basis-8/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2  border-b border-gray-400">
            ₩{price}
          </p>
          <div className="flex items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션 :
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <hr className="mb-3" />
          {addBasket ? <p>🛍️ 장바구니에 추가되었습니다</p> : ""}
          <form className="w-full">
            <Button onClick={handleClick} text={"Add to Bag"} />
          </form>
        </div>
      </section>
    </>
  );
}
