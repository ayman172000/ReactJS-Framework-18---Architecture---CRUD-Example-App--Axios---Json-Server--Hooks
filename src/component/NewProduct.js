import React, {useState} from "react";
import {saveProduct} from "../app/context";

export default function NewProduct(){
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [checked,setChecked] = useState(false);
    const handleSaveProduct=(event)=>{
        //let product={name:name,price:price,checked:checked}
        event.preventDefault()
        let product={name,price,checked}
        saveProduct(product).then(resp=>{
            alert(JSON.stringify(resp.data))
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className={"row p-1"}>
            <div className={"col-md-6"}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <form onSubmit={handleSaveProduct}>
                            <div className="mb-3">
                                <label className="form-label">Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="13.56"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Checked :</label>
                                <div className={"form-check"}>
                                    <input
                                        className={"form-check-input"}
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e)=>setChecked(e.target.value)}
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
