import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [ {name: "Nike Kyrie Flytrap IV", price: "1600", imageUrl: "/img/sneakers/s1.png"},
              {name: "Nike Lebron XVIII Low", price: "1800", imageUrl: "/img/sneakers/s2.png"},
              {name: "Nike LeBron XVIII", price: "1700", imageUrl: "/img/sneakers/s3.png"},
              {name: "Jordan Air Jordan 11", price: "1500", imageUrl: "/img/sneakers/s4.png"}]

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onCloseCart={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All Sneakers</h1>
          <div className="search-block d-flex align-center">
          <img width={16} height={16} src="/img/search.svg" alt="search" />
            <input placeholder="Search..." type="text" />
          </div>
        </div>

        <div className="d-flex"> 
          {
            arr.map((obj) => (
            <Card 
              title={obj.name} 
              price={obj.price} 
              imageUrl={obj.imageUrl} 
              onFavClick={()=>console.log("Added to fav")}
              onAddClick={()=>console.log(obj)}/>))
          }
        </div> 
      </div>
    </div>
  );
}

export default App;
