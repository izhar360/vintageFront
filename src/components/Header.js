import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import Cartlink from "./Cart/CartLink"
import { UserContext } from "../context/user";
import LoginLink from "./LoginLink";
export default function Header() {

   const {user} = useContext(UserContext);

  return <header className="cont">
 

       <img src={logo} alt="Vintage img" className="logo" />

       <nav>
             
             <ul>
       {/* nav sec 1 */}
       <div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            {user.token && <li>
                 <Link to="/checkout">Checkout</Link>
                 </li>}

       </div>
         
       {/* nav sec 2 */}
         <div>

            <LoginLink />

            <Cartlink />
         </div>




             </ul>


       </nav>



  </header> ;
}
