import React from "react";
import axios from "axios";
import Header from "./Header.js";
import Drawer from "./Drawer.js";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Favourites from "../pages/Favourites.jsx";
import AppContext from "../context.js";

const Render = (props) => {
  const data = props.sneakers;
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => item._id === obj._id)) {
      setCartItems((prev) => prev.filter((item) => item._id !== obj._id));
      axios.delete(`https://mern-sneakers-app.herokuapp.com/cart/${obj._id}`);
    } else {
      axios.post("https://mern-sneakers-app.herokuapp.com/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  React.useEffect(() => {
    axios.get("https://mern-sneakers-app.herokuapp.com/cart").then((res) => {
      setCartItems(res.data);
    });
    axios
      .get("https://mern-sneakers-app.herokuapp.com/favourite")
      .then((res) => {
        setFavourites(res.data);
      });
  }, []);

  const onRemoveItem = (_id) => {
    axios.delete(`https://mern-sneakers-app.herokuapp.com/cart/${_id}`);
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => favObj._id === obj._id)) {
        axios.delete(
          `https://mern-sneakers-app.herokuapp.com/favourite/${obj._id}`
        );
        setFavourites((prev) => prev.filter((item) => item._id !== obj._id));
      } else {
        console.log(obj, " obj");
        await axios.post(
          "https://mern-sneakers-app.herokuapp.com/favourite",
          obj
        );
        setFavourites((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("error: ", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (_id) => {
    return cartItems.some((obj) => obj._id === _id);
  };
  return (
    <AppContext.Provider
      value={{
        data,
        cartItems,
        favourites,
        isItemAdded,
        onAddToFavourite,
        setCartOpened,
        setCartItems,
      }}
    >
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
                favourites={favourites}
                cartItems={cartItems}
                data={data}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavourite={onAddToFavourite}
                onAddToCart={onAddToCart}
              />
            }
          ></Route>
          <Route exact path="/favourites" element={<Favourites />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};
export default Render;
