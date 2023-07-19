import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./component/Home";
import Products from "./component/Products";
import "bootstrap/dist/css/bootstrap.css"
import {useEffect, useState} from "react";
function App() {
  const [currentRoot,setCurrentRoot] = useState("");
  //use effect permet de gerer les side effect
  //gerer des traitement une fois que le compsent est charger
  useEffect(()=>{
    //alert("ok")
    const path=window.location.pathname
    setCurrentRoot(path.slice(1,path.length))
  },[])
  return (
      <BrowserRouter>
        <nav className={"m-1 p-1 border border-info"}>
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
          </ul>
        </nav>
        <Routes>
          <Route path={"/home"} element={<Home/>}></Route>
          <Route path={"/products"} element={<Products/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
