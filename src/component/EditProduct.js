import React, {useEffect, useState} from "react";
import {getProduct, updateProduct} from "../app/context";
import {useParams} from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        handleGetProductById(id);
    },[])
    const handleGetProductById=(id)=>
    {
        getProduct(id).then(resp=>{
            let product = resp.data
            setName(product.name)
            setPrice(product.price)
            setChecked(product.checked)
        });
    }
    const handleEditProduct = (event) => {
        //let product={name:name,price:price,checked:checked}
        event.preventDefault()
        let product = {id, name, price, checked}
        updateProduct(product).then(resp => {
            alert(JSON.stringify(resp.data))
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className={"row p-1"}>
            <div className={"col-md-6"}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <form onSubmit={handleEditProduct}>
                            <div className="mb-3">
                                <label className="form-label">Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="13.56"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Checked :</label>
                                <div className={"form-check"}>
                                    <input
                                        className={"form-check-input"}
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button className={"btn btn-success"}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
