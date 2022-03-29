import React from "react";
import axios from "axios";
import Header from "./Header.js";
import Drawer from "./Drawer.js";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Favourites from "../pages/Favourites.jsx";

const Render = (props) => {
  const data = props.sneakers;
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);

  const onAddToCart = (obj) => {
    axios.post("http://localhost:8080/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  React.useEffect(() => {
    axios.get("http://localhost:8080/cart").then((res) => {
      setCartItems(res.data);
    });
    axios.get("http://localhost:8080/favourite").then((res) => {
      setFavourites(res.data);
    });
  }, []);

  const onRemoveItem = (_id) => {
    axios.delete(`http://localhost:8080/cart/${_id}`);
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const onAddToFavourite = (obj) => {
    if (favourites.find((favObj) => favObj._id === obj._id)) {
      axios.delete(`http://localhost:8080/favourite/${obj._id}`);
      // setFavourites((prev) => prev.filter((item) => item._id !== obj._id));
    } else {
      axios.post("http://localhost:8080/favourite", obj);

      setFavourites((prev) => [...prev, obj]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(cartItems, " cartItems");
  console.log(favourites, " favourites");
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

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              data={data}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavourite={onAddToFavourite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
        <Route
          exact
          path="/favourites"
          element={
            <Favourites data={favourites} onAddToFavourite={onAddToFavourite} />
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default Render;
