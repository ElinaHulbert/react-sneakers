import Info from "./Info.jsx";
import React from "react";
import AppContext from "../context";
import axios from "axios";

function Drawer({ onCloseCart, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderCompleted, setOrderCompleted] = React.useState(false);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = () => {
    // const obj = Object.assign({}, cartItems);
    // let _id = Math.floor(Math.random() * 10);
    axios.post("http://localhost:8080/order", {
      items: cartItems,
      // _id: _id,
    });

    setOrderCompleted(true);
    setCartItems([]);
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Cart{" "}
          <img
            className="removeBtn cu-p"
            src="/img/plusBold.svg"
            alt="Remove"
            onClick={onCloseCart}
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj._id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    className="cartItemImg"
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} :-</b>
                  </div>

                  <img
                    onClick={() => onRemove(obj._id)}
                    className="removeBtn"
                    src="/img/plusBold.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total: </span>
                  <div></div>
                  <b>{totalPrice} kr</b>
                </li>

                <li>
                  <span>Tax 5%: </span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} kr</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Make your order <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={
              isOrderCompleted
                ? "Your order is completed"
                : "Your cart is empty"
            }
            description={
              isOrderCompleted
                ? "Your order will be sent to delivery service."
                : "Add at least one pair of sneakers to be able to make an order."
            }
            image={
              isOrderCompleted ? "/img/order-ready.png" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
