import React from 'react';
import AppContext from '../context';

const Info = ({image, title, description}) => {
    const {setCartOpened}=React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
    <img
      className="mb-20"
      width="120px"
      src={image}
      alt="empty box/cart"
    />
    <h2>{title}</h2>
    <p className="opacity=6">
    {description}
    </p>
    <button onClick={()=>setCartOpened(false)} className="greenButton">
      <img src="/img/arrow_back.svg" alt="arrow-back" />
      Go back
    </button>
  </div>
  )
}
export default Info;