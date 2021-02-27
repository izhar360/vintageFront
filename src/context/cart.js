import React, { createContext, useEffect, useState } from "react";
import localCart from "../utils/localCart";

const getDataLocal = () => {
      return localStorage.getItem("cart") ? 
      JSON.parse(localStorage.getItem("cart")) : [];
}

const CartContext = createContext();

const CartProvider = ({children}) => {
      const [cart,setCart] = useState(getDataLocal());
      const [total,setTotal] = useState(0);
      const [cartItems,setCartitems] = useState(0);


      useEffect(()=>{

      localStorage.setItem("cart",JSON.stringify(cart))

       let newCartamount = cart.reduce((total,cartitem) => {
             return total += cartitem.amount
       },0)
       setCartitems(newCartamount);

         let newTotalPrice = cart.reduce((total,cartitem) => {
            return total += (cartitem.amount * cartitem.price)
      },0)


       newTotalPrice =  parseFloat(newTotalPrice.toFixed(2));
         setTotal(newTotalPrice)
       



      },[cart])

      const removeItem = (id) => {
             const updatedCart = cart.filter(item => item.id !== id);
             setCart(updatedCart)
      }

      const increaseAmount = (id) => {
      //       const selecteditem = cart.find(item => item.id === id)
       //       selecteditem.amount = selecteditem.amount + 1;
      //       setCart([...cart],selecteditem)  

              const newCart = cart.map(item => {
                   return item.id === id ? {...item,amount: item.amount+1} : {...item}
              }) 
              setCart(newCart)

      }

      const decreaseAmount = (id,amount) => {

              if(amount === 1) {
                    removeItem(id);
                    return;
              }
              else {
                         
                    const newCart = cart.map(item => {
                        return item.id === id ? {...item,amount: item.amount-1} : {...item}
                   }) 
                   setCart(newCart)
     
              }
   
            }


      const AddtoCart = ({id,image,title,price}) => {
           const item = cart.find(item => item.id === id);

           if(item){
                 increaseAmount(id)
                 return;
           }

           else {
                 const newitem = {id,image,title,price,amount:1}
                 setCart([...cart,newitem])
           }

      }

      const clearCart = () => {
            setCart([])
      }

    return <CartContext.Provider value={{clearCart,cart,AddtoCart,total,cartItems,removeItem,increaseAmount,decreaseAmount}}>
          {children}
          </CartContext.Provider>
}

export { CartContext,CartProvider};
