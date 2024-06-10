import { useAuthContext } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, addOrUpdateToCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const { uid } = useAuthContext();

  console.log("uid : ", uid);

  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["carts", uid || ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  console.log(cartQuery.queryKey);

  const addOrUpdateItem = useMutation({
    mutationFn: function (cart) {
      return addOrUpdateToCart(uid, cart);
    },
    onSuccess: function () {
      return queryClient.invalidateQueries(["carts", uid]);
    },
  });

  const removeItem = useMutation({
    mutationFn: (cart) => removeFromCart(uid, cart),
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  });

  // const removeItem = useMutation({
  //   mutationFn: ({ cart }) => removeFromCart(uid, cart),
  //   onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  // });

  return { cartQuery, addOrUpdateItem, removeItem };
}
