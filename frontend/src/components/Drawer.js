function Drawer({ onCloseCart, onRemove, items = [] }) {
  console.log(items, " props in drawer");
  // const data = items.sneakers;
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
                <div className="cartItem d-flex align-center mb-20">
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
                  <b>3200 kr</b>
                </li>

                <li>
                  <span>Tax 5%: </span>
                  <div></div>
                  <b>160 kr</b>
                </li>
              </ul>
              <button className="greenButton">
                Make your order <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              height="120px"
              src="/img/empty-cart.jpg"
              alt="empty box/cart"
            />
            <h2>Your cart is empty</h2>
            <p className="opacity=6">
              Add at least one pair of sneakers to be able to make an order
            </p>
            <button onClick={onCloseCart} className="greenButton">
              <img src="/img/arrow_back.svg" alt="arrow-back" />
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
