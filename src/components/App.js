import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={HomePage} />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
