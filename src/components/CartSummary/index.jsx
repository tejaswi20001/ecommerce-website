// Write your code here
import CartContext from "../../context/CartContext";
import "./index.css";

const CartSummary = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;

      const numberOfCartItems = cartList.length;

      const totalAmount = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      return (
        <div className="cart-summary-container">
          <h1 className="total-count">
            Order Total: <span className="total-price">Rs {totalAmount}/-</span>
          </h1>

          <p className="items-count">{numberOfCartItems} Items in cart</p>

          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      );
    }}
  </CartContext.Consumer>
);

export default CartSummary;
