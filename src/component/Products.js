import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function Products(){
    const [products,setProducts]=useState([
        {id:1,name:"product1",price:5000,checked:false},
        {id:2,name:"product2",price:4000,checked:true},
        {id:3,name:"product3",price:3000,checked:false},
        {id:4,name:"product4",price:2000,checked:true},
        {id:5,name:"product4",price:1000,checked:false}
    ])

    const handleDeleteProduct=(givenProduct)=> {
        const newProducts=products.filter(p=>p.id!=givenProduct.id)
        setProducts(newProducts)
    }
    const handleCheckProduct=(givenProduct)=> {
        const newProducts=products.map(p=>{
            if(p.id == givenProduct.id)
                givenProduct.checked=!p.checked
            return p
        })
        setProducts(newProducts)
    }

    return(
        <div className={"p-1 m-1"}>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h3>Products Componenet</h3>
                            <table className={"table"}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Checked</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((p)=>(
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td>{p.price}</td>
                                                <td>
                                                    <button onClick={()=> handleCheckProduct(p)} className={p.checked?"btn btn-success":"btn btn-danger"}>
                                                        <FontAwesomeIcon icon={p.checked?faCheck:faClose}></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className={"btn btn-warning"}>
                                                        <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                                    </button>
                                                    <button onClick={()=>handleDeleteProduct(p)} className={"btn btn-danger ms-2"}>
                                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
