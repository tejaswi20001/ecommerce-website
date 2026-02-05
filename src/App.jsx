import { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";

import "./App.css";

class App extends Component {
  state = {
    cartList: [],
  };

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = (product) => {
    this.setState((prevState) => {
      const existingItem = prevState.cartList.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return {
          cartList: prevState.cartList.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item,
          ),
        };
      }

      return { cartList: [...prevState.cartList, product] };
    });
  };

  incrementCartItemQuantity = (productId) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  };

  decrementCartItemQuantity = (productId) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  removeCartItem = (productId) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter((item) => item.id !== productId),
    }));
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductItemDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
