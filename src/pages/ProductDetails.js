import React  from "react";
import {useHistory, useParams} from "react-router-dom";
import {ProductContext} from "../context/products";
import {CartContext} from "../context/cart";
import { BoxLoading } from 'react-loadingg';




export default function ProductDetails() {

  const {id} = useParams();
  const history = useHistory();
  const {products}= React.useContext(ProductContext);
  const {AddtoCart} = React.useContext(CartContext)

  const product = products.find(item => item.id === parseInt(id) )
  
  

   
  if(products.length === 0) {
    return <BoxLoading  />
  } 

  else {
    const  {image,description,title,price} = product;
  
   return ( 

     <section className="single-product">
       <img src={image} alt="Product img" className="single-product-image">
       </img>
       <article>
            <h1>{title}</h1>
            <h2>{price}</h2>
            <p>{description}</p>

            <button className="btn btn-primary btn-block" onClick={()=>{
                 AddtoCart(product)
              // adding to cart
              history.push('/cart')
            }}>Add to Cart</button>
       </article>
     </section>

   )
  }
}
