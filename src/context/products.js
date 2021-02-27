import React, { useState, useEffect } from "react";
import { flattenproduct } from "../utils/helpers";
import URL from "../utils/URL";

export const ProductContext = React.createContext();



export default function ProductProvider({children})  {
  
  
  const [loading,setLoading] = useState(false);
 
  const [featured,setFeatured] = useState([]);
  const [products,setProducts] = useState([]);

  


  useEffect(()=>{
    setLoading(true)

    fetch(`${URL}/products`)
            .then(res=>res.json())
            .then(json=> {
             const product = flattenproduct(json)
              setProducts(product)
              setLoading(false)
            })
       
    
   
      
    return () => {

    }

    

   },[])

   useEffect(()=>{
     
    const featuredProd = products.filter(item => {
      return item.featured === true;
    } )

    setFeatured(featuredProd);
  
   },[products])
  return(
    <ProductContext.Provider value={{loading,products,featured}}>

         {children}
    </ProductContext.Provider>
   )

 }