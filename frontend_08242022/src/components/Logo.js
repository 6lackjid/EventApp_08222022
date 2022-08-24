import React from 'react'
import './Logo.css';
const logo = {
  fontFamily: "Uchen, serif",
  fontWeight: "bold",
  position: "relative",
  fontSize: 30,
  color: "#FF922B",
  marginLeft: "10px",
}


const Logo = () => {
  return(
    <div style={logo}>
   EventApp
   </div>
  )
}

export default Logo