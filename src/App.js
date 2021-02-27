import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

// components
import {About,
  Login,
  ProductDetails,
  Products,
  Cart,
  Error,
  PrivateRoute,
  Checkout,
  Alert,
  Header,
  Home} from "./pages/Allpages";

export default function App() {
  return <>
  
  
    <Router>
      

      <Header />
      <Alert />

      <Switch>

      <Route exact path="/"><Home /></Route>

      <Route exact path="/products"><Products /></Route>
      <Route path="/about"><About /></Route>
      <Route path="/cart"><Cart /></Route>
      <Route path="/products/:id" children={<ProductDetails></ProductDetails>}></Route>
      <Route path="/login"><Login /></Route>
     
      <PrivateRoute path="/checkout">
     <Checkout />
      </PrivateRoute>

      


      <Route path="*"><Error /></Route>
      </Switch>

    </Router>
 
  
  </>;
}
