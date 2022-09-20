import React, { useCallback, useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartMenu } from "../cart-menu";
import { ItemsInCart } from "../items-in-cart";
import { calcTotalPrice } from "../utils";
import "./cart-block.css";

export const CartBlock = () => {
  const [isCartMenuVisible, setCartMenuVisible] = useState(false);
  const items = useSelector((state) => state.cart.itemsInCart);
  const totalPrice = calcTotalPrice(items);
  const history = useNavigate();

  const handelClick = useCallback(() => {
    setCartMenuVisible(false);
    history("/order");
  }, [history]);

  return (
    <div className="cart-block">
      <ItemsInCart quantity={items.length} />
      <BiCartAlt
        size={25}
        className="cart-block__icon"
        onClick={() => setCartMenuVisible(!isCartMenuVisible)}
      />
      {totalPrice > 0 ? (
        <span className="cart-block__total-price">{totalPrice} uan</span>
      ) : null}
      {isCartMenuVisible && <CartMenu items={items} onClick={handelClick} />}
    </div>
  );
};
