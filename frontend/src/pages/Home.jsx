import Card from "../components/Card/index.js";

import React from "react";

function Home ({data, searchValue, setSearchValue, onChangeSearchInput, onAddToFavourite, onAddToCart, favourites}){
  
  return(
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
            onFavClick={(obj) => onAddToFavourite(obj)}
            onAddClick={(obj) => onAddToCart(obj)}
            // addedCart={isItemAdded(data._id)}
            favourited={favourites.some(obj=> obj._id === data._id)}
          />
        ))}
    </div>
  </div>)
}
export default Home;