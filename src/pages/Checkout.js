import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import submitOrder from "../strapi/submitOrder";
import { CardElement, Elements, injectStripe, StripeProvider } from "react-stripe-elements";

 function Checkout(props) {

    const {cart,total,clearCart} = useContext(CartContext)
    const {user,showAlert,hideAlert,alert} = useContext(UserContext)
    const history = useHistory();
    const [name,setName] = useState('')
    const [error,setError] = useState('')
    const isEmpty = !name || alert.show;

    async function handleSubmit (e){
      e.preventDefault();
      showAlert({msg: "completing transaction... please wait!"})
      const response = await props.stripe.createToken().catch(error => console.log(error))

          const {token} = response;
          if(token){
        
            setError('')
            const {id} = token;

            const order = await submitOrder({
              name:name,
              total:total,
              items:cart,
              stripeTokenId: id, 
              userToken: user.token})

              if(order){
                showAlert({msg: 'Your Order is Completed!'});
                clearCart();
                history.push('/')
                return;
              }
              else {
                showAlert({msg: 'something went wrong, try again!',type: 'danger'});
              }
          }
          else {
            hideAlert();
            setError(response.error.message)
          }
    }

    if(cart.length < 1) return <EmptyCart />

    //jsx

  return <section className="section form">
  <h2 className="section-title">checkout</h2>
  <form className="checkout-form">
    <h3>
      order total : <span>${total}</span>
    </h3>
    {/* single input */}
    <div className="form-control">
      <label htmlFor="name">name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </div>
    {/* end of single input */}
    {/* card element */}
    <div className="stripe-input">
      <label htmlFor="card-element">Credit or Debit Cart</label>
      <p className="stripe-info">
        Test using this credit card : <span>4242 4242 4242 4242</span>
        <br />
        enter any 5 digits for the zip code
        <br />
        enter any 3 digits for the CVC
      </p>
    </div>
    {/* end of card element */}
    {/* STRIPE ELEMENTS */}
    
    <CardElement className="card-element"></CardElement>
    {/* stripe errors */}
    {error && <p className="form-empty">{error}</p>}
    {/* empty value */}
    {isEmpty ? (
      <p className="form-empty">please fill out name field</p>
    ) : (
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-primary btn-block"
      >
        submit
      </button>
    )}
  </form>
</section>
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () =>{
  return (
    <StripeProvider 
    apiKey= "pk_test_51INXwWFa3LrTX1rjwkBRV8acNgNHRMb0OZh7deLWVIqWFMBph7tkHboT0nPEitDzjYr3iHgKRlC30AU0iM7X6PBA00o8e0kccZ">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  )
}

export default StripeWrapper;
