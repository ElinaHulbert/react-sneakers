import styles from "./card.module.scss";
import React from "react";
import AppContext from "../../context";

function Card({
  onFavClick,
  onAddClick,
  title,
  imageUrl,
  price,
  _id,
  favourited = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  console.log(title, isItemAdded(_id));
  const [isFav, setIsFav] = React.useState(favourited);

  const onClickPlus = () => {
    onAddClick({ title, imageUrl, price, _id });
  };
  const onClickFav = () => {
    onFavClick({ title, imageUrl, price, _id });
    setIsFav(!isFav);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favourite}>
        <img
          width={18}
          height={18}
          src={isFav ? "/img/heart-liked.svg" : "/img/heart.svg"}
          alt="heart"
          onClick={onClickFav}
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <p>Price:</p>
          <b>{price} :-</b>
        </div>
        <img
          width={18}
          height={18}
          className={styles.plus}
          src={isItemAdded(_id) ? "/img/check.svg" : "/img/plus.svg"}
          alt="add"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
}
export default Card;
