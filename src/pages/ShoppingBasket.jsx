import React from "react";
import { CgMathEqual } from "react-icons/cg";
import { CgMathPlus } from "react-icons/cg";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";

const SHIPPING = 3000;

export default function ShoppingBasket() {
  const { uid } = useAuthContext();
  const { isPending, data: carts } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });

  console.log("cart: ", carts);

  // const totalPrice =
  //   carts &&
  //   carts
  //   .reduce((prev, current) => {
  //     return prev + parseInt(current.price) * current.quantity;
  //   };

  const totalPrice =
    carts?.reduce((prev, current) => {
      return prev + parseInt(current.price) * current.quantity;
    }, 0) || 0;

  return (
    <section className="p-8 flex flex-col">
      {isPending && <p>is Loading...</p>}
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      <hr />
      <ul className="border-b border-gray-300 mb-8 px-8">
        {carts &&
          carts.map((cart) => <CartItem key={cart.id} cart={cart} uid={uid} />)}
      </ul>

      <div className="flex justify-between items-center px-2 mb-6 md:px-8 lg:px-16">
        <PriceCard text="상품 총액" price={totalPrice} />
        <CgMathPlus className="shrink-0" />
        <PriceCard text="배송액" price={SHIPPING} />
        <CgMathEqual className="shrink-0" />
        <PriceCard text="총가격" price={totalPrice + SHIPPING} />
      </div>
      <ButtonSubmit text="주문하기" />
    </section>
  );
}
