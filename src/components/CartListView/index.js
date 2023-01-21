import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(item => {
        total += item.quantity * item.price
      })
      console.log(total)
      return (
        <>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          <div className="total-orders-outer">
            <div className="total-orders-container">
              <p className="total-orders">
                Order Total: <span className="total-value">Rs {total}/-</span>
              </p>
              <p>{cartList.length} items in Cart</p>
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
