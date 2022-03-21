import styles from "./card.module.scss";
import React from "react";

function Card({onFavClick, onAddClick, title, imageUrl, price, _id}){
  const [isAdded, setIsAdded] = React.useState(false);
  const onClickPlus = () => {
    onAddClick({title, imageUrl, price, _id});
    setIsAdded(!isAdded);
    console.log(onAddClick, " onAddClick")
  } 
 
    return(
        <div className={styles.card}>
            <div className={styles.favourite}>
              <img src="/img/heart.svg" alt="heart" onClick={onFavClick}/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <p>Price:</p>
                <b>{price} :-</b>
              </div>
              <img width={18} height={18} className={styles.plus} src={isAdded ? "/img/check.svg" : "/img/plus.svg"} alt="add" onClick={onClickPlus}/>
            </div>
        </div>
    )
}
export default Card;