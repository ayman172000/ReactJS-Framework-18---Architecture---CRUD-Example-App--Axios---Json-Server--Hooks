import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./component/Home";
import Products from "./component/Products";
import "bootstrap/dist/css/bootstrap.css"
import {useEffect, useState} from "react";
import NewProduct from "./component/NewProduct";
import EditProduct from "./component/EditProduct";
import {appContext, useAppState} from "./app/context";
import Stats from "./component/Stats";
function App() {
  const [currentRoot,setCurrentRoot] = useState("");
  //use effect permet de gerer les side effect
  //gerer des traitement une fois que le compsent est charger
  useEffect(()=>{
    const path=window.location.pathname
    setCurrentRoot(path.slice(1,path.length))
  },[])

  return (
      <appContext.Provider value={useAppState()}>
          <BrowserRouter>
              <nav className={"m-1 p-1 border border-info navbar navbar-expand-lg navbar-light bg-light"}>
                  <ul className={"nav nav-pills"}>
                      <li>
                          <Link
                              onClick={()=>setCurrentRoot("home")}
                              className={
                                  currentRoot === 'home'
                                      ? 'btn btn-info ms-1'
                                      :'btn btn-outline-info ms-1'
                              }
                              to={"/home"}>Home</Link>
                      </li>
                      <li>
                          <Link
                              onClick={()=>setCurrentRoot("products")}
                              className={currentRoot === 'products'
                                  ? 'btn btn-info ms-1'
                                  :'btn btn-outline-info ms-1'}
                              to={"/products"}>Products</Link>
                      </li>
                      <li>
                          <Link
                              onClick={()=>setCurrentRoot("newProduct")}
                              className={currentRoot === 'newProduct'
                                  ? 'btn btn-info ms-1'
                                  :'btn btn-outline-info ms-1'}
                              to={"/newProduct"}>New Product</Link>
                      </li>
                  </ul>
                  <ul className={"nav navbar-nav"}>
                      <li>
                          <Stats></Stats>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path={"/home"} element={<Home/>}></Route>
                  <Route path={"/products"} element={<Products/>}></Route>
                  <Route path={"/newProduct"} element={<NewProduct/>}></Route>
                  <Route path={"/editProduct/:id"} element={<EditProduct/>}></Route>
              </Routes>
          </BrowserRouter>
      </appContext.Provider>
  );
}

export default App;
