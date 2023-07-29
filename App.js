import "./App.css";
import Route from "../src/router/index";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { CartContextProvider } from "./Context/CartContext";
import { ProductsContextProvider } from "./Context/ProductsContext";
import TokenHandler from "./Context/TokenHandler";

function App() {
  return (
    <TokenHandler>
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Toaster />
            <Route />
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    </TokenHandler>
  );
}

export default App;
