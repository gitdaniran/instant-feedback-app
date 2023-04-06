import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function Nav({items, setItems, handleNameChange, 
  postName, handleHome, handleAbout}) {
  const {id} = useParams()
  return (
    <div className="nav">
      {!postName && 
      <ul>
        <li className="dropdown">
          <a href="#">Izaberi zaposlenog</a>
          <ul className="dropdown-menu" >
            
            {items.map((item) => (
              <li key={item.id} value={item.id} onClick={handleNameChange}>
                {item.ime}
              </li>
            ))}

            {/* {items.map((item, index) => (
              <li key={index} value={index} onClick={handleNameChange}>
                {item.ime}
              </li>
            ))} */}
            
            
            {/* <li onClick={(e) => changeName1()}>
              <Link to='/mladen'>Mladen Ivanovic</Link>
            </li>
            <li onClick={(e) => changeName()}>
              <Link to='/mladen'>Sanja Doljanica</Link>
            </li>
            <li onClick={(e) => changeName2()}>
              <Link to='/mladen'>Sladjana Stojanovic</Link>
            </li> */}
          </ul>
        </li>
      </ul>
      }
      <p onClick={handleAbout}>
        <Link to='/about'>About</Link>
      </p>
      <p onClick={handleHome}>
        <Link to='/'>Home</Link>
      </p>
      {/* <p>
        <Link to='/mladen'>Back</Link>
      </p> */}

    </div>
  )
}