import React from "react";

export default function Hero({children}) {
  return <div className="hero">

       <div className="banner">

         <h1>trusted , reliable</h1>
         <p>Give us your money</p>
         {children}

       </div>


  </div>
}
