import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {appContext, checkProduct, deleteProduct, getProducts} from "../app/context";
import {useNavigate} from "react-router-dom";
import SearchForm from "./searchForm";

export default function Products() {
    const [state,setState]=useContext(appContext)
    useEffect(() => {
        handleGetProducts(state.keyword, state.currentPage, state.pageSize);
    }, [])
    const navigate=useNavigate()
    const handleGetProducts = (keyword, page, size) => {
        getProducts(keyword, page, size).then(resp => {
            const totalElement = resp.headers.get("x-total-count")
            let pages = Math.floor(totalElement / size)
            if (totalElement % size != 0) ++pages;
            setState({
                ...state,
                products: resp.data,
                keyword: keyword,
                currentPage: page,
                pageSize: size,
                totalPages: pages})
        })
            .catch(err => {
                console.log(err)
            })
    }
    const handleDeleteProduct = (givenProduct) => {
        deleteProduct(givenProduct).then(res => {
            //handleGetProducts() premierre solution
            // bcp mieux
            const newProducts = state.products.filter((p) => p.id != givenProduct.id)
            //setState(newProducts)
            setState({...state, products: newProducts})
        })
            .catch(err => {
                console.log(err)
            })
    }
    const handleCheckProduct = (givenProduct) => {
        checkProduct(givenProduct).then(resp => {
            const newProducts = state.products.map(p => {
                if (p.id == givenProduct.id)
                    p.checked = !p.checked
                return p
            })
            //setState(newProducts)
            setState({...state, products : newProducts})
            handleGetProducts(state.keyword,state.currentPage,state.pageSize)
        }).catch(err => {
            console.log(err)
        })
        /*const newProducts = products.map(p => {
            if (p.id == givenProduct.id)
                givenProduct.checked = !p.checked
            return p
        })
        setProducts(newProducts)*/
    }
    const handleGoToPage = (page) => {
        setState({...state,currentPage:page })
        handleGetProducts(state.keyword, page, state.pageSize)
    }

    return (
        <div className={"p-1 m-1"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h3>Products Componenet</h3>
                            <div className={"card-body"}>
                                <SearchForm
                                    handleGetProducts={handleGetProducts}
                                ></SearchForm>
                            </div>
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
                                    state.products.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            <td>{p.price}</td>
                                            <td>
                                                <button onClick={() => handleCheckProduct(p)}
                                                        className={p.checked ? "btn btn-success" : "btn btn-danger"}>
                                                    <FontAwesomeIcon
                                                        icon={p.checked ? faCheck : faClose}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                            <td>
                                                <button className={"btn btn-warning"} onClick={()=>navigate(`/editProduct/${p.id}`)}>
                                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                                </button>
                                                <button onClick={() => handleDeleteProduct(p)}
                                                        className={"btn btn-danger ms-2"}>
                                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            <ul className="nav nav-pills">
                                {new Array(state.totalPages).fill(0).map((v, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleGoToPage(index + 1)}
                                            className={
                                                index + 1 == state.currentPage
                                                    ? "btn btn-info ms-1"
                                                    : "btn btn-outline-info ms-1"
                                            }
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
