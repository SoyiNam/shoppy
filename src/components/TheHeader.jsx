import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import User from "./User";

import { RxAvatar } from "react-icons/rx";
import { BsFillPencilFill } from "react-icons/bs";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./ui/CartStatus";

export default function TheHeader() {
  const { user, GoogleLogin, GoogleLogout } = useAuthContext();

  return (
    <header className="flex justify-between p-4 items-center border-b border-gray-300">
      <Link to="/">
        <h1 className="flex gap-2 items-center justify-center font-bold text-2xl cursor-pointer text-brand">
          <FiShoppingBag />
          <span className="hidden sm:inline">SOHO MALL</span>
        </h1>
      </Link>
      <div>
        <div className="flex items-center gap-6 text-xl font-semibold">
          <button className="sm: text-sm">PRODUCTS</button>

          {user && (
            <Link to={"/basket"}>
              <CartStatus />
            </Link>
          )}

          {user && user.isAdmin && (
            <Link to={"/new"}>
              <BsFillPencilFill />
            </Link>
          )}
          {user && (
            <button>
              <User user={user} />
            </button>
          )}
          {!user && <RxAvatar />}
          {!user && <Button text={"Login"} onClick={GoogleLogin} />}
          {user && <Button text={"Logout"} onClick={GoogleLogout} />}
        </div>
      </div>
    </header>
  );
}
