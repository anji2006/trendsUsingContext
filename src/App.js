import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const sameItemIndex = cartList.findIndex(item => {
      if (item.id === product.id) {
        return true
      }
      return false
    })
    // console.log(sameItemIndex)
    if (sameItemIndex === -1) {
      this.setState(prev => ({
        cartList: [...prev.cartList, product],
      }))
    } else {
      cartList[sameItemIndex].quantity += product.quantity
      this.setState({cartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(item => {
      if (item.id === id) {
        return true
      }
      return false
    })

    cartList[index].quantity += 1
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(item => {
      if (item.id === id) {
        return true
      }
      return false
    })

    if (cartList[index].quantity > 1) {
      cartList[index].quantity -= 1
    }

    this.setState({cartList})
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(item => item.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
