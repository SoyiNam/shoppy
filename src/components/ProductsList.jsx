import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

export default function ProductsList() {
  // const {
  //   isPending,
  //   error,
  //   data: products,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: fetchProducts,
  //   staleTime: 1000 * 60,
  // });

  const {
    productsQuery: { isPending, error, data: products },
  } = useProducts();

  return (
    <section>
      <img
        src="/images/top_banner.jpg"
        className="block w-full h-full object-cover"
        alt=""
      />
      <div className="p-4">
        {/* <h1>Products List</h1> */}
        {isPending && <p>Loading...</p>}
        {error && <p>Error loading products: {error.message}</p>}
        {products && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
