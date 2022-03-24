import React from "react";
import axios from "axios";
import Card from "./Card/index.js";
import Header from "./Header.js";
import Drawer from "./Drawer.js";

const Render = (props) => {
  const data = props.sneakers;
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const onAddToCart = (obj) => {
    axios.post("http://localhost:8080/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  React.useEffect(() => {
    axios.get("http://localhost:8080/cart").then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onRemoveItem = (_id) => {
    axios.delete(`http://localhost:8080/cart/${_id}`);
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(cartItems, " cartItems");
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          key={cartItems._id}
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue ? `Search by input: "${searchValue}"` : "All Sneakers"}
          </h1>
          <div className="search-block d-flex align-center">
            <img width={16} height={16} src="/img/search.svg" alt="search" />
            {searchValue && (
              <img
                className="clear cu-p"
                src="/img/plusBold.svg"
                alt="Clear"
                onClick={() => setSearchValue("")}
              />
            )}

            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((data) => (
              <Card
                key={data._id}
                title={data.name}
                price={data.price}
                imageUrl={data.imageUrl}
                _id={data._id}
                onFavClick={() => console.log("Added to fav")}
                onAddClick={(obj) => onAddToCart(obj)}
                // onAddClick={(obj) => console.log(obj, " obj")}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Render;
