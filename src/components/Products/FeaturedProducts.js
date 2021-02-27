import React from "react";
import ProductList from "./ProductList";
import {ProductContext} from "../../context/products";

export default function FeaturedProducts() {
  
  
  
  const {featured} = React.useContext(ProductContext);

 
 
    
   
    return   <ProductList title="Featured" products={featured} /> 
    
}
