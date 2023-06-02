import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Neon_Button.module.scss"
function Neon_Button({style,Nav,children}) {
  const navigate = useNavigate();
  return (  
    <button style={{fontSize:style}} onClick={()=>{navigate(Nav)}} className={styles.Neon_Button}>
      {children}
    </button>
  )
}

export default Neon_Button