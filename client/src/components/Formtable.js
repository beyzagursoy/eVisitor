import React from 'react'
import "../App.css"
import { MdClose } from "react-icons/md";

const Formtable = ({handleOnChange, handleSubmit, handleclose}) => {
  return (
    <div className = "addContainer">
              <form onSubmit={handleSubmit}>
                <div className = "close-btn" onClick={handleclose }><MdClose/></div>
                  <label htmlFor = "fullname"> Full Name : </label>
                  <input type = "text" id="fullname" name = "fullname" onChange={handleOnChange}></input>

                  <label htmlFor = "message"> Message : </label>
                  <input type = "text" id="message" name = "message" onChange={handleOnChange}></input>
                  

                  <button className = "btn">Submit</button>
              </form>
            </div>
  )
}

export default Formtable