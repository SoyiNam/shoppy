import React from "react";
import { HiShoppingCart } from "react-icons/hi";
import useCart from "../../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { isPending, data: carts },
  } = useCart();

  // const { isPending, data: carts } = useQuery({
  //   queryKey: ["carts"],
  //   queryFn: () => getCart(uid),
  // });

  // console.log("carts : ", carts);

  return (
    <div className="relative">
      <HiShoppingCart className="text-4xl" />
      {isPending && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          ...
        </p>
      )}
      {carts && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {carts.length}
        </p>
      )}
    </div>
  );
}
