// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProductCard() {
//   const [products, setProducts] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("/api/product.json")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product data:", error);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       {products && (
//         <div>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4">
//             {products.map((product) => (
//               <li
//                 className="bg-white drop-shadow-lg cursor-pointer"
//                 key={product.id}
//                 onClick={() => {
//                   navigate(`/${product.id}`, { state: { product: product } });
//                 }}
//               >
//                 <img className="rounded mb-1" src={product.img} alt="" />
//                 <p className="text-ellipsis whitespace-nowrap overflow-hidden">
//                   {product.name}
//                 </p>
//                 <p>{product.price}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
