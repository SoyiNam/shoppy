import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingBasket from "./pages/ShoppingBasket";
import NewProduct from "./pages/NewProduct";
import ProductsList from "./components/ProductsList";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <ProductsList /> },
      { path: "/:productID", element: <ProductDetail /> },
      {
        path: "/basket",
        element: (
          <ProtectedRoute>
            <ShoppingBasket />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
