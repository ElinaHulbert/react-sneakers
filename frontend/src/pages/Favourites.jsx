import Card from "../components/Card/index.js";
import React from "react";
import AppContext from "../../src/context.js";

function Favourites (){
  const {favourites, onAddToFavourite} = React.useContext(AppContext)
    return(
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>
        My bookmarks
      </h1>
      
        

      
    </div>

    <div className="d-flex flex-wrap">
    {favourites.map((data) => (
          <Card
            key={data._id}
            title={data.name}
            price={data.price}
            imageUrl={data.imageUrl}
            _id={data._id}
            favourited={true}
            onFavClick={onAddToFavourite}
            
          />
        ))}
    </div>
  </div>)
}
export default Favourites;