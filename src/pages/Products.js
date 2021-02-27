import React from "react";
import ProductList from "../components/Products/ProductList";
import {ProductContext} from "../context/products";
import { BoxLoading } from 'react-loadingg';





export default function Products() {
  
  const {products,loading}= React.useContext(ProductContext);

 
 
    if(loading) {
      return <BoxLoading />;
    } 
   
    return   <ProductList title="Our Products" products={products} /> 
    

            
            
    
}
