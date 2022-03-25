import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React sneakers</h3>
            <p>The best sneakers shop</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p">
          <Link to="/favourites">
            <img width={18} height={18} src="/img/heart.svg" alt="liked" />
          </Link>
        </li>

        <li className="mr-30 cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="user" />
        </li>

        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>1385 kr</span>
        </li>
      </ul>
    </header>
  );
}
export default Header;
