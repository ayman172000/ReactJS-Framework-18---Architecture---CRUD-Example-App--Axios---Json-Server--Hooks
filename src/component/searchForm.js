import React, {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {appContext} from "../app/context";


export default function SearchForm({handleGetProducts}) {
    const [query,setQuery] = useState("")
    const [state,setState]=useContext(appContext)
    const handleSearch=(event)=>{
        event.preventDefault()
        //setState({...state,keyword: query})
        handleGetProducts(query,1,state.pageSize)
        //getProducts(state.keyword,state.currentPage,state.pageSize)
    }
    return (
        <form onSubmit={handleSearch}>
            <div className={" row g-2"}>
                <div className={"col-auto"}>
                    <input
                        className="form-control"
                        type="text"
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                    />
                </div>
                <div className={"col-auto"}>
                    <button className={"btn btn-success"}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Search
                    </button>
                </div>
            </div>
        </form>
    )
}
