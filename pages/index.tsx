import MainLayout from "../components/MainLayout";
import React, { useEffect, useState, useContext } from "react";
import { Store } from "../contextStore";
import Favicon from "react-favicon";


function Home() {
  const { state, dispatch } = useContext(Store);
  useEffect(()=>{
    let cStorage: any = window.localStorage.getItem("cart");
    cStorage = JSON.parse(cStorage);
    
    if(cStorage){
      let cart_ = JSON.parse(window.localStorage.getItem("cart"))
      
      dispatch({
        type: "SET_CART",
        payload: cStorage
      })   
    } else if (!cStorage) {
      dispatch({
        type: "UPDATE_CART",
        payload: []
      })   
    }
  }, [])  
  return (
    <MainLayout title="ghmade" pageTitle="Home Page">
      {}
    </MainLayout>
  );
}

export default Home;
