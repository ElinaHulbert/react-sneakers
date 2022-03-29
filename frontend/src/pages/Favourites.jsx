import Card from "../components/Card/index.js";
function Favourites ({data, onAddToFavourite}){
    return(
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>
        My bookmarks
      </h1>
      
        

      
    </div>

    <div className="d-flex flex-wrap">
    {data.map((data) => (
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