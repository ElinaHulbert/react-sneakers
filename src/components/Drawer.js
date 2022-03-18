function Drawer(props){
    return(
    <div className="overlay">
    <div className="drawer">
      <h2 className="d-flex justify-between mb-30">Cart <img className="removeBtn cu-p" src="/img/plusBold.svg" alt="Remove" onClick={props.onCloseCart}/></h2>

      <div className="items">
        <div className="cartItem d-flex align-center mb-20">
          
          <div className="cartItemImg" style={{backgroundImage: "url(/img/sneakers/s1.png)"}}>
          </div>
          
          <div className="mr-20 flex">
            <p className="mb-5">Nike Kyrie Flytrap IV</p>
            <b>1600 kr</b>
          </div>

          <img className="removeBtn" src="/img/plusBold.svg" alt="Remove" />
        </div>


        <div className="cartItem d-flex align-center mb-20">
          
          <div className="cartItemImg" style={{backgroundImage: "url(/img/sneakers/s1.png)"}}>
          </div>
          
          <div className="mr-20 flex">
            <p className="mb-5">Nike Kyrie Flytrap IV</p>
            <b>1600 kr</b>
          </div>

          <img className="removeBtn" src="/img/plusBold.svg" alt="Remove" />
        </div>
      </div>

      <div className="cartTotalBlock">
        <ul>
          <li>
            <span>Total: </span>
            <div></div>
            <b>3200 kr</b>
          </li>

          <li>
            <span>Tax 5%: </span>
            <div></div>
            <b>160 kr</b>
          </li>
        </ul>
        <button className="greenButton">Make your order <img src="/img/arrow.svg" alt="arrow" /></button>
      </div>
    
    </div>
  </div>)
}

export default Drawer;