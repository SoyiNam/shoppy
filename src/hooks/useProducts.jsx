import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/firebase";
import { UploadNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: ({ productName, productPrice, productNum, productCate, url }) =>
      UploadNewProduct(productName, productPrice, productNum, productCate, url),

    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return { productsQuery, addProduct };
}
