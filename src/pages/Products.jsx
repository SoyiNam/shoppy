import React from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <>
      <section></section>
      <section className="block w-full max-h-96 overflow-hidden">
        <img src={process.env.PUBLIC_URL + "/images/banner.png"} alt=""></img>
      </section>
      <section>
        <ProductCard />
      </section>
    </>
  );
}
