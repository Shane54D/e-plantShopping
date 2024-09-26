import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateQuantity } from './CartSlice';
import { useReducer } from 'react';
import './CartItem.css';
import { useState } from 'react';
import store from './store';
import { removeItem } from './CartSlice'; 
import { CartSlice } from './CartSlice';

const CartItem = ({ onContinueShopping, item }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log(cart); 

  let cartItemsTotal = cart.length; 
  console.log(cartItemsTotal);

  // Calculate total amount for all products in the cart //
   const calculateTotalAmount = (cart) => {
      let totalAmount = 0;
      cart.forEach(item => {
        let cost = parseFloat(item.cost.replace('$', '')); 
        let quantity = item.quantity; 
        totalAmount += cost * quantity; 
      });
      return totalAmount; 
    };

    
  const handleContinueShopping = (e) => {
onContinueShopping(e);      
  };

// generate a function that increments the quantity of an item in the cart

  const handleIncrement = (item) => {
    store.dispatch(addItem(item)); 
  };

  const handleDecrement = (item) => {
    store.dispatch(updateQuantity({ item, change: -1 })); // Dispatch action to reduce quantity by 1
  };

  const handleRemove = (item) =>{
    dispatch(removeItem(item.name));
  }

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let cost = parseFloat(item.cost.replace('$', ''));
   let quantity = item.quantity;
    return (cost * quantity);   

  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


