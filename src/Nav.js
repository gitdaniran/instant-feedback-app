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
      
    </div>
  )
}